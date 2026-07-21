import { useEffect, useRef } from "react";

export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transitionDelay = `${delay}ms`;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("revealed");
                    obs.disconnect();
                }
            },
            { threshold: 0.14 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);
    return (
        <Tag ref={ref} data-reveal className={className} {...rest}>
            {children}
        </Tag>
    );
}
