import { useEffect, useRef, useState } from "react";

// Reveals a heading word-by-word with a soft slide-up.
// Preserves inline formatting because we split on whitespace only.
export default function TextReveal({ as: Tag = "h2", children, className = "" }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setShown(true); io.disconnect(); }
        }, { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Split text nodes only. For JSX children (e.g. <em>) we preserve them and animate their wrappers.
    const render = () => {
        const nodes = Array.isArray(children) ? children : [children];
        let wordIndex = 0;
        return nodes.flatMap((node, i) => {
            if (typeof node === "string") {
                return node.split(/(\s+)/).map((token, j) => {
                    if (token.trim() === "") return <span key={`${i}-s-${j}`}>{token}</span>;
                    const w = wordIndex++;
                    return (
                        <span key={`${i}-w-${j}`} className="inline-block overflow-hidden align-baseline">
                            <span
                                className={`inline-block transition-all duration-[900ms] ease-out ${
                                    shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.8em]"
                                }`}
                                style={{ transitionDelay: `${w * 65}ms` }}
                            >
                                {token}
                            </span>
                        </span>
                    );
                });
            }
            const w = wordIndex++;
            return (
                <span key={`${i}-jsx`} className="inline-block overflow-hidden align-baseline">
                    <span
                        className={`inline-block transition-all duration-[900ms] ease-out ${
                            shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.8em]"
                        }`}
                        style={{ transitionDelay: `${w * 65}ms` }}
                    >
                        {node}
                    </span>
                </span>
            );
        });
    };

    return <Tag ref={ref} className={className}>{render()}</Tag>;
}
