import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone, MapPin, Star, Sparkles, Ruler, Truck, Wrench, Award } from "lucide-react";
import { SITE, callLink, waLink } from "../lib/site";
import { CATEGORIES, TESTIMONIALS } from "../lib/products";
import LuxImg from "../components/LuxImg";
import Reveal from "../components/Reveal";
import BeforeAfter from "../components/BeforeAfter";
import CinematicHero from "../components/CinematicHero";
import Showreel from "../components/Showreel";
import Marquee from "../components/Marquee";
import Counter from "../components/Counter";
import Tilt from "../components/Tilt";
import TextReveal from "../components/TextReveal";

const FEATURED = ["curtains", "wallpapers", "flooring", "carpets"];
const ROOMS = [
    { key: "room-living", label: "Living Rooms", to: "/products/curtains" },
    { key: "room-bedroom", label: "Bedrooms", to: "/products/mattresses" },
    { key: "room-dining", label: "Dining Rooms", to: "/products/wallpapers" },
    { key: "room-office", label: "Studies", to: "/products/blinds" },
];

const WHY = [
    { icon: Award, title: "30 Years of Trust", copy: "Established 1995 · Two generations of Madurai homes." },
    { icon: Ruler, title: "Site Measurement", copy: "Free at-home consultation and precise measurement." },
    { icon: Wrench, title: "Full Installation", copy: "In-house teams for drapery, wallpapers and flooring." },
    { icon: Truck, title: "Pan-Tamil Nadu Delivery", copy: "Careful transport, arrival on the promised day." },
];

