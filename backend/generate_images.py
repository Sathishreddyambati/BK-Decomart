"""One-off script to pre-generate luxury interior images for BK Decomart.
Runs Gemini Nano Banana (gemini-3.1-flash-image-preview) via emergentintegrations.
Outputs to /app/backend/static/img/generated/
"""
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
    "ultra-photorealistic 8K Architectural Digest quality luxury interior, warm "
    "afternoon sunlight streaming through large windows, natural ivory and beige "
    "palette with champagne gold and walnut accents, soft cinematic shadows, "
    "magazine composition, shallow depth of field, no text, no watermark, no logos"
)

PROMPTS = {
    "hero-living":
        "A grand luxury Indian villa living room in the evening, floor-to-ceiling "
        "eyelet linen curtains in warm ivory framing tall windows, plush cream sofa, "
        "walnut coffee table, textured beige wall behind, subtle champagne gold "
        "sconces, a large hand-knotted rug, an artificial olive tree in a matte "
        "black planter in the corner. " + STYLE,
    "brand-story":
        "Close-up detail shot of a craftsman's hands stitching a heavy champagne "
        "silk curtain on a wooden workbench in a boutique atelier, brass measuring "
        "tape, spools of thread, warm window light. " + STYLE,
    "cat-curtains":
        "A luxurious bedroom bathed in golden hour light, floor-to-ceiling pleated "
        "sheer curtains in ivory with a subtle sheen, tall arched window, linen "
        "bedding, walnut headboard. Curtains are the hero of the composition. " + STYLE,
    "cat-blinds":
        "A modern luxury study with zebra roller blinds half-drawn in warm beige, "
        "casting striped soft shadows across a walnut desk and leather chair, "
        "brass task lamp, large window view. Blinds are the hero. " + STYLE,
    "cat-wallpapers":
        "An elegant dining room accent wall covered in a hand-illustrated botanical "
        "designer wallpaper in ivory and champagne gold, walnut dining table, "
        "cream upholstered chairs, warm pendant light overhead. Wallpaper is the hero. " + STYLE,
    "cat-flooring":
        "A luxury open-plan hall with wide-plank engineered walnut wooden flooring "
        "in a herringbone pattern, sunlight streaming across the grain, minimal "
        "furniture, floor is the hero. " + STYLE,
    "cat-carpets":
        "A luxury bedroom with a large hand-knotted wool carpet in ivory with "
        "subtle champagne motifs beneath a walnut king bed, low camera angle "
        "emphasising the carpet texture and pile. " + STYLE,
    "cat-indoor-mats":
        "A luxury home foyer with a beautifully bordered natural jute and cotton "
        "indoor floor mat in warm beige, a walnut console table with a brass "
        "table lamp and fresh flowers above it, framed art on the wall. " + STYLE,
    "cat-outdoor-mats":
        "A luxury villa entrance porch with a substantial coir outdoor floor mat "
        "in charcoal and beige at a walnut carved door, potted plants either side, "
        "warm afternoon shadows. " + STYLE,
    "cat-mattresses":
        "A luxury master bedroom morning scene, a thick premium mattress with "
        "layered linen bedding in ivory and warm beige, walnut bed frame, sheer "
        "curtains diffusing sunlight. " + STYLE,
    "cat-plants":
        "A luxury living room corner styled with life-like artificial olive tree, "
        "monstera and fiddle-leaf fig in matte black and terracotta planters, "
        "beside a beige linen armchair and walnut side table. " + STYLE,
    "cat-stitching":
        "An artisan atelier interior, tailors at wooden workbenches hand-stitching "
        "premium curtains and cushion covers, spools of fabric in ivory beige and "
        "champagne, warm workshop light. " + STYLE,
    "room-living":
        "A cinematic luxury living room, wide angle, ivory curtains, walnut floor, "
        "beige textured wall, statement carpet, artificial olive tree. " + STYLE,
    "room-bedroom":
        "A cinematic luxury bedroom, wide angle, pleated curtains, plush carpet, "
        "designer wallpaper accent wall, walnut bed. " + STYLE,
    "room-dining":
        "A cinematic luxury dining room, wide angle, textured wallpaper feature "
        "wall, wooden flooring, pendant light, walnut dining set. " + STYLE,
    "room-office":
        "A cinematic luxury home office, wide angle, roller blinds, wooden floor, "
        "artificial plants, walnut desk, natural light. " + STYLE,
    "before":
        "An empty ordinary suburban Indian living room, bare white walls, plain "
        "grey tile floor, no curtains at the window, harsh flat daylight, no "
        "furniture styling, before-photo look. photorealistic, 8K, no text.",
    "after":
        "The exact same living room transformed: floor-to-ceiling ivory eyelet "
        "curtains, herringbone walnut flooring, large hand-knotted carpet, "
        "beige feature wall with subtle botanical wallpaper, artificial olive "
        "tree in the corner, warm golden hour light. " + STYLE,
    "gallery-1":
        "Luxury Indian villa foyer, curved staircase, ivory curtains, walnut "
        "floor, large mirror, warm light. " + STYLE,
    "gallery-2":
        "Boutique hotel lobby lounge, tall sheer curtains, plush carpets, brass "
        "accents, walnut walls, evening light. " + STYLE,
    "gallery-3":
        "Luxury boutique retail showroom interior with rolls of fabric and "
        "curtain samples on display, warm spot lighting, walnut cabinetry. " + STYLE,
    "consultation":
        "A designer consultation scene: an interior designer showing fabric "
        "swatches and a mood-board to a client at a walnut table in a bright "
        "beige-toned showroom, warm sunlight. " + STYLE,
    "visualizer-demo":
        "A modern Indian apartment living room before-and-after style single "
        "frame: half the frame plain empty room, other half beautifully dressed "
        "with luxury curtains flooring and wallpaper, subtle divider. " + STYLE,
}


async def generate_one(name: str, prompt: str):
    out_path = OUT_DIR / f"{name}.png"
    if out_path.exists() and out_path.stat().st_size > 5000:
        print(f"[skip] {name} already exists")
        return
    try:
        chat = LlmChat(
            api_key=API_KEY,
            session_id=f"bkdeco-{name}",
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
        print(f"[ok]   {name} -> {out_path.name} ({len(img_bytes)//1024} KB)")
    except Exception as e:
        print(f"[err]  {name}: {e}")


async def main():
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    tasks = []
    for name, prompt in PROMPTS.items():
        if only and name not in only:
            continue
        tasks.append(generate_one(name, prompt))
    # Run in small batches of 3 to avoid rate limits
    batch = 3
    for i in range(0, len(tasks), batch):
        await asyncio.gather(*tasks[i:i + batch])


if __name__ == "__main__":
    asyncio.run(main())
