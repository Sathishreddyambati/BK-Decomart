import { useEffect, useState, useRef } from "react";
import { SITE } from "../lib/site";
import LuxImg from "./LuxImg";

// The nine-scene cinematic opening — matches the user's brief:
// villa → door opens → living room → wallpaper → carpet → floor →
// plants → bedroom → dining → logo tagline.
const SCENES = [
    { key: "hero-living",     caption: "A modern villa awakens.",           duration: 1600, pan: "kb-in" },
    { key: "brand-story",     caption: "The doors are opened for you.",     duration: 1400, pan: "kb-left" },
    { key: "room-living",     caption: "Come inside — the light is warm.",  duration: 1600, pan: "kb-right" },
    { key: "cat-wallpapers",  caption: "Walls that whisper stories.",       duration: 1200, pan: "kb-up" },
    { key: "cat-carpets",     caption: "Softness underfoot.",               duration: 1200, pan: "kb-down" },
    { key: "cat-flooring",    caption: "Warm walnut, plank by plank.",      duration: 1200, pan: "kb-right" },
    { key: "cat-plants",      caption: "A little green, quietly kept.",     duration: 1200, pan: "kb-in" },
    { key: "room-bedroom",    caption: "A bedroom, dressed to rest.",       duration: 1400, pan: "kb-left" },
    { key: "room-dining",     caption: "A room set for the ones you love.", duration: 1400, pan: "kb-right" },
];

const TOTAL = SCENES.reduce((s, x) => s + x.duration, 0) + 2600; // + logo card

export default function CinematicIntro() {
    const [visible, setVisible] = useState(true);
    const [sceneIdx, setSceneIdx] = useState(0);
    const [logoStage, setLogoStage] = useState(false);
    const [fading, setFading] = useState(false);
    const timers = useRef([]);

    useEffect(() => {
        // Only show once per session
        if (typeof window === "undefined") return;
        const seen = sessionStorage.getItem("bkIntroSeen");
        if (seen) { setVisible(false); return; }

        // Lock scroll while intro plays
        document.documentElement.style.overflow = "hidden";

        let acc = 0;
        SCENES.forEach((s, i) => {
            acc += s.duration;
            timers.current.push(setTimeout(() => setSceneIdx(i + 1), acc));
        });
        timers.current.push(setTimeout(() => setLogoStage(true), acc));
        timers.current.push(setTimeout(() => setFading(true), TOTAL - 800));
        timers.current.push(setTimeout(() => finish(), TOTAL));

        return () => timers.current.forEach(clearTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const finish = () => {
        sessionStorage.setItem("bkIntroSeen", "1");
        document.documentElement.style.overflow = "";
        setVisible(false);
    };

    const skip = () => {
        timers.current.forEach(clearTimeout);
        setFading(true);
        setTimeout(finish, 400);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-matte transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}
            data-testid="cinematic-intro"
            aria-hidden={fading}
        >
            {/* Scene layers — all rendered, only current one is visible */}
            {SCENES.map((s, i) => (
                <div
                    key={s.key}
                    className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
                        i === sceneIdx ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={i !== sceneIdx}
                >
                    <div className={`absolute inset-0 overflow-hidden ${i === sceneIdx ? `pan-${s.pan}` : ""}`}>
                        <LuxImg name={s.key} alt="" className="w-full h-full object-cover" loading="eager" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-matte/70 via-matte/10 to-matte/40" />
                    <div className="absolute bottom-16 md:bottom-24 left-0 right-0 text-center px-8">
                        <p className={`hero-title !text-ivory !text-3xl md:!text-5xl font-serif-italic transition-all duration-1000 ${
                            i === sceneIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}>
                            {s.caption}
                        </p>
                    </div>
                </div>
            ))}

            {/* Final logo card */}
            <div
                className={`absolute inset-0 bg-ivory flex flex-col items-center justify-center transition-opacity duration-[900ms] ${
                    logoStage ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={!logoStage}
            >
                <img
                    src={SITE.logoUrl}
                    alt={SITE.name}
                    className={`w-40 md:w-56 h-auto transition-all duration-[1200ms] ease-out ${
                        logoStage ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                />
                <div className={`mt-8 h-px bg-champagne transition-all duration-[1400ms] ease-out ${
                    logoStage ? "w-40" : "w-0"
                }`} />
                <p className={`mt-8 hero-title !text-3xl md:!text-5xl transition-all duration-[1400ms] ease-out ${
                    logoStage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                    Come, <em>Let's Dressup</em> Your Home.
                </p>
                <p className={`overline mt-6 transition-opacity duration-[1600ms] ${logoStage ? "opacity-100" : "opacity-0"}`}>
                    <span className="hairline" /> Since {SITE.since} · Madurai
                </p>
            </div>

            {/* Dust particles overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
                {[...Array(24)].map((_, i) => (
                    <span
                        key={i}
                        className="dust-particle"
                        style={{
                            left: `${(i * 37) % 100}%`,
                            top: `${(i * 53) % 100}%`,
                            animationDelay: `${(i % 6) * 0.9}s`,
                            animationDuration: `${8 + (i % 5) * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Skip */}
            <button
                onClick={skip}
                className="absolute top-6 right-6 md:top-8 md:right-10 text-ivory/80 hover:text-champagne text-[0.7rem] uppercase tracking-[0.24em] border border-ivory/30 hover:border-champagne rounded-full px-4 py-2 backdrop-blur-sm bg-matte/30 transition"
                data-testid="intro-skip-btn"
            >
                Skip Intro →
            </button>

            {/* Bottom progress bar */}
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-ivory/10">
                <div
                    className="h-full bg-champagne origin-left transition-transform ease-linear"
                    style={{
                        transform: `scaleX(${logoStage ? 1 : sceneIdx / SCENES.length})`,
                        transitionDuration: `${SCENES[Math.min(sceneIdx, SCENES.length - 1)].duration}ms`,
                    }}
                />
            </div>
        </div>
    );
}
