import { useEffect, useRef, useState } from "react";

// Count-up animation that starts when the element scrolls into view.
export default function Counter({ to = 100, suffix = "", duration = 1800, className = "" }) {
    const ref = useRef(null);
    const [n, setN] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf;
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            const start = performance.now();
            const step = (t) => {
                const p = Math.min(1, (t - start) / duration);
                const eased = 1 - Math.pow(1 - p, 3);
                setN(Math.round(to * eased));
                if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
            io.disconnect();
        }, { threshold: 0.4 });
        io.observe(el);
        return () => { io.disconnect(); cancelAnimationFrame(raf); };
    }, [to, duration]);
    return <span ref={ref} className={className}>{n}{suffix}</span>;
}
