import { SITE } from "../lib/site";

// Endless luxury marquee — a slow gold-hairline ticker of collection names
// and craft phrases. Used as a section divider on the homepage.
const ITEMS = [
    "Curtains", "Blinds", "Wallpapers", "Flooring", "Carpets",
    "Mattresses", "Custom Stitching", "Since 1995", "Made in Madurai",
    "Come · Let's Dressup Your Home", "Artificial Plants", "Consultation",
];

const ornament = (
    <svg width="18" height="18" viewBox="0 0 20 20" className="text-champagne inline-block mx-8">
        <path d="M10 2 L11.3 8.7 L18 10 L11.3 11.3 L10 18 L8.7 11.3 L2 10 L8.7 8.7 Z" fill="currentColor" />
    </svg>
);

export default function Marquee() {
    const row = [...ITEMS, ...ITEMS, ...ITEMS]; // triple for seamless loop
    return (
        <section className="py-8 md:py-10 bg-matte overflow-hidden relative" data-testid="marquee-ribbon">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-matte to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-matte to-transparent z-10 pointer-events-none" />
            <div className="marquee-track">
                {row.map((it, i) => (
                    <div key={i} className="flex items-center shrink-0">
                        <span className="font-serif italic text-ivory text-2xl md:text-4xl whitespace-nowrap tracking-tight">
                            {it}
                        </span>
                        {ornament}
                    </div>
                ))}
            </div>
        </section>
    );
}

// silence unused import warning
void SITE;
