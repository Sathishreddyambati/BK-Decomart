import Reveal from "../components/Reveal";
import { FAQS } from "../lib/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function FAQ() {
    return (
        <div className="pt-28">
            <section className="pb-14 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> Frequently Asked</p>
                        <h1 className="hero-title mt-6 max-w-4xl">
                            Everything you might <span className="font-serif-italic text-walnut">quietly wonder.</span>
                        </h1>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-3xl mx-auto px-6 md:px-10">
                    <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
                        {FAQS.map((f, i) => (
                            <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-linen">
                                <AccordionTrigger className="text-left font-serif text-xl md:text-2xl py-6 hover:text-champagne">
                                    <span className="mag-number pr-4">— {String(i + 1).padStart(2, "0")}</span>
                                    {f.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-base leading-relaxed text-charcoal font-light pb-6 pl-12">
                                    {f.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </div>
    );
}
