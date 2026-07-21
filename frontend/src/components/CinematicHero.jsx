import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, waLink } from "../lib/site";
import LuxImg from "./LuxImg";

// A cinematic hero — three luxury interiors crossfade with a slow Ken-Burns
// pan-zoom, dust particles float in the light, curtains sway subtly.
const SCENES = ["hero-living", "room-bedroom", "room-dining"];

export default function CinematicHero() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + 1) % SCENES.length), 6000);
        return () => clearInterval(t);
    }, []);
    return (
        <section className="relative min-h-[100svh] w-full overflow-hidden isolate" data-testid="home-hero">
            {/* Layered crossfading images with ken burns */}
            {SCENES.map((k, i) => (
                <div
                    key={k}
                    className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
                        i === idx ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={i !== idx}
                >
                    <div className={`absolute inset-0 overflow-hidden ${i === idx ? "hero-kenburns" : ""}`}>
                        <LuxImg name={k} alt="" className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
                    </div>
                </div>
            ))}

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/5 to-ivory/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-transparent to-transparent" />

            {/* Dust particles */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
                {[...Array(20)].map((_, i) => (
                    <span
                        key={i}
                        className="dust-particle"
                        style={{
                            left: `${(i * 41) % 100}%`,
                            top: `${(i * 47) % 100}%`,
                            animationDelay: `${(i % 7) * 0.7}s`,
                            animationDuration: `${9 + (i % 4) * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Subtle curtain sway across the sides */}
            <div className="curtain-sway pointer-events-none absolute top-0 bottom-0 left-0 w-24 md:w-40 bg-gradient-to-r from-ivory/30 to-transparent" />
            <div className="curtain-sway curtain-sway-right pointer-events-none absolute top-0 bottom-0 right-0 w-24 md:w-40 bg-gradient-to-l from-ivory/30 to-transparent" />

            {/* Copy */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pt-40 md:pt-52 pb-20 min-h-[100svh] flex flex-col justify-between">
                <div className="max-w-3xl">
                    <p className="overline animate-fade-up" style={{ animationDelay: "0.15s" }}>
                        <span className="hairline" /> {SITE.name} · Since {SITE.since}
                    </p>
                    <h1 className="hero-title mt-6 animate-fade-up" style={{ animationDelay: "0.35s" }}>
                        Come, <em>Let's Dressup</em><br />Your Home.
                    </h1>
                    <p className="mt-8 max-w-xl text-base md:text-lg text-charcoal font-light leading-relaxed animate-fade-up" style={{ animationDelay: "0.55s" }}>
                        A three-decade Madurai atelier of curtains, blinds, wallpapers, flooring,
                        carpets and mattresses. Curated, cut, stitched and installed with the
                        quiet obsession of a family business.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.75s" }}>
                        <Link to="/products" className="btn-primary magnetic ripple" data-testid="hero-explore-btn">
                            Explore Collections <ArrowRight size={16} strokeWidth={1.4} />
                        </Link>
                        <a href={waLink()} target="_blank" rel="noreferrer" className="btn-outline magnetic ripple" data-testid="hero-whatsapp-btn">
                            <MessageCircle size={16} strokeWidth={1.4} /> Book a Consultation
                        </a>
                    </div>
                </div>

                {/* Scroll cue + stats */}
                <div className="hidden md:flex justify-between items-end gap-8 mt-16 animate-fade-up" style={{ animationDelay: "0.95s" }}>
                    <div className="text-xs uppercase tracking-[0.24em] text-charcoal/70">
                        Scroll <br />
                        <span className="inline-block w-px h-16 bg-champagne mt-2 scroll-cue" />
                    </div>
                    <div className="flex gap-10">
                        <div>
                            <p className="mag-number">— 01</p>
                            <p className="overline mt-1">Curated</p>
                            <p className="font-serif text-2xl mt-1">10 Collections</p>
                        </div>
                        <div>
                            <p className="mag-number">— 02</p>
                            <p className="overline mt-1">Delivered</p>
                            <p className="font-serif text-2xl mt-1">Across Tamil Nadu</p>
                        </div>
                        <div>
                            <p className="mag-number">— 03</p>
                            <p className="overline mt-1">Established</p>
                            <p className="font-serif text-2xl mt-1">Since 1995</p>
                        </div>
                    </div>
                </div>

                {/* Scene indicator */}
                <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2" data-testid="hero-scene-dots">
                    {SCENES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIdx(i)}
                            className={`h-[2px] transition-all duration-500 ${
                                i === idx ? "w-10 bg-champagne" : "w-6 bg-matte/30 hover:bg-matte/60"
                            }`}
                            aria-label={`Scene ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
