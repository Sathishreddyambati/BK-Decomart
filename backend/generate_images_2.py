"""Batch 2: additional cinematic scenes for the intro + expanded gallery + more product lifestyle shots."""
import asyncio
import base64
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

OUT_DIR = Path(__file__).parent / "static" / "img" / "generated"
OUT_DIR.mkdir(parents=True, exist_ok=True)

API_KEY = os.getenv("EMERGENT_LLM_KEY")
MODEL_ID = "gemini-3.1-flash-image-preview"

STYLE = (
    "ultra-photorealistic 8K Architectural Digest cinematography, warm golden "
    "morning sunlight, ivory beige champagne palette, walnut and matte black "
    "accents, cinematic shallow depth of field, magazine composition, no text, "
    "no watermark, no logos, luxurious Indian villa interior"
)

# 16 new premium scenes chosen for intro + gallery + lifestyle
PROMPTS = {
    # Cinematic intro sequence (matches the user's requested camera pan)
    "intro-1-villa":
        "Wide cinematic exterior of a modern luxury Indian villa at sunrise, warm "
        "golden light on stone facade, palm silhouettes, driveway leading to a "
        "grand wooden entrance door, dew on garden. " + STYLE,
    "intro-2-door":
        "Close-up cinematic shot of a grand walnut carved entrance door slightly "
        "ajar, soft sunlight spilling out onto the porch, brass handle, dust "
        "particles in the light beam. " + STYLE,
    "intro-3-livingroom":
        "Cinematic interior — camera dolly into a spacious luxury living room, "
        "floor-to-ceiling ivory linen curtains gently drifting in a breeze from "
        "an open window, cream sofa, walnut coffee table, morning light rays. " + STYLE,
    "intro-4-wallpaper":
        "Cinematic close-up pan across an elegant botanical designer wallpaper "
        "in ivory and champagne gold, warm side-light, sculpted texture. " + STYLE,
    "intro-5-carpet":
        "Cinematic overhead pan across a hand-knotted wool carpet in ivory with "
        "champagne motifs, sunlight streaks across the pile, a bare foot barely "
        "visible at the edge. " + STYLE,
    "intro-6-flooring":
        "Cinematic low-angle shot along a herringbone walnut wooden floor, "
        "morning sunlight in stripes, soft reflections. " + STYLE,
    "intro-7-plants":
        "Cinematic detail shot of a luxury artificial olive tree in a matte "
        "black planter beside a beige linen armchair, warm window light, dust "
        "particles floating. " + STYLE,
    "intro-8-bedroom":
        "Cinematic reveal of a luxury bedroom, layered linen bedding in ivory, "
        "sheer curtains catching sunlight, walnut headboard, thick premium "
        "mattress, plush carpet underneath. " + STYLE,
    "intro-9-dining":
        "Cinematic wide of a luxury dining room, textured wallpaper feature wall, "
        "walnut dining table with brass candlesticks, pendant light above, warm "
        "morning light through sheer curtains. " + STYLE,

    # Hero variations for crossfading motion
    "hero-2-bedroom":
        "Cinematic hero — luxury master bedroom drenched in warm morning light, "
        "sheer curtains billowing gently, walnut bed frame, ivory bedding. " + STYLE,
    "hero-3-dining":
        "Cinematic hero — luxury dining room during golden hour, textured "
        "wallpaper feature wall, walnut dining table, sunlight through sheer "
        "curtains casting soft patterns. " + STYLE,

    # Extra rooms
    "room-kids":
        "A luxury Indian kids room, pastel beige palette, textured wallpaper "
        "with subtle stars, walnut bunk bed, plush carpet, artificial trees "
        "in corner, warm afternoon light. " + STYLE,
    "room-kitchen":
        "A luxury modern kitchen, walnut cabinetry, marble island, roman blinds "
        "in beige, warm pendant lights, natural morning light. " + STYLE,
    "room-balcony":
        "A luxury villa balcony, outdoor mat at the door, artificial olive tree "
        "and monstera in matte planters, wicker armchair, warm sunset. " + STYLE,
    "room-hotel-lobby":
        "A boutique hotel lobby lounge, tall sheer curtains, plush carpet, "
        "walnut walls, brass accents, evening warm light. " + STYLE,
    "showroom-interior":
        "Interior of a premium home décor boutique showroom, rolls of fabric and "
        "curtain samples elegantly displayed, walnut cabinetry, warm spot "
        "lighting, matte black flooring, cream carpet samples. " + STYLE,
}


async def generate_one(name: str, prompt: str):
    out_path = OUT_DIR / f"{name}.png"
    if out_path.exists() and out_path.stat().st_size > 5000:
        print(f"[skip] {name} already exists")
        return
    try:
        chat = LlmChat(
            api_key=API_KEY,
            session_id=f"bkdeco-b2-{name}",
            system_message="You generate ultra-realistic magazine-quality luxury interior photography.",
        )
        chat.with_model("gemini", MODEL_ID).with_params(modalities=["image", "text"])
        msg = UserMessage(text=prompt)
        _text, images = await chat.send_message_multimodal_response(msg)
        if not images:
            print(f"[fail] {name} no image returned")
            return
        img_bytes = base64.b64decode(images[0]["data"])
        out_path.write_bytes(img_bytes)
        print(f"[ok]   {name} -> {len(img_bytes)//1024} KB")
    except Exception as e:
        print(f"[err]  {name}: {str(e)[:200]}")


async def main():
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    tasks = []
    for name, prompt in PROMPTS.items():
        if only and name not in only:
            continue
        tasks.append(generate_one(name, prompt))
    batch = 3
    for i in range(0, len(tasks), batch):
        await asyncio.gather(*tasks[i:i + batch])


if __name__ == "__main__":
    asyncio.run(main())
