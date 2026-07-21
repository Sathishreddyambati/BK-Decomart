import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Luxury curtain page-transition — two ivory panels slide in from left/right
// on every route change, then part to reveal the new page. Uses only CSS
// transforms so it stays smooth on mobile.
export default function CurtainTransition() {
    const { pathname } = useLocation();
    const [stage, setStage] = useState("idle"); // idle | closing | open | opening
    const [key, setKey] = useState(0);

    useEffect(() => {
        // Skip the very first render (intro handles the opener)
        if (key === 0) { setKey(1); return; }
        setStage("closing");
        const t1 = setTimeout(() => setStage("open"), 550);
        const t2 = setTimeout(() => setStage("opening"), 700);
        const t3 = setTimeout(() => setStage("idle"), 1400);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    if (stage === "idle") return null;

    const closed = stage === "closing" || stage === "open";
    return (
        <div className="fixed inset-0 z-[80] pointer-events-none" aria-hidden="true">
            <div
                className="absolute top-0 bottom-0 left-0 w-1/2 bg-ivory transition-transform ease-out shadow-deep"
                style={{
                    transform: closed ? "translateX(0)" : "translateX(-100%)",
                    transitionDuration: stage === "closing" ? "550ms" : "700ms",
                }}
            />
            <div
                className="absolute top-0 bottom-0 right-0 w-1/2 bg-ivory transition-transform ease-out shadow-deep"
                style={{
                    transform: closed ? "translateX(0)" : "translateX(100%)",
                    transitionDuration: stage === "closing" ? "550ms" : "700ms",
                }}
            />
            {/* Gold seam in the middle */}
            <div
                className={`absolute top-0 bottom-0 left-1/2 w-px bg-champagne transition-opacity duration-300 ${
                    closed ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
}