export default function Home() {
    return (
        <div>
            {/* ---------- CINEMATIC HERO ---------- */}
            <CinematicHero />

            {/* ---------- BRAND STORY ---------- */}
            <section className="py-24 md:py-32 bg-ivory" data-testid="home-story">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
                    <Reveal className="md:col-span-5">
                        <div className="relative hover-zoom">
                            <LuxImg name="brand-story" alt="Craftsmanship" className="w-full aspect-portrait object-cover" />
                            <span className="absolute -bottom-6 -right-6 md:right-8 bg-champagne text-matte px-6 py-3 text-xs uppercase tracking-[0.2em] float-y">
                                Since 1995
                            </span>
                            <svg className="ornament-spin absolute -top-6 -left-6 text-champagne" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M24 2 L26 20 L44 24 L26 28 L24 46 L22 28 L4 24 L22 20 Z" fill="currentColor" opacity="0.55" />
                            </svg>
                        </div>
                    </Reveal>
                    <Reveal className="md:col-span-7 md:pl-8" delay={200}>
                        <p className="overline"><span className="hairline" /> Our Story</p>
                        <TextReveal as="h2" className="section-title mt-4">
                            Three decades of dressing the finest homes in Madurai.
                        </TextReveal>
                        <p className="mt-8 text-base leading-relaxed text-charcoal font-light max-w-xl">
                            BK Decomart began as a small showroom on Sivagangai Main Road in 1995,
                            with one belief — that the fabrics, floors and finishes of a home should
                            be chosen with the same care as its people. Thirty years later, we still
                            visit every home we dress. We still measure every window ourselves.
                            And every curtain still passes through the hands of a stitcher we know
                            by name.
                        </p>
                        <div className="mt-8 grid grid-cols-3 gap-6 max-w-lg">
                            <div><p className="font-serif text-4xl text-champagne"><Counter to={30} suffix="+" /></p><p className="overline mt-1">Years</p></div>
                            <div><p className="font-serif text-4xl text-champagne"><Counter to={5000} suffix="+" duration={2400} /></p><p className="overline mt-1">Homes</p></div>
                            <div><p className="font-serif text-4xl text-champagne"><Counter to={10} /></p><p className="overline mt-1">Collections</p></div>
                        </div>
                        <Link to="/about" className="btn-outline mt-10 inline-flex" data-testid="story-about-btn">
                            Read Our Story <ArrowRight size={16} strokeWidth={1.4} />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ---------- FEATURED COLLECTIONS ---------- */}
            <section className="py-24 md:py-32 bg-beige" data-testid="home-collections">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                        <div>
                            <p className="overline"><span className="hairline" /> The Collections</p>
                            <h2 className="section-title mt-4 max-w-xl">
                                Curated categories,<br /><span className="font-serif-italic text-walnut">cinematic craft.</span>
                            </h2>
                        </div>
                        <Link to="/products" className="btn-outline shrink-0" data-testid="collections-view-all">
                            View all collections <ArrowRight size={16} />
                        </Link>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {FEATURED.map((slug, i) => {
                            const c = CATEGORIES.find((x) => x.slug === slug);
                            return (
                                <Reveal key={slug} delay={i * 120}>
                                    <Tilt strength={6}>
                                        <Link to={`/products/${slug}`} className="block group" data-testid={`featured-${slug}`}>
                                            <div className="hover-zoom aspect-portrait">
                                                <LuxImg name={c.img} alt={c.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="mt-5 flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="mag-number">— 0{i + 1}</p>
                                                    <h3 className="font-serif text-2xl mt-1">{c.name}</h3>
                                                    <p className="text-xs text-charcoal/70 mt-1">{c.subtitle}</p>
                                                </div>
                                                <ArrowRight size={18} strokeWidth={1.4} className="mt-3 text-champagne group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    </Tilt>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------- MARQUEE RIBBON ---------- */}
            <Marquee />

            {/* ---------- SHOP BY ROOM (Bento) ---------- */}
            <section className="py-24 md:py-32 bg-ivory" data-testid="home-rooms">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="mb-14 max-w-2xl">
                        <p className="overline"><span className="hairline" /> Shop by Room</p>
                        <h2 className="section-title mt-4">
                            Every room, dressed <span className="font-serif-italic text-walnut">for its purpose.</span>
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[220px]">
                        <Reveal className="col-span-12 md:col-span-7 md:row-span-2">
                            <Link to={ROOMS[0].to} className="block relative hover-zoom h-full">
                                <LuxImg name={ROOMS[0].key} alt="Living rooms" className="w-full h-full object-cover" />
                                <span className="absolute bottom-6 left-6 bg-ivory/95 backdrop-blur px-5 py-3">
                                    <p className="overline">Room 01</p>
                                    <p className="font-serif text-2xl mt-1">Living Rooms</p>
                                </span>
                            </Link>
                        </Reveal>
                        <Reveal className="col-span-6 md:col-span-5" delay={120}>
                            <Link to={ROOMS[1].to} className="block relative hover-zoom h-full">
                                <LuxImg name={ROOMS[1].key} alt="Bedrooms" className="w-full h-full object-cover" />
                                <span className="absolute bottom-4 left-4 bg-ivory/95 backdrop-blur px-4 py-2">
                                    <p className="overline">Room 02</p>
                                    <p className="font-serif text-xl mt-1">Bedrooms</p>
                                </span>
                            </Link>
                        </Reveal>
                        <Reveal className="col-span-6 md:col-span-2" delay={200}>
                            <Link to={ROOMS[3].to} className="block relative hover-zoom h-full">
                                <LuxImg name={ROOMS[3].key} alt="Studies" className="w-full h-full object-cover" />
                                <span className="absolute bottom-4 left-4 bg-ivory/95 backdrop-blur px-3 py-1.5">
                                    <p className="font-serif text-base">Studies</p>
                                </span>
                            </Link>
                        </Reveal>
                        <Reveal className="col-span-12 md:col-span-3" delay={280}>
                            <Link to={ROOMS[2].to} className="block relative hover-zoom h-full">
                                <LuxImg name={ROOMS[2].key} alt="Dining" className="w-full h-full object-cover" />
                                <span className="absolute bottom-4 left-4 bg-ivory/95 backdrop-blur px-3 py-1.5">
                                    <p className="font-serif text-base">Dining Rooms</p>
                                </span>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ---------- AI VISUALIZER TEASER ---------- */}
            <section className="py-24 md:py-32 bg-walnut text-ivory relative overflow-hidden" data-testid="home-visualizer">
                <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center relative">
                    <Reveal className="md:col-span-6">
                        <p className="overline !text-champagne"><span className="hairline !bg-champagne" /> AI Room Visualizer</p>
                        <h2 className="section-title mt-4 !text-ivory">
                            See it on your walls,<br />
                            <span className="font-serif-italic text-champagne">before you decide.</span>
                        </h2>
                        <p className="mt-8 text-ivory/70 leading-relaxed max-w-md">
                            Upload a photograph of your room. Choose curtains, blinds, wallpapers,
                            flooring or a carpet. Our AI renders a photo-realistic preview in
                            seconds — no imagination required.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link to="/visualizer" className="btn-primary !bg-champagne !text-matte hover:!bg-ivory" data-testid="visualizer-try-btn">
                                Try the Visualizer <Sparkles size={16} strokeWidth={1.4} />
                            </Link>
                            <a href={waLink("Hi BK Decomart, I'd like to discuss a room design.")} target="_blank" rel="noreferrer" className="btn-outline !text-ivory !border-ivory/40 hover:!bg-ivory hover:!text-matte">
                                Talk to a Designer
                            </a>
                        </div>
                    </Reveal>
                    <Reveal className="md:col-span-6" delay={200}>
                        <div className="hover-zoom aspect-[4/5] md:aspect-[4/5]">
                            <LuxImg name="visualizer-demo" alt="AI Visualizer preview" className="w-full h-full object-cover" />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------- BEFORE / AFTER ---------- */}
            <section className="py-24 md:py-32 bg-ivory" data-testid="home-before-after">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="mb-14 max-w-3xl">
                        <p className="overline"><span className="hairline" /> Before &amp; After</p>
                        <h2 className="section-title mt-4">
                            Drag the handle. <span className="font-serif-italic text-walnut">Watch a room become a home.</span>
                        </h2>
                    </Reveal>
                    <Reveal>
                        <BeforeAfter beforeName="before" afterName="after" />
                    </Reveal>
                </div>
            </section>

            {/* ---------- SHOWREEL ---------- */}
            <Showreel />

            {/* ---------- WHY BK ---------- */}
            <section className="py-24 md:py-32 bg-beige" data-testid="home-why">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="mb-14 max-w-2xl">
                        <p className="overline"><span className="hairline" /> Why BK Decomart</p>
                        <h2 className="section-title mt-4">
                            Considered choices, <span className="font-serif-italic text-walnut">quietly delivered.</span>
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {WHY.map((w, i) => (
                            <Reveal key={w.title} delay={i * 100} className="border-t border-linen pt-8">
                                <w.icon size={28} strokeWidth={1.2} className="text-champagne" />
                                <h3 className="font-serif text-2xl mt-6">{w.title}</h3>
                                <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">{w.copy}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- TESTIMONIALS ---------- */}
            <section className="py-24 md:py-32 bg-ivory" data-testid="home-testimonials">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="mb-14 max-w-2xl">
                        <p className="overline"><span className="hairline" /> Voices from Madurai</p>
                        <h2 className="section-title mt-4">
                            Kindness, from those we've<br /><span className="font-serif-italic text-walnut">dressed a home for.</span>
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                        {TESTIMONIALS.slice(0, 4).map((t, i) => (
                            <Reveal key={i} delay={i * 100} className="border-l-2 border-champagne pl-8">
                                <div className="flex gap-1 mb-4 text-champagne">
                                    {[0,1,2,3,4].map((s) => <Star key={s} size={14} fill="currentColor" strokeWidth={0} />)}
                                </div>
                                <p className="font-serif text-2xl md:text-3xl leading-snug text-matte">
                                    "{t.quote}"
                                </p>
                                <p className="mt-6 overline">{t.author} · {t.role}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- CONSULTATION CTA ---------- */}
            <section className="py-24 md:py-32 bg-beige relative" data-testid="home-consultation">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
                    <Reveal className="md:col-span-6">
                        <div className="hover-zoom aspect-portrait">
                            <LuxImg name="consultation" alt="Design consultation" className="w-full h-full object-cover" />
                        </div>
                    </Reveal>
                    <Reveal className="md:col-span-6 md:pl-8" delay={200}>
                        <p className="overline"><span className="hairline" /> Book a Consultation</p>
                        <h2 className="section-title mt-4">
                            Free home visit. <span className="font-serif-italic text-walnut">One conversation begins it all.</span>
                        </h2>
                        <p className="mt-6 text-charcoal font-light leading-relaxed max-w-md">
                            Tell us the rooms you'd like to dress. We'll bring swatches, take
                            measurements and share a written proposal within 48 hours — at no cost.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary" data-testid="cta-whatsapp">
                                <MessageCircle size={16} /> WhatsApp Us
                            </a>
                            <a href={callLink()} className="btn-outline" data-testid="cta-call">
                                <Phone size={16} /> {SITE.phone}
                            </a>
                            <Link to="/contact" className="btn-outline">
                                <MapPin size={16} /> Visit Showroom
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
