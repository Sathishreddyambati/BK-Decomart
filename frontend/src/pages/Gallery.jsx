import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import LuxImg from "../components/LuxImg";
import Reveal from "../components/Reveal";

// Curated Pinterest-style masonry of every luxury scene we have.
const IMAGES = [
    "hero-living", "cat-curtains", "room-bedroom", "cat-wallpapers",
    "room-dining", "cat-carpets", "cat-flooring", "cat-blinds",
    "room-living", "cat-plants", "cat-mattresses", "cat-indoor-mats",
    "cat-outdoor-mats", "cat-stitching", "brand-story", "gallery-1",
    "gallery-2", "gallery-3", "before", "after",
];

export default function Gallery() {
    const [open, setOpen] = useState(null); // index
    useEffect(() => {
        const onKey = (e) => {
            if (open === null) return;
            if (e.key === "Escape") setOpen(null);
            if (e.key === "ArrowRight") setOpen((i) => (i + 1) % IMAGES.length);
            if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + IMAGES.length) % IMAGES.length);
        };
        window.addEventListener("keydown", onKey);
        document.documentElement.style.overflow = open === null ? "" : "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.documentElement.style.overflow = "";
        };
    }, [open]);

    return (
        <div className="pt-28">
            <section className="pb-14 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> The Gallery</p>
                        <h1 className="hero-title mt-6 max-w-4xl">
                            Moments in <span className="font-serif-italic text-walnut">dressed homes.</span>
                        </h1>
                        <p className="mt-6 text-base md:text-lg text-charcoal font-light max-w-2xl">
                            A curated collection of interiors we've dressed — hover, tap, and open any
                            frame to see it in full cinematic detail.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <div className="masonry" data-testid="gallery-masonry">
                        {IMAGES.map((k, i) => (
                            <Reveal key={k + i} delay={(i % 6) * 60}>
                                <button
                                    onClick={() => setOpen(i)}
                                    className="block w-full text-left hover-zoom rounded-sm overflow-hidden bg-beige"
                                    data-testid={`gallery-item-${i}`}
                                    style={{ aspectRatio: (i % 4 === 0) ? "3/4" : (i % 3 === 0) ? "1/1" : "4/5" }}
                                >
                                    <LuxImg name={k} alt="" className="w-full h-full object-cover" />
                                </button>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {open !== null && (
                <div className="lightbox-backdrop flex items-center justify-center p-4" data-testid="gallery-lightbox">
                    <button
                        onClick={() => setOpen(null)}
                        className="absolute top-6 right-6 text-ivory hover:text-champagne p-2"
                        aria-label="Close"
                        data-testid="lightbox-close"
                    >
                        <X size={28} strokeWidth={1.4} />
                    </button>
                    <button
                        onClick={() => setOpen((i) => (i - 1 + IMAGES.length) % IMAGES.length)}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-ivory hover:text-champagne p-2"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={40} strokeWidth={1.4} />
                    </button>
                    <button
                        onClick={() => setOpen((i) => (i + 1) % IMAGES.length)}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-ivory hover:text-champagne p-2"
                        aria-label="Next"
                    >
                        <ChevronRight size={40} strokeWidth={1.4} />
                    </button>
                    <div className="max-w-6xl w-full max-h-[85vh] flex items-center justify-center">
                        <LuxImg
                            name={IMAGES[open]}
                            alt=""
                            className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                            loading="eager"
                        />
                    </div>
                    <p className="absolute bottom-6 left-0 right-0 text-center text-ivory/60 text-[0.7rem] uppercase tracking-[0.24em]">
                        {open + 1} / {IMAGES.length} · Use ← → to navigate · Esc to close
                    </p>
                </div>
            )}
        </div>
    );
}
