import { useEffect, useState } from "react";
import { SITE } from "../lib/site";

export default function Loader() {
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setHidden(true), 1600);
        return () => clearTimeout(t);
    }, []);
    return (
        <div
            className={`loader-wrap ${hidden ? "hidden-loader" : ""}`}
            data-testid="site-loader"
            aria-hidden={hidden}
        >
            <img
                src={SITE.logoUrl}
                alt={SITE.name}
                className="w-28 md:w-36 h-auto animate-fade-up"
                style={{ animationDuration: "1.2s" }}
            />
            <div className="loader-line" />
            <p className="overline animate-fade-up" style={{ animationDelay: "0.35s" }}>
                {SITE.tagline}
            </p>
        </div>
    );
}
