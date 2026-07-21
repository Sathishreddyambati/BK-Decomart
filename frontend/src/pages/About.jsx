import LuxImg from "../components/LuxImg";
import Reveal from "../components/Reveal";
import { SITE } from "../lib/site";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MILESTONES = [
    { year: "1995", label: "Founded on Sivagangai Main Road, Madurai." },
    { year: "2003", label: "First imported curtain fabric collection." },
    { year: "2012", label: "Custom stitching atelier established in-house." },
    { year: "2018", label: "Full-service flooring & carpet division launched." },
    { year: "2024", label: "AI Room Visualizer introduced — a first in Madurai." },
];

export default function About() {
    return (
        <div className="pt-28">
            {/* Hero */}
            <section className="pb-16 md:pb-24 bg-ivory" data-testid="about-hero">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 items-end">
                    <Reveal className="md:col-span-7">
                        <p className="overline"><span className="hairline" /> About {SITE.name}</p>
                        <h1 className="hero-title mt-6">
                            A Madurai atelier of<br />
                            <span className="font-serif-italic text-walnut">home dressing.</span>
                        </h1>
                    </Reveal>
                    <Reveal className="md:col-span-5" delay={200}>
                        <p className="text-base md:text-lg leading-relaxed text-charcoal font-light">
                            Since 1995, we have been curating the fabrics, floors and finishes that
                            turn houses into homes. Two generations, one showroom, and a network of
                            craftspeople who know every fibre we sell by name.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="hover-zoom aspect-cinema">
                        <LuxImg name="brand-story" alt="Atelier" className="w-full h-full object-cover" />
                    </Reveal>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 bg-beige" data-testid="about-philosophy">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12">
                    <Reveal className="md:col-span-4">
                        <p className="overline"><span className="hairline" /> Our Philosophy</p>
                        <h2 className="section-title mt-4">Considered <span className="font-serif-italic text-walnut">by hand.</span></h2>
                    </Reveal>
                    <Reveal className="md:col-span-8 md:pl-8 grid gap-8" delay={200}>
                        <div>
                            <p className="mag-number">— 01</p>
                            <h3 className="font-serif text-2xl mt-2">One showroom. Thirty years.</h3>
                            <p className="mt-3 text-charcoal font-light leading-relaxed max-w-2xl">
                                We have never scaled by opening more branches. We have scaled by getting
                                better at the one thing we've always done — dressing homes with care.
                            </p>
                        </div>
                        <div>
                            <p className="mag-number">— 02</p>
                            <h3 className="font-serif text-2xl mt-2">Every window, personally.</h3>
                            <p className="mt-3 text-charcoal font-light leading-relaxed max-w-2xl">
                                Our senior designers still visit each home. Measurements are taken by
                                the same hands that will oversee the stitching, cutting and installation.
                            </p>
                        </div>
                        <div>
                            <p className="mag-number">— 03</p>
                            <h3 className="font-serif text-2xl mt-2">Craft over inventory.</h3>
                            <p className="mt-3 text-charcoal font-light leading-relaxed max-w-2xl">
                                Our in-house atelier means we can promise a fit no ready-made curtain
                                can match. Bring your own fabric or choose from our library — the fall
                                and finish will belong to you alone.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 md:py-32 bg-ivory" data-testid="about-timeline">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="mb-14 max-w-2xl">
                        <p className="overline"><span className="hairline" /> The Timeline</p>
                        <h2 className="section-title mt-4">Thirty years, <span className="font-serif-italic text-walnut">quietly built.</span></h2>
                    </Reveal>
                    <div className="grid gap-8 md:grid-cols-5">
                        {MILESTONES.map((m, i) => (
                            <Reveal key={m.year} delay={i * 100} className="border-t border-linen pt-6">
                                <p className="font-serif text-4xl text-champagne">{m.year}</p>
                                <p className="mt-3 text-sm text-charcoal font-light leading-relaxed">{m.label}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-walnut text-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
                    <Reveal>
                        <p className="overline !text-champagne"><span className="hairline !bg-champagne" /> The Invitation</p>
                        <h2 className="section-title mt-4 !text-ivory max-w-3xl mx-auto">
                            Come by the showroom in Gomathipuram. <span className="font-serif-italic text-champagne">Tea is on us.</span>
                        </h2>
                        <Link to="/contact" className="btn-primary !bg-champagne !text-matte mt-10 inline-flex">
                            Plan Your Visit <ArrowRight size={16} />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
