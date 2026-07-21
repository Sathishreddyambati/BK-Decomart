import { useState } from "react";
import { imgWithFallback } from "../lib/site";

// A luxury image component that first tries the AI-generated image
// (served from the backend static folder) and gracefully falls back
// to a curated Unsplash URL if the generation is unavailable.
export default function LuxImg({ name, alt = "", className = "", style, loading = "lazy", ...rest }) {
    const { primary, fallback } = imgWithFallback(name);
    const [src, setSrc] = useState(primary);
    return (
        <img
            src={src}
            alt={alt}
            loading={loading}
            className={className}
            style={style}
            onError={() => src !== fallback && setSrc(fallback)}
            {...rest}
        />
    );
}
