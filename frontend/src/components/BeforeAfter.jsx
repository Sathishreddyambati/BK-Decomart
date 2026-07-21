import { useState, useRef, useCallback } from "react";
import LuxImg from "./LuxImg";

export default function BeforeAfter({ beforeName, afterName, beforeSrc, afterSrc, className = "" }) {
    const [pos, setPos] = useState(52);
    const wrapRef = useRef(null);
    const dragging = useRef(false);

    const move = useCallback((clientX) => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        setPos(p);
    }, []);

    return (
        <div
            ref={wrapRef}
            data-testid="before-after"
            className={`ba-wrap aspect-cinema rounded-sm ${className}`}
            onMouseDown={() => (dragging.current = true)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onMouseMove={(e) => dragging.current && move(e.clientX)}
            onTouchStart={() => (dragging.current = true)}
            onTouchEnd={() => (dragging.current = false)}
            onTouchMove={(e) => dragging.current && move(e.touches[0].clientX)}
            onClick={(e) => move(e.clientX)}
        >
            {beforeName ? (
                <LuxImg name={beforeName} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
            ) : (
                <img src={beforeSrc} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="ba-after" style={{ width: `${pos}%` }}>
                {afterName ? (
                    <LuxImg name={afterName} className="absolute inset-0 w-full h-full object-cover" alt="After" style={{ width: `${100 * (100 / Math.max(pos, 0.01))}%`, maxWidth: "none" }} />
                ) : (
                    <img src={afterSrc} alt="After" className="absolute inset-0 h-full object-cover" style={{ width: `${100 * (100 / Math.max(pos, 0.01))}%`, maxWidth: "none" }} />
                )}
            </div>
            <div className="ba-handle" style={{ left: `${pos}%` }} />
            <span className="absolute top-4 left-4 text-[0.65rem] uppercase tracking-[0.24em] text-ivory bg-matte/70 px-3 py-1 rounded-sm">Before</span>
            <span className="absolute top-4 right-4 text-[0.65rem] uppercase tracking-[0.24em] text-matte bg-champagne px-3 py-1 rounded-sm">After</span>
        </div>
    );
}
