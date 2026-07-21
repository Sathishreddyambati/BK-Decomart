import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UploadCloud, Sparkles, RefreshCw, Download, MessageCircle, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import LuxImg from "../components/LuxImg";
import { API, waLink } from "../lib/site";

const PRODUCTS = [
    { key: "curtains",  label: "Curtains",  styles: ["eyelet", "pleated", "sheer", "blackout"] },
    { key: "blinds",    label: "Blinds",    styles: ["roller", "roman", "zebra", "vertical", "wooden"] },
    { key: "wallpaper", label: "Wallpaper", styles: ["designer", "3D", "textured"] },
    { key: "flooring",  label: "Flooring",  styles: ["wooden herringbone", "wide-plank walnut", "vinyl"] },
    { key: "carpet",    label: "Carpet",    styles: ["hand-knotted wool", "silk-blend"] },
];

export default function Visualizer() {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [product, setProduct] = useState("curtains");
    const [style, setStyle] = useState("eyelet");
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState(null);

    const currentStyles = PRODUCTS.find((p) => p.key === product)?.styles || [];

    // Downscale the uploaded image to a max dimension so the AI call stays
    // within Cloudflare's ingress window.
    const downscale = (file, maxDim = 1280) => new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
            const w = Math.round(img.width * scale);
            const h = Math.round(img.height * scale);
            const canvas = document.createElement("canvas");
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(url);
                    if (!blob) return reject(new Error("Failed to compress"));
                    const compressed = new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
                    resolve(compressed);
                },
                "image/jpeg",
                0.85
            );
        };
        img.onerror = () => reject(new Error("Invalid image"));
        img.src = url;
    });

    const onFile = async (f) => {
        if (!f) return;
        if (!f.type.startsWith("image/")) { toast.error("Please choose an image file"); return; }
        if (f.size > 12 * 1024 * 1024) { toast.error("Image must be under 12MB"); return; }
        try {
            const compressed = await downscale(f);
            setFile(compressed);
            setResult(null);
            const url = URL.createObjectURL(compressed);
            setPreview(url);
        } catch (e) {
            toast.error("Could not read image");
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        onFile(e.dataTransfer.files?.[0]);
    };

    const onGenerate = async () => {
        if (!file) { toast.error("Upload a room photo first"); return; }
        setBusy(true);
        setResult(null);
        try {
            const fd = new FormData();
            fd.append("image", file);
            fd.append("product", product);
            fd.append("style", style);
            const res = await axios.post(`${API}/visualize`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 90000,
            });
            setResult(res.data.image_data_url);
            toast.success("Your visualization is ready");
        } catch (e) {
            const msg = e?.response?.data?.detail || e.message || "Something went wrong";
            toast.error(String(msg));
        } finally {
            setBusy(false);
        }
    };

    const download = () => {
        if (!result) return;
        const a = document.createElement("a");
        a.href = result;
        a.download = `bkdecomart-visualization.png`;
        a.click();
    };

    return (
        <div className="pt-28">
            <section className="pb-16 bg-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8 items-end">
                    <Reveal className="md:col-span-8">
                        <p className="overline"><span className="hairline" /> AI Room Visualizer</p>
                        <h1 className="hero-title mt-6">
                            See it on your walls<br />
                            <span className="font-serif-italic text-walnut">before you decide.</span>
                        </h1>
                    </Reveal>
                    <Reveal className="md:col-span-4" delay={150}>
                        <p className="text-charcoal font-light leading-relaxed">
                            Upload a photograph of your room, pick a category, and let our AI render
                            a photo-realistic preview in seconds. Powered by Gemini Nano Banana.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
                    {/* Left — controls & upload */}
                    <div className="md:col-span-5 space-y-8" data-testid="visualizer-controls">
                        {/* Upload */}
                        <div
                            className="bg-beige border border-dashed border-champagne/50 p-8 text-center cursor-pointer hover:bg-linen/60 transition"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={onDrop}
                            onClick={() => inputRef.current?.click()}
                            data-testid="visualizer-dropzone"
                        >
                            <UploadCloud size={36} strokeWidth={1.2} className="text-champagne mx-auto" />
                            <p className="font-serif text-xl mt-4">Upload your room photo</p>
                            <p className="text-xs text-charcoal/70 mt-2 uppercase tracking-[0.18em]">JPG, PNG · max 8 MB</p>
                            <input
                                ref={inputRef} type="file" accept="image/*" className="hidden"
                                onChange={(e) => onFile(e.target.files?.[0])}
                                data-testid="visualizer-input"
                            />
                            {file && <p className="text-xs mt-4 text-charcoal">Selected: {file.name}</p>}
                        </div>

                        {/* Product select */}
                        <div>
                            <p className="overline mb-4">Choose product</p>
                            <div className="flex flex-wrap gap-2">
                                {PRODUCTS.map((p) => (
                                    <button
                                        key={p.key}
                                        onClick={() => { setProduct(p.key); setStyle(p.styles[0]); }}
                                        className={`px-4 py-2.5 text-xs uppercase tracking-[0.18em] border transition ${
                                            product === p.key
                                                ? "bg-matte text-ivory border-matte"
                                                : "border-linen text-charcoal hover:border-champagne"
                                        }`}
                                        data-testid={`viz-product-${p.key}`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Style select */}
                        <div>
                            <p className="overline mb-4">Style</p>
                            <div className="flex flex-wrap gap-2">
                                {currentStyles.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStyle(s)}
                                        className={`px-3 py-2 text-xs capitalize border transition ${
                                            style === s
                                                ? "bg-champagne text-matte border-champagne"
                                                : "border-linen text-charcoal hover:border-champagne"
                                        }`}
                                        data-testid={`viz-style-${s.replace(/\s+/g, "-")}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={onGenerate}
                            disabled={busy || !file}
                            className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                            data-testid="viz-generate-btn"
                        >
                            {busy ? (<><RefreshCw size={16} className="animate-spin" /> Rendering…</>) : (<><Sparkles size={16} /> Generate Preview</>)}
                        </button>

                        <p className="text-xs text-charcoal/60 leading-relaxed">
                            AI renders take roughly 20–40 seconds and are photo-realistic
                            approximations for inspiration. Book a free consultation for
                            an accurate, site-measured proposal.
                        </p>
                    </div>

                    {/* Right — preview canvas */}
                    <div className="md:col-span-7">
                        <div className="bg-beige border border-linen/60 aspect-cinema md:aspect-[4/5] relative overflow-hidden" data-testid="visualizer-canvas">
                            {result ? (
                                <img src={result} alt="AI preview" className="absolute inset-0 w-full h-full object-cover" />
                            ) : preview ? (
                                <img src={preview} alt="Your room" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <LuxImg name="visualizer-demo" alt="Example preview" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                            )}
                            {!preview && !result && (
                                <div className="absolute inset-0 flex items-center justify-center bg-ivory/60">
                                    <p className="font-serif text-2xl md:text-3xl text-matte text-center px-8">
                                        Your room appears here.
                                    </p>
                                </div>
                            )}
                        </div>

                        {result && (
                            <div className="mt-6 flex flex-wrap gap-3">
                                <button onClick={download} className="btn-outline" data-testid="viz-download-btn">
                                    <Download size={14} /> Download
                                </button>
                                <a
                                    href={waLink(`Hi BK Decomart, I love this AI visualization for my ${product}. Please share pricing options.`)}
                                    target="_blank" rel="noreferrer"
                                    className="btn-primary" data-testid="viz-whatsapp-btn"
                                >
                                    <MessageCircle size={14} /> Send on WhatsApp
                                </a>
                                <button onClick={() => { setResult(null); setPreview(null); setFile(null); }} className="btn-outline">
                                    <RefreshCw size={14} /> Start over
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 md:py-32 bg-walnut text-ivory">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                    <Reveal className="mb-14">
                        <p className="overline !text-champagne"><span className="hairline !bg-champagne" /> The Method</p>
                        <h2 className="section-title mt-4 !text-ivory">Three steps. <span className="font-serif-italic text-champagne">One transformation.</span></h2>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { n: "01", t: "Upload", d: "Snap a photo of your room in natural light." },
                            { n: "02", t: "Choose", d: "Pick a product category and style variation." },
                            { n: "03", t: "Preview", d: "Receive a magazine-quality AI render in seconds." },
                        ].map((s, i) => (
                            <Reveal key={s.n} delay={i * 100} className="border-t border-ivory/20 pt-6">
                                <p className="font-serif text-5xl text-champagne italic">{s.n}</p>
                                <h3 className="font-serif text-2xl mt-4">{s.t}</h3>
                                <p className="mt-3 text-ivory/70 leading-relaxed">{s.d}</p>
                            </Reveal>
                        ))}
                    </div>
                    <div className="mt-14">
                        <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary !bg-champagne !text-matte">
                            Talk to a Designer <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
