import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { SITE, callLink } from "../lib/site";

const LINKS = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/products", label: "Products" },
    { to: "/gallery", label: "Gallery" },
    { to: "/projects", label: "Projects" },
    { to: "/visualizer", label: "AI Visualizer" },
    { to: "/contact", label: "Contact" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 40);
        on();
        window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    return (
        <header
            data-testid="site-nav"
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
                scrolled || open ? "nav-glass py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
                    <img
                        src={SITE.logoUrl}
                        alt={SITE.name}
                        className={`transition-all duration-500 ${scrolled ? "h-9 md:h-10" : "h-11 md:h-12"} w-auto`}
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-9">
                    {LINKS.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            data-testid={`nav-link-${l.label.toLowerCase().replace(/ /g, "-")}`}
                            className={({ isActive }) =>
                                `text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                                    isActive ? "text-champagne" : "text-matte hover:text-champagne"
                                }`
                            }
                            end={l.to === "/"}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    <a
                        href={callLink()}
                        data-testid="nav-call-btn"
                        className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.18em] text-matte hover:text-champagne transition"
                    >
                        <Phone size={14} strokeWidth={1.4} />
                        {SITE.phone}
                    </a>
                </div>

                <button
                    onClick={() => setOpen((s) => !s)}
                    className="lg:hidden p-2 -mr-2 text-matte"
                    aria-label="Toggle menu"
                    data-testid="nav-mobile-toggle"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-500 ${
                    open ? "max-h-[80vh]" : "max-h-0"
                }`}
                data-testid="nav-mobile-panel"
            >
                <div className="px-6 py-6 flex flex-col gap-4 border-t border-linen/60 mt-3 bg-ivory/95 backdrop-blur">
                    {LINKS.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                                `text-sm font-medium uppercase tracking-[0.18em] py-1 ${
                                    isActive ? "text-champagne" : "text-matte"
                                }`
                            }
                            end={l.to === "/"}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <a href={callLink()} className="btn-outline mt-2 justify-center">
                        <Phone size={14} /> {SITE.phone}
                    </a>
                </div>
            </div>
        </header>
    );
}
