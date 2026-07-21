import { useRef } from "react";

// Wraps children in a subtle 3D-tilt-on-hover container.
// Desktop only — falls through gracefully on touch devices.
export default function Tilt({ children, className = "", strength = 8 }) {
    const ref = useRef(null);
    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width) * 2 - 1;
        const py = ((e.clientY - r.top) / r.height) * 2 - 1;
        el.style.transform = `perspective(900px) rotateX(${-py * strength / 2}deg) rotateY(${px * strength / 2}deg)`;
    };
    const onLeave = () => {
        if (ref.current) ref.current.style.transform = "";
    };
    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ transformStyle: "preserve-3d", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
            className={className}
        >
            {children}
        </div>
    );
}
