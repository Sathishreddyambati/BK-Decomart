import Reveal from "../components/Reveal";
import { SITE, callLink, mailLink, waLink } from "../lib/site";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export default function Contact() {
    const shareOnWhatsApp = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const msg = [
            `Hi BK Decomart!`,
            `Name: ${data.get("name")}`,
            `Phone: ${data.get("phone")}`,
            `Interested in: ${data.get("interest")}`,
            `Message: ${data.get("message")}`,
        ].join("\n");
        window.open(waLink(msg), "_blank", "noreferrer");
    };

    return (
        <div className="pt-28">
            <section className="pb-14 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> Contact</p>
                        <h1 className="hero-title mt-6 max-w-4xl">
                            Come say hello.<br />
                            <span className="font-serif-italic text-walnut">Tea is on us.</span>
                        </h1>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14">
                    {/* Contact info */}
                    <Reveal className="md:col-span-5 space-y-8">
                        <div>
                            <p className="overline">Showroom</p>
                            <p className="font-serif text-2xl mt-3 leading-snug flex gap-4">
                                <MapPin size={22} strokeWidth={1.2} className="text-champagne shrink-0 mt-1" />
                                {SITE.address}
                            </p>
                        </div>
                        <div>
                            <p className="overline">Call</p>
                            <a href={callLink()} className="font-serif text-2xl mt-3 flex gap-4 hover:text-champagne" data-testid="contact-phone">
                                <Phone size={22} strokeWidth={1.2} className="text-champagne shrink-0 mt-1" />
                                {SITE.phone}
                            </a>
                        </div>
                        <div>
                            <p className="overline">Email</p>
                            <a href={mailLink()} className="font-serif text-xl mt-3 flex gap-4 hover:text-champagne break-all" data-testid="contact-email">
                                <Mail size={22} strokeWidth={1.2} className="text-champagne shrink-0 mt-1" />
                                {SITE.email}
                            </a>
                        </div>
                        <div>
                            <p className="overline">Hours</p>
                            <p className="mt-3 flex gap-4 text-charcoal font-light">
                                <Clock size={22} strokeWidth={1.2} className="text-champagne shrink-0 mt-1" />
                                {SITE.hours}
                            </p>
                        </div>
                        <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary" data-testid="contact-whatsapp">
                            <MessageCircle size={16} /> WhatsApp Us
                        </a>
                    </Reveal>

                    {/* Enquiry form (deep-link to WhatsApp) */}
                    <Reveal className="md:col-span-7" delay={200}>
                        <form onSubmit={shareOnWhatsApp} className="bg-beige p-8 md:p-10 border border-linen/60 space-y-6" data-testid="contact-form">
                            <div>
                                <p className="overline">Send an Enquiry</p>
                                <h2 className="section-title mt-3 !text-3xl">A few details, <span className="font-serif-italic text-walnut">and we'll take it from there.</span></h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                <label className="block">
                                    <span className="text-xs uppercase tracking-[0.2em] text-charcoal">Name</span>
                                    <input name="name" required className="mt-2 w-full bg-ivory border border-linen px-4 py-3 focus:border-champagne outline-none" data-testid="contact-name" />
                                </label>
                                <label className="block">
                                    <span className="text-xs uppercase tracking-[0.2em] text-charcoal">Phone</span>
                                    <input name="phone" required inputMode="tel" className="mt-2 w-full bg-ivory border border-linen px-4 py-3 focus:border-champagne outline-none" data-testid="contact-phone-input" />
                                </label>
                            </div>
                            <label className="block">
                                <span className="text-xs uppercase tracking-[0.2em] text-charcoal">Interested in</span>
                                <select name="interest" className="mt-2 w-full bg-ivory border border-linen px-4 py-3 focus:border-champagne outline-none" data-testid="contact-interest">
                                    <option>Curtains</option>
                                    <option>Blinds</option>
                                    <option>Wallpapers</option>
                                    <option>Flooring</option>
                                    <option>Carpets</option>
                                    <option>Indoor Floor Mats</option>
                                    <option>Outdoor Floor Mats</option>
                                    <option>Mattresses</option>
                                    <option>Artificial Plants</option>
                                    <option>Custom Stitching</option>
                                    <option>Full Home Consultation</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-xs uppercase tracking-[0.2em] text-charcoal">Message</span>
                                <textarea name="message" rows={4} className="mt-2 w-full bg-ivory border border-linen px-4 py-3 focus:border-champagne outline-none" data-testid="contact-message" />
                            </label>
                            <button type="submit" className="btn-primary w-full justify-center" data-testid="contact-submit">
                                <MessageCircle size={16} /> Send via WhatsApp
                            </button>
                            <p className="text-xs text-charcoal/60">Submitting opens WhatsApp with your enquiry pre-filled.</p>
                        </form>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="aspect-cinema border border-linen/60">
                        <iframe
                            title="BK Decomart Location"
                            src={SITE.mapEmbed}
                            className="w-full h-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            data-testid="contact-map"
                        />
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
