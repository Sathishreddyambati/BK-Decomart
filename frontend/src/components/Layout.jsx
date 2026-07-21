import Nav from "./Nav";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import CinematicIntro from "./CinematicIntro";
import ScrollProgress from "./ScrollProgress";
import CustomCursor from "./CustomCursor";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

    // Magnetic button micro-interaction (desktop only)
    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const onMove = (e) => {
            const el = e.target instanceof Element ? e.target.closest(".magnetic") : null;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const mx = e.clientX - r.left - r.width / 2;
            const my = e.clientY - r.top - r.height / 2;
            el.style.transform = `translate(${mx * 0.18}px, ${my * 0.18}px)`;
        };
        const onLeave = (e) => {
            const el = e.target instanceof Element ? e.target.closest(".magnetic") : null;
            if (!el) return;
            el.style.transform = "";
        };
        // Ripple origin
        const onClick = (e) => {
            const el = e.target instanceof Element ? e.target.closest(".ripple") : null;
            if (!el) return;
            const r = el.getBoundingClientRect();
            el.style.setProperty("--rx", `${e.clientX - r.left}px`);
            el.style.setProperty("--ry", `${e.clientY - r.top}px`);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onLeave, true);
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave, true);
            document.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <>
            <CinematicIntro />
            <ScrollProgress />
            <Nav />
            <main data-testid="site-main">{children}</main>
            <Footer />
            <FloatingWhatsApp />
            <CustomCursor />
        </>
    );
}
