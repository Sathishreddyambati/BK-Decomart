import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { SITE, callLink, mailLink, waLink } from "../lib/site";
import { CATEGORIES } from "../lib/products";

export default function Footer() {
    return (
        <footer className="relative bg-matte text-ivory pt-20 pb-8" data-testid="site-footer">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-4">
                        <div className="bg-ivory inline-block p-4 rounded-sm">
                            <img src={SITE.logoUrl} alt={SITE.name} className="h-14 w-auto" />
                        </div>
                        <p className="mt-6 text-sm text-ivory/70 font-light leading-relaxed max-w-sm">
                            Since {SITE.since}, BK Decomart has been dressing homes across Madurai
                            with the finest curtains, blinds, wallpapers, flooring, carpets and
                            mattresses. Every stitch, plank and pile is chosen — and installed —
                            with the care of a family business.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href={SITE.social.instagram} target="_blank" rel="noreferrer"
                                className="w-9 h-9 border border-ivory/20 flex items-center justify-center hover:border-champagne hover:text-champagne transition"
                                data-testid="footer-instagram" aria-label="Instagram">
                                <Instagram size={16} strokeWidth={1.4} />
                            </a>
                            <a href={SITE.social.facebook} target="_blank" rel="noreferrer"
                                className="w-9 h-9 border border-ivory/20 flex items-center justify-center hover:border-champagne hover:text-champagne transition"
                                data-testid="footer-facebook" aria-label="Facebook">
                                <Facebook size={16} strokeWidth={1.4} />
                            </a>
                            <a href={SITE.social.youtube} target="_blank" rel="noreferrer"
                                className="w-9 h-9 border border-ivory/20 flex items-center justify-center hover:border-champagne hover:text-champagne transition"
                                data-testid="footer-youtube" aria-label="YouTube">
                                <Youtube size={16} strokeWidth={1.4} />
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <p className="overline mb-5">Explore</p>
                        <ul className="space-y-3 text-sm text-ivory/70 font-light">
                            <li><Link to="/" className="hover:text-champagne">Home</Link></li>
                            <li><Link to="/about" className="hover:text-champagne">About</Link></li>
                            <li><Link to="/products" className="hover:text-champagne">Products</Link></li>
                            <li><Link to="/gallery" className="hover:text-champagne">Gallery</Link></li>
                            <li><Link to="/projects" className="hover:text-champagne">Projects</Link></li>
                            <li><Link to="/visualizer" className="hover:text-champagne">AI Visualizer</Link></li>
                            <li><Link to="/faq" className="hover:text-champagne">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <p className="overline mb-5">Collections</p>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm text-ivory/70 font-light">
                            {CATEGORIES.map((c) => (
                                <li key={c.slug}>
                                    <Link to={`/products/${c.slug}`} className="hover:text-champagne">
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <p className="overline mb-5">Visit & Contact</p>
                        <div className="space-y-4 text-sm text-ivory/70 font-light">
                            <p className="flex gap-3">
                                <MapPin size={16} className="mt-0.5 text-champagne shrink-0" strokeWidth={1.4} />
                                <span>{SITE.address}</span>
                            </p>
                            <a href={callLink()} className="flex gap-3 hover:text-champagne" data-testid="footer-call">
                                <Phone size={16} className="mt-0.5 text-champagne shrink-0" strokeWidth={1.4} />
                                {SITE.phone}
                            </a>
                            <a href={mailLink()} className="flex gap-3 hover:text-champagne" data-testid="footer-email">
                                <Mail size={16} className="mt-0.5 text-champagne shrink-0" strokeWidth={1.4} />
                                {SITE.email}
                            </a>
                            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-outline !border-champagne !text-champagne !py-2.5 !px-4 mt-2" data-testid="footer-whatsapp">
                                WhatsApp Enquiry
                            </a>
                            <p className="text-xs uppercase tracking-[0.2em] pt-4 text-ivory/50">{SITE.hours}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/50 font-light">
                    <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Est. {SITE.since}.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-champagne">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-champagne">Terms & Conditions</Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="flex items-center gap-2 hover:text-champagne"
                            data-testid="footer-back-to-top">
                            Back to top <ArrowUp size={14} strokeWidth={1.4} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
