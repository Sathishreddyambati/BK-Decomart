// Central site data
export const SITE = {
    name: "BK Decomart",
    tagline: "Come, Let's Dressup Your Home",
    since: "1995",
    phone: "+91 97877 13802",
    phoneRaw: "+919787713802",
    whatsappRaw: "919787713802",
    email: "bkdecomartdigital@gmail.com",
    address: "12, Sivagangai Main Road, Gomathipuram, Madurai – 625020, Tamil Nadu, India",
    addressShort: "Gomathipuram, Madurai",
    hours: "Mon – Sat · 10:00 AM – 8:30 PM · Sun by appointment",
    mapEmbed:
        "https://www.google.com/maps?q=Gomathipuram+Madurai&z=15&output=embed",
    logoUrl:
        "https://customer-assets-0z36b82j.emergentagent.net/job_e74266b5-e3c2-4874-b82b-588fe5f497b3/artifacts/vglnx93l_IMG-20260714-WA0007.jpg",
    social: {
        instagram: "https://instagram.com/",
        facebook: "https://facebook.com/",
        youtube: "https://youtube.com/",
    },
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Fallback (curated luxury interior URLs) used when a generated image is missing.
const FALLBACK = {
    "hero-living": "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=2000&q=85",
    "brand-story": "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1400&q=85",
    "cat-curtains": "https://images.unsplash.com/photo-1599280611965-bef72efc48fb?auto=format&fit=crop&w=1400&q=85",
    "cat-blinds": "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=85",
    "cat-wallpapers": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    "cat-flooring": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    "cat-carpets": "https://images.unsplash.com/photo-1648634158203-199accfd7afc?auto=format&fit=crop&w=1400&q=85",
    "cat-indoor-mats": "https://images.unsplash.com/photo-1603466182843-75f713ba4ff3?auto=format&fit=crop&w=1400&q=85",
    "cat-outdoor-mats": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
    "cat-mattresses": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    "cat-plants": "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=85",
    "cat-stitching": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85",
    "room-living": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    "room-bedroom": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    "room-dining": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=85",
    "room-office": "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&w=1400&q=85",
    "before": "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1400&q=85",
    "after": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    "gallery-1": "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1400&q=85",
    "gallery-2": "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=85",
    "gallery-3": "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=85",
    "consultation": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
    "visualizer-demo": "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1400&q=85",
};

// Returns the URL for a generated luxury interior image.
export function img(name) {
    return `${API}/static/img/generated/${name}.png`;
}

export function imgWithFallback(name) {
    return {
        primary: img(name),
        fallback: FALLBACK[name] || FALLBACK["hero-living"],
    };
}

export function waLink(message = "") {
    const encoded = encodeURIComponent(
        message || `Hi BK Decomart, I'd like to know more about your home décor collection.`
    );
    return `https://wa.me/${SITE.whatsappRaw}?text=${encoded}`;
}

export function callLink() {
    return `tel:${SITE.phoneRaw}`;
}

export function mailLink() {
    return `mailto:${SITE.email}`;
}
