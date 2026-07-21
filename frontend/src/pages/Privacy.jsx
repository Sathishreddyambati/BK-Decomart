import Reveal from "../components/Reveal";
import { SITE } from "../lib/site";

const SECTIONS = [
    { t: "Information We Collect", b: "We collect only the information you share via WhatsApp, phone, email, our contact form, or our AI Room Visualizer (a room photo you upload). We do not build tracking profiles." },
    { t: "How We Use It", b: "To respond to enquiries, prepare quotations, coordinate site measurement and installation, and improve our services. Photos uploaded to the AI Visualizer are used solely to generate your requested preview." },
    { t: "Data Sharing", b: "We never sell your data. We may share it with our design, stitching or logistics team strictly to fulfil your enquiry, and with our AI provider (Google Gemini) for image generation." },
    { t: "Retention", b: "Uploaded room photos are retained only for as long as needed to serve you. Enquiry details are kept for our business records under Indian tax and consumer laws." },
    { t: "Your Rights", b: "You may request access, correction or deletion of your personal information at any time by writing to " + SITE.email + "." },
    { t: "Cookies", b: "Our website uses minimal essential cookies only. No advertising cookies are set." },
    { t: "Contact", b: `Questions? Write to ${SITE.email} or call ${SITE.phone}.` },
];

export default function Privacy() {
    return (
        <div className="pt-28">
            <section className="pb-14 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> Legal</p>
                        <h1 className="hero-title mt-6">Privacy Policy</h1>
                        <p className="text-sm text-charcoal/70 mt-4">Last updated · January 2026</p>
                    </Reveal>
                </div>
            </section>
            <section className="pb-24">
                <div className="max-w-3xl mx-auto px-6 md:px-10 space-y-10">
                    {SECTIONS.map((s, i) => (
                        <Reveal key={s.t} delay={i * 50}>
                            <p className="mag-number">— {String(i + 1).padStart(2, "0")}</p>
                            <h2 className="font-serif text-2xl mt-2">{s.t}</h2>
                            <p className="mt-3 text-charcoal font-light leading-relaxed">{s.b}</p>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
