import Reveal from "../components/Reveal";
import LuxImg from "../components/LuxImg";
import { PROJECTS } from "../lib/products";
import { MapPin } from "lucide-react";

export default function Projects() {
    return (
        <div className="pt-28">
            <section className="pb-14 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> Selected Projects</p>
                        <h1 className="hero-title mt-6 max-w-4xl">
                            Homes and hospitality<br />
                            <span className="font-serif-italic text-walnut">we've dressed.</span>
                        </h1>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 space-y-24 md:space-y-32">
                    {PROJECTS.map((p, i) => (
                        <Reveal key={p.title} className={`grid md:grid-cols-12 gap-10 md:gap-14 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                            <div className="md:col-span-7 hover-zoom aspect-cinema md:[direction:ltr]">
                                <LuxImg name={p.img} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="md:col-span-5 md:[direction:ltr]">
                                <p className="mag-number">— Project {String(i + 1).padStart(2, "0")}</p>
                                <h2 className="section-title mt-3">{p.title}</h2>
                                <p className="overline flex items-center gap-2 mt-4">
                                    <MapPin size={12} strokeWidth={1.4} /> {p.location}
                                </p>
                                <p className="mt-6 text-charcoal font-light leading-relaxed">{p.summary}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
