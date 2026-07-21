import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "../lib/products";
import LuxImg from "../components/LuxImg";
import Reveal from "../components/Reveal";

export default function Products() {
    return (
        <div className="pt-28">
            <section className="pb-16 md:pb-20 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> The Collections</p>
                        <h1 className="hero-title mt-6 max-w-4xl">
                            Ten curated worlds<br />
                            <span className="font-serif-italic text-walnut">for the modern home.</span>
                        </h1>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {CATEGORIES.map((c, i) => (
                        <Reveal key={c.slug} delay={(i % 3) * 100} data-testid={`product-card-${c.slug}`}>
                            <Link to={`/products/${c.slug}`} className="block group">
                                <div className="hover-zoom aspect-portrait">
                                    <LuxImg name={c.img} alt={c.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="mt-6 flex items-start justify-between">
                                    <div>
                                        <p className="mag-number">— {String(i + 1).padStart(2, "0")}</p>
                                        <h3 className="font-serif text-3xl mt-1">{c.name}</h3>
                                        <p className="text-sm text-charcoal/70 mt-2 max-w-xs">{c.subtitle}</p>
                                    </div>
                                    <ArrowRight size={20} className="mt-4 text-champagne group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
