import LuxImg from "../components/LuxImg";
import Reveal from "../components/Reveal";

const IMAGES = [
    { key: "hero-living",   span: "md:col-span-8 md:row-span-2" },
    { key: "cat-curtains",  span: "md:col-span-4" },
    { key: "cat-wallpapers",span: "md:col-span-4" },
    { key: "room-bedroom",  span: "md:col-span-4 md:row-span-2" },
    { key: "cat-blinds",    span: "md:col-span-4" },
    { key: "room-dining",   span: "md:col-span-4" },
    { key: "cat-carpets",   span: "md:col-span-4" },
    { key: "gallery-1",     span: "md:col-span-8" },
    { key: "cat-flooring",  span: "md:col-span-4" },
    { key: "gallery-2",     span: "md:col-span-6" },
    { key: "gallery-3",     span: "md:col-span-6" },
    { key: "after",         span: "md:col-span-8" },
    { key: "cat-plants",    span: "md:col-span-4" },
];

export default function Gallery() {
    return (
        <div className="pt-28">
            <section className="pb-14 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="overline"><span className="hairline" /> The Gallery</p>
                        <h1 className="hero-title mt-6 max-w-4xl">
                            Moments in <span className="font-serif-italic text-walnut">dressed homes.</span>
                        </h1>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[240px] md:auto-rows-[280px] gap-4 md:gap-5">
                        {IMAGES.map((it, i) => (
                            <Reveal key={i} delay={(i % 4) * 90} className={`hover-zoom ${it.span}`}>
                                <LuxImg name={it.key} alt="" className="w-full h-full object-cover" />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
