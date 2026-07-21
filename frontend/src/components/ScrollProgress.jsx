import { useEffect, useState } from "react";

// Slim luxury scroll-progress bar at the very top of the viewport
export default function ScrollProgress() {
    const [p, setP] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const total = h.scrollHeight - h.clientHeight;
            setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);
    return (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[45] bg-transparent pointer-events-none" data-testid="scroll-progress">
            <div className="h-full bg-champagne origin-left" style={{ transform: `scaleX(${p / 100})`, transition: "transform 0.15s linear" }} />
        </div>
    );
}
