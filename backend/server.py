from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import base64
import logging
from pathlib import Path
from pydantic import BaseModel
import uuid

from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
NANO_BANANA_MODEL = "gemini-3.1-flash-image-preview"

STATIC_DIR = ROOT_DIR / "static"
STATIC_DIR.mkdir(exist_ok=True)
(STATIC_DIR / "img" / "generated").mkdir(parents=True, exist_ok=True)
(STATIC_DIR / "img" / "visualizer").mkdir(parents=True, exist_ok=True)

app = FastAPI(title="BK Decomart API")
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"service": "BK Decomart", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "llm_key_present": bool(EMERGENT_LLM_KEY)}


@api_router.get("/generated-images")
async def list_generated_images():
    """Returns the list of pre-generated luxury interior image names available."""
    d = STATIC_DIR / "img" / "generated"
    if not d.exists():
        return {"images": []}
    files = sorted([p.stem for p in d.glob("*.png") if p.stat().st_size > 5000])
    return {"images": files}


# ---------- AI Room Visualizer ----------

VISUALIZER_PRESETS = {
    "curtains": (
        "Redesign this room by adding elegant floor-to-ceiling {style} curtains "
        "in warm ivory linen at the windows. Keep the existing room geometry, "
        "walls, furniture and camera angle identical. Photorealistic magazine "
        "quality, warm natural light, no text or watermark."
    ),
    "blinds": (
        "Redesign this room by adding tasteful {style} blinds in warm beige at "
        "the windows. Keep the existing room geometry, walls, furniture and "
        "camera angle identical. Photorealistic magazine quality, warm natural "
        "light, no text or watermark."
    ),
    "wallpaper": (
        "Redesign this room by covering the main accent wall with an elegant "
        "{style} designer wallpaper in ivory and champagne gold. Keep the existing "
        "room geometry, furniture and camera angle identical. Photorealistic "
        "magazine quality, warm natural light, no text or watermark."
    ),
    "flooring": (
        "Redesign this room by replacing the floor with premium {style} in warm "
        "walnut tones. Keep the existing room geometry, walls, furniture and "
        "camera angle identical. Photorealistic magazine quality, warm natural "
        "light, no text or watermark."
    ),
    "carpet": (
        "Redesign this room by adding a large hand-knotted {style} in ivory and "
        "champagne under the central furniture. Keep the existing room geometry, "
        "walls, furniture and camera angle identical. Photorealistic magazine "
        "quality, warm natural light, no text or watermark."
    ),
}


class VisualizeResponse(BaseModel):
    id: str
    image_data_url: str


@api_router.post("/visualize", response_model=VisualizeResponse)
async def visualize_room(
    image: UploadFile = File(...),
    product: str = Form(...),
    style: str = Form("eyelet"),
):
    """Accepts a room photo and returns a Nano Banana edited preview showing the
    chosen product applied to the room."""
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")
    preset = VISUALIZER_PRESETS.get(product)
    if not preset:
        raise HTTPException(status_code=400, detail=f"Unsupported product '{product}'")

    raw = await image.read()
    if len(raw) > 8 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image too large (max 8MB)")
    b64_in = base64.b64encode(raw).decode("utf-8")

    prompt = preset.format(style=style or "premium")

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"visualize-{uuid.uuid4().hex[:12]}",
            system_message=(
                "You are a luxury interior visualiser. You edit uploaded room "
                "photos to show new décor products while preserving the room's "
                "layout and camera angle."
            ),
        )
        chat.with_model("gemini", NANO_BANANA_MODEL).with_params(modalities=["image", "text"])
        msg = UserMessage(text=prompt, file_contents=[ImageContent(b64_in)])
        _text, images = await chat.send_message_multimodal_response(msg)
    except Exception as e:
        logging.exception("visualize call failed")
        raise HTTPException(status_code=502, detail=f"Visualiser failed: {e}") from e

    if not images:
        raise HTTPException(status_code=502, detail="No image returned by model")

    out_id = uuid.uuid4().hex[:16]
    out_path = STATIC_DIR / "img" / "visualizer" / f"{out_id}.png"
    out_bytes = base64.b64decode(images[0]["data"])
    out_path.write_bytes(out_bytes)

    data_url = f"data:{images[0].get('mime_type', 'image/png')};base64,{images[0]['data']}"
    return VisualizeResponse(id=out_id, image_data_url=data_url)


app.include_router(api_router)

# Serve static generated images under /api/static so ingress routes to backend
app.mount("/api/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
