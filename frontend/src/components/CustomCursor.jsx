import { useEffect, useRef, useState } from "react";

// A luxury custom cursor — desktop only, disabled on touch devices.
// A small champagne dot + an outer ring that lazily follows the pointer.
export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled, setEnabled] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const noTouch = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!noTouch) return;
        setEnabled(true);
        document.documentElement.classList.add("has-custom-cursor");

        let x = window.innerWidth / 2, y = window.innerHeight / 2;
        let rx = x, ry = y;
        let raf;

        const move = (e) => {
            x = e.clientX; y = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            }
        };
        const tick = () => {
            rx += (x - rx) * 0.14;
            ry += (y - ry) * 0.14;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hover ? 1.7 : 1})`;
            }
            raf = requestAnimationFrame(tick);
        };
        tick();

        const onOver = (e) => {
            const t = e.target;
            if (!(t instanceof Element)) return;
            const isInteractive = t.closest("a, button, input, textarea, select, [role='button'], .hover-zoom, .magnetic");
            setHover(!!isInteractive);
        };

        window.addEventListener("mousemove", move);
        document.addEventListener("mouseover", onOver);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", onOver);
            document.documentElement.classList.remove("has-custom-cursor");
        };
    }, [hover]);

    if (!enabled) return null;
    return (
        <>
            <div ref={ringRef} className={`custom-cursor-ring ${hover ? "is-hover" : ""}`} />
            <div ref={dotRef} className="custom-cursor-dot" />
        </>
    );
}
