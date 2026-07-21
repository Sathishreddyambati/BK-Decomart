import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone, Heart, Share2, FileText } from "lucide-react";
import { CATEGORIES, findCategory } from "../lib/products";
import { SITE, callLink, waLink } from "../lib/site";
import LuxImg from "../components/LuxImg";
import Reveal from "../components/Reveal";
import { toast } from "sonner";

export default function ProductCategory() {
    const { slug } = useParams();
    const cat = findCategory(slug);
    if (!cat) return <Navigate to="/products" replace />;

    const related = CATEGORIES.filter((c) => c.slug !== slug).slice(0, 3);

    const shareMsg = `Look at BK Decomart's ${cat.name} collection — ${window.location.origin}/products/${cat.slug}`;

    const handleShare = async () => {
        if (navigator.share) {
            try { await navigator.share({ title: `${cat.name} · ${SITE.name}`, text: shareMsg, url: window.location.href }); } catch {}
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
        }
    };

    return (
        <div className="pt-24">
            {/* Hero */}
            <section className="relative min-h-[70svh] overflow-hidden" data-testid={`cat-hero-${cat.slug}`}>
                <LuxImg name={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/50 to-transparent" />
                <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pt-28 pb-16 min-h-[70svh] flex flex-col justify-end">
                    <Reveal className="max-w-3xl">
                        <p className="overline"><span className="hairline" /> Collection · {SITE.name}</p>
                        <h1 className="hero-title mt-6">{cat.name}</h1>
                        <p className="mt-6 text-base md:text-lg text-charcoal font-light max-w-2xl">{cat.subtitle}</p>
                    </Reveal>
                </div>
            </section>

            {/* Overview + Sticky CTA */}
            <section className="py-24 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12">
                    <Reveal className="md:col-span-7">
                        <p className="overline"><span className="hairline" /> Overview</p>
                        <h2 className="section-title mt-4 max-w-xl">The story behind our <span className="font-serif-italic text-walnut">{cat.name.toLowerCase()}.</span></h2>
                        <p className="mt-8 text-base leading-relaxed text-charcoal font-light max-w-2xl">{cat.overview}</p>

                        <div className="mt-14">
                            <p className="overline mb-6">Available varieties</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 max-w-2xl">
                                {cat.varieties.map((v, i) => (
                                    <div key={v} className="flex gap-4 items-baseline border-b border-linen/70 pb-4">
                                        <span className="mag-number">— {String(i + 1).padStart(2, "0")}</span>
                                        <span className="font-serif text-lg">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="md:col-span-5" delay={150}>
                        <div className="sticky top-28 bg-beige p-8 border border-linen/60">
                            <p className="overline">Enquire · {cat.name}</p>
                            <h3 className="font-serif text-3xl mt-3">Talk to our<br />design team.</h3>
                            <p className="text-sm text-charcoal/70 mt-4">Free consultation · Site measurement · Written quote in 48 hrs.</p>
                            <div className="mt-8 flex flex-col gap-3">
                                <a href={waLink(`Hi BK Decomart, I'm interested in your ${cat.name} collection. Please share options and pricing.`)}
                                   target="_blank" rel="noreferrer" className="btn-primary justify-center" data-testid="cat-whatsapp-btn">
                                    <MessageCircle size={16} /> WhatsApp Enquiry
                                </a>
                                <a href={callLink()} className="btn-outline justify-center" data-testid="cat-call-btn">
                                    <Phone size={16} /> Call {SITE.phone}
                                </a>
                                <a href={waLink(`Hi BK Decomart, please share a quotation for ${cat.name}.`)}
                                   target="_blank" rel="noreferrer" className="btn-outline justify-center" data-testid="cat-quote-btn">
                                    <FileText size={16} /> Request Quotation
                                </a>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <button onClick={handleShare} className="btn-outline justify-center !py-2.5" data-testid="cat-share-btn">
                                        <Share2 size={14} /> Share
                                    </button>
                                    <button onClick={() => toast.success(`${cat.name} saved to your favourites (locally).`)}
                                            className="btn-outline justify-center !py-2.5" data-testid="cat-save-btn">
                                        <Heart size={14} /> Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Features + Benefits */}
            <section className="py-24 bg-beige">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> Features</p>
                        <h2 className="section-title mt-4">Why our {cat.name.toLowerCase()} <span className="font-serif-italic text-walnut">stand apart.</span></h2>
                        <ul className="mt-10 space-y-5">
                            {cat.features.map((f, i) => (
                                <li key={f} className="flex gap-5 border-b border-linen/60 pb-5">
                                    <span className="mag-number shrink-0">— 0{i + 1}</span>
                                    <span className="text-base text-charcoal font-light">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delay={150}>
                        <p className="overline"><span className="hairline" /> Benefits</p>
                        <h2 className="section-title mt-4">What they bring<br /> <span className="font-serif-italic text-walnut">to your home.</span></h2>
                        <ul className="mt-10 space-y-5">
                            {cat.benefits.map((b, i) => (
                                <li key={b} className="flex gap-5 border-b border-linen/60 pb-5">
                                    <span className="mag-number shrink-0">— 0{i + 1}</span>
                                    <span className="text-base text-charcoal font-light">{b}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* Materials + Colours + Applications + Care */}
            <section className="py-24 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-12">
                    <Reveal>
                        <p className="overline">Applications</p>
                        <ul className="mt-4 space-y-2 text-sm text-charcoal font-light">
                            {cat.applications.map((a) => <li key={a}>· {a}</li>)}
                        </ul>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="overline">Materials</p>
                        <ul className="mt-4 space-y-2 text-sm text-charcoal font-light">
                            {cat.materials.map((m) => <li key={m}>· {m}</li>)}
                        </ul>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="overline">Colours</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {cat.colours.map((c) => (
                                <span key={c} className="text-xs uppercase tracking-[0.18em] border border-linen px-3 py-2 text-charcoal">{c}</span>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal delay={300}>
                        <p className="overline">Care Guide</p>
                        <ul className="mt-4 space-y-2 text-sm text-charcoal font-light">
                            {cat.care.map((c) => <li key={c}>· {c}</li>)}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* Related */}
            <section className="py-24 md:py-32 bg-beige">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="flex items-end justify-between mb-12">
                        <div>
                            <p className="overline"><span className="hairline" /> Related</p>
                            <h2 className="section-title mt-4">You may also love</h2>
                        </div>
                        <Link to="/products" className="btn-outline shrink-0">All Collections <ArrowRight size={16} /></Link>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {related.map((r, i) => (
                            <Reveal key={r.slug} delay={i * 100}>
                                <Link to={`/products/${r.slug}`} className="block group" data-testid={`related-${r.slug}`}>
                                    <div className="hover-zoom aspect-portrait">
                                        <LuxImg name={r.img} alt={r.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="mt-5">
                                        <h3 className="font-serif text-2xl">{r.name}</h3>
                                        <p className="text-sm text-charcoal/70 mt-1">{r.subtitle}</p>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
