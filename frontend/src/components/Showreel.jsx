import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { SITE } from "../lib/site";
import LuxImg from "./LuxImg";
import Reveal from "./Reveal";

// Six-frame cinematic showreel — each frame plays for ~5s with a heavy Ken-Burns
// pan-zoom, subtle grain overlay and italic captions. Feels like watching a
// slow-cut interior design film. If a real MP4 URL is configured in
// SITE.showreelUrl, it takes over.
const FRAMES = [
    { key: "hero-living",   caption: "A three-decade atelier of curtains & drapery.", chapter: "Living" },
    { key: "cat-carpets",   caption: "Wool, silk, and hand-knotted patience.",         chapter: "Carpets" },
    { key: "cat-wallpapers",caption: "Walls that turn a room into a story.",           chapter: "Wallpaper" },
    { key: "cat-flooring",  caption: "Warm walnut, laid plank by plank.",              chapter: "Flooring" },
    { key: "room-bedroom",  caption: "Bedrooms dressed for a deeper sleep.",           chapter: "Bedroom" },
    { key: "brand-story",   caption: "Since 1995 · Madurai · Made by hand.",           chapter: "Craft" },
];

const FRAME_DURATION = 5000;

export default function Showreel() {
    const [i, setI] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);
    const wrapRef = useRef(null);
    const intervalRef = useRef(null);

    const hasVideo = !!SITE.showreelUrl;

    // Slideshow autoplay
    useEffect(() => {
        if (hasVideo || !playing) return;
        intervalRef.current = setInterval(() => {
            setI((v) => (v + 1) % FRAMES.length);
        }, FRAME_DURATION);
        return () => clearInterval(intervalRef.current);
    }, [playing, hasVideo]);

    const togglePlay = () => {
        if (hasVideo && videoRef.current) {
            if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
            else { videoRef.current.pause(); setPlaying(false); }
        } else {
            setPlaying((p) => !p);
        }
    };

    const toggleMute = () => {
        if (hasVideo && videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setMuted(videoRef.current.muted);
        } else {
            setMuted((m) => !m);
        }
    };

    const openFullscreen = () => {
        const el = wrapRef.current;
        if (!el) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else el.requestFullscreen?.();
    };

    return (
        <section className="py-24 md:py-32 bg-matte relative overflow-hidden" data-testid="home-showreel">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="overline !text-champagne"><span className="hairline !bg-champagne" /> The Showreel</p>
                        <h2 className="section-title !text-ivory mt-4 max-w-2xl">
                            Thirty seconds inside <span className="font-serif-italic text-champagne">BK Decomart.</span>
                        </h2>
                    </div>
                    <p className="text-ivory/60 max-w-sm text-sm font-light">
                        A short cinematic pass through our showroom, our atelier and the homes
                        we have dressed across Madurai.
                    </p>
                </Reveal>

                <Reveal>
                    <div
                        ref={wrapRef}
                        className="reel-wrap relative aspect-cinema md:aspect-[21/9] w-full overflow-hidden rounded-sm bg-matte shadow-deep"
                        data-testid="showreel-player"
                    >
                        {/* Video (if configured) */}
                        {hasVideo ? (
                            <video
                                ref={videoRef}
                                src={SITE.showreelUrl}
                                autoPlay muted={muted} loop playsInline preload="metadata"
                                className="absolute inset-0 w-full h-full object-cover"
                                onPlay={() => setPlaying(true)}
                                onPause={() => setPlaying(false)}
                            />
                        ) : (
                            <>
                                {/* Slideshow frames with heavy ken burns */}
                                {FRAMES.map((f, idx) => (
                                    <div
                                        key={f.key}
                                        className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                                            idx === i ? "opacity-100" : "opacity-0"
                                        }`}
                                        aria-hidden={idx !== i}
                                    >
                                        <div className={`absolute inset-0 overflow-hidden ${idx === i ? "reel-kb" : ""}`}>
                                            <LuxImg name={f.key} alt="" className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                    </div>
                                ))}

                                {/* Cinematic caption + chapter */}
                                <div className="absolute inset-0 bg-gradient-to-t from-matte/85 via-matte/20 to-matte/40" />
                                <div className="absolute bottom-8 md:bottom-14 left-6 md:left-14 right-6 md:right-14 flex items-end justify-between gap-4">
                                    <div key={i} className="max-w-2xl animate-fade-up" style={{ animationDuration: "0.8s" }}>
                                        <p className="overline !text-champagne">— Chapter · {FRAMES[i].chapter}</p>
                                        <p className="font-serif italic text-ivory text-2xl md:text-4xl mt-3 leading-snug">
                                            {FRAMES[i].caption}
                                        </p>
                                    </div>
                                    <p className="hidden md:block font-serif italic text-ivory/40 text-2xl">
                                        {String(i + 1).padStart(2, "0")} / {String(FRAMES.length).padStart(2, "0")}
                                    </p>
                                </div>

                                {/* Film grain overlay */}
                                <div className="absolute inset-0 pointer-events-none grain opacity-30" />
                            </>
                        )}

                        {/* Progress bar segments */}
                        <div className="absolute left-6 right-6 top-6 md:left-14 md:right-14 flex gap-2 z-10">
                            {FRAMES.map((_, idx) => (
                                <div key={idx} className="flex-1 h-[2px] bg-ivory/25 overflow-hidden">
                                    <div
                                        className="h-full bg-champagne origin-left"
                                        style={{
                                            transform: `scaleX(${
                                                idx < i ? 1 : idx > i ? 0 : (playing ? 1 : 0.5)
                                            })`,
                                            transition: idx === i && playing ? `transform ${FRAME_DURATION}ms linear` : "transform 0.3s ease",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Playback controls */}
                        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-14 flex items-center gap-2 z-10">
                            <button
                                onClick={togglePlay}
                                className="w-11 h-11 rounded-full border border-ivory/30 hover:border-champagne hover:text-champagne text-ivory backdrop-blur-md bg-matte/40 flex items-center justify-center transition"
                                aria-label={playing ? "Pause" : "Play"}
                                data-testid="reel-play-btn"
                            >
                                {playing ? <Pause size={16} strokeWidth={1.4} /> : <Play size={16} strokeWidth={1.4} />}
                            </button>
                            <button
                                onClick={toggleMute}
                                className="w-11 h-11 rounded-full border border-ivory/30 hover:border-champagne hover:text-champagne text-ivory backdrop-blur-md bg-matte/40 flex items-center justify-center transition"
                                aria-label={muted ? "Unmute" : "Mute"}
                                data-testid="reel-mute-btn"
                            >
                                {muted ? <VolumeX size={16} strokeWidth={1.4} /> : <Volume2 size={16} strokeWidth={1.4} />}
                            </button>
                            <button
                                onClick={openFullscreen}
                                className="w-11 h-11 rounded-full border border-ivory/30 hover:border-champagne hover:text-champagne text-ivory backdrop-blur-md bg-matte/40 flex items-center justify-center transition"
                                aria-label="Fullscreen"
                                data-testid="reel-fs-btn"
                            >
                                <Maximize2 size={16} strokeWidth={1.4} />
                            </button>
                        </div>

                        {/* Frame jump dots (chapters) */}
                        {!hasVideo && (
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-14 flex gap-3 z-10" data-testid="reel-chapters">
                                {FRAMES.map((f, idx) => (
                                    <button
                                        key={f.key}
                                        onClick={() => setI(idx)}
                                        className={`text-[0.65rem] uppercase tracking-[0.2em] transition ${
                                            idx === i ? "text-champagne" : "text-ivory/50 hover:text-ivory"
                                        }`}
                                    >
                                        {f.chapter}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </Reveal>

                <Reveal className="mt-8 flex flex-wrap gap-3 items-center text-ivory/60 text-xs uppercase tracking-[0.22em]" delay={200}>
                    <span className="w-8 h-px bg-champagne/50" />
                    <span>{FRAMES.length} chapters · {(FRAMES.length * FRAME_DURATION) / 1000}s ambient loop</span>
                </Reveal>
            </div>
        </section>
    );
}
