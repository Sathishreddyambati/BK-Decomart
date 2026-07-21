// Product catalogue for BK Decomart
export const CATEGORIES = [
    {
        slug: "curtains",
        name: "Curtains",
        subtitle: "Draped elegance for every window",
        img: "cat-curtains",
        room: "room-living",
        overview:
            "Curtains are the softest architecture of a room. Ours are cut, stitched and hung with the precision of a couturier — falling in generous folds that catch the golden hour and hush the noise of the world outside.",
        varieties: ["Eyelet Curtains", "Pleated Curtains", "Sheer Curtains", "Blackout Curtains"],
        features: [
            "Custom-stitched to the millimetre",
            "Imported linens, jacquards & velvets",
            "Concealed lead-weight hems",
            "Motorised rod compatibility",
        ],
        benefits: [
            "Softens acoustics and light",
            "Enhances thermal comfort",
            "Adds theatrical drama to any room",
        ],
        applications: ["Living rooms", "Bedrooms", "Home theatres", "Villas", "Boutique hotels"],
        materials: ["Belgian Linen", "Silk-blend Jacquard", "Cotton Velvet", "Recycled Poly-linen"],
        colours: ["Ivory", "Warm Beige", "Champagne", "Walnut", "Charcoal", "Sand"],
        care: [
            "Vacuum on low with an upholstery brush weekly",
            "Professional dry-clean once a year",
            "Rotate to prevent uneven sun-fading",
        ],
    },
    {
        slug: "blinds",
        name: "Blinds",
        subtitle: "Precision-crafted light control",
        img: "cat-blinds",
        room: "room-office",
        overview:
            "Where curtains whisper, blinds sculpt. Our blinds turn sunlight into a design instrument — sliced, filtered, dimmed or drenched, always on your terms.",
        varieties: ["Roller Blinds", "Roman Blinds", "Zebra Blinds", "Vertical Blinds", "Venetian Blinds", "Wooden Blinds"],
        features: ["Chain, cordless or motorised operation", "UV-filtering sunscreen fabrics", "Real walnut and oak slats", "Child-safe mechanisms"],
        benefits: ["Precise light control", "Sleek modern aesthetic", "Effortless daily operation"],
        applications: ["Studies", "Kitchens", "Balconies", "Retail", "Offices"],
        materials: ["Polyester screen 3%", "Belgian linen weave", "Solid walnut slats", "PVC aqua-resistant"],
        colours: ["Ivory", "Beige", "Charcoal", "Walnut", "Slate"],
        care: ["Dust weekly with a microfibre cloth", "Damp-wipe monthly", "Avoid harsh detergents on wood slats"],
    },
    {
        slug: "wallpapers",
        name: "Wallpapers",
        subtitle: "Walls that tell a story",
        img: "cat-wallpapers",
        room: "room-dining",
        overview:
            "From hand-illustrated botanicals to sculpted textures — our wallpapers turn the fifth surface of your room into its most memorable one.",
        varieties: ["Designer Wallpapers", "3D Wallpapers", "Textured Wallpapers"],
        features: ["Non-toxic pigments", "Peelable, easy-repair vinyls", "Bespoke mural sizing"],
        benefits: ["Instant transformation", "Conceals wall imperfections", "Fully repositionable"],
        applications: ["Feature walls", "Powder rooms", "Retail interiors", "Nurseries"],
        materials: ["Non-woven paper", "Grasscloth", "Vinyl-coated"],
        colours: ["Ivory-Gold", "Sage-Cream", "Walnut-Bronze", "Charcoal-Champagne"],
        care: ["Dust with a soft cloth", "Spot-clean with a damp sponge", "Avoid solvent cleaners"],
    },
    {
        slug: "flooring",
        name: "Flooring",
        subtitle: "The ground of your ambition",
        img: "cat-flooring",
        room: "room-living",
        overview:
            "Solid wood, engineered walnut, and premium vinyl — laid plank-by-plank with a jeweller's patience. A floor is felt long before it is seen.",
        varieties: ["Wooden Flooring", "Vinyl Flooring"],
        features: ["Click-lock or full-glue systems", "AC5-rated wear layer", "Waterproof plank options", "Herringbone & chevron patterns"],
        benefits: ["Warm underfoot feel", "Improves resale value", "Low-maintenance luxury"],
        applications: ["Living rooms", "Bedrooms", "Retail", "Restaurants"],
        materials: ["Engineered Walnut", "European Oak", "SPC Vinyl", "Bamboo"],
        colours: ["Natural Oak", "Smoked Walnut", "Espresso", "Whitewash"],
        care: ["Sweep or vacuum daily", "Use felt pads under furniture", "Wipe spills immediately"],
    },
    {
        slug: "carpets",
        name: "Carpets",
        subtitle: "Underfoot, understated, unforgettable",
        img: "cat-carpets",
        room: "room-bedroom",
        overview:
            "Wall-to-wall, room-size or hand-knotted rugs — chosen for pile, weave, and the way they hold golden hour light.",
        varieties: ["Wall-to-wall Carpets", "Handloomed Rugs", "Machine-Made Rugs"],
        features: ["Wool, silk-blend & nylon fibres", "Stain-resistant treatments", "Custom sizing to the inch"],
        benefits: ["Warmth and acoustic softening", "Zoning of open-plan rooms", "Timeless design statement"],
        applications: ["Bedrooms", "Living rooms", "Hotel suites", "Home theatres"],
        materials: ["New Zealand Wool", "Silk-blend", "Solution-dyed Nylon"],
        colours: ["Ivory", "Champagne", "Walnut", "Charcoal", "Sand"],
        care: ["Vacuum twice a week", "Rotate every 6 months", "Professional shampoo annually"],
    },
    {
        slug: "indoor-mats",
        name: "Indoor Floor Mats",
        subtitle: "A soft welcome at every threshold",
        img: "cat-indoor-mats",
        room: "room-living",
        overview:
            "Hand-bordered jute, cotton dhurries, and tufted mats that greet guests with quiet elegance the moment they step in.",
        varieties: ["Jute Mats", "Cotton Dhurries", "Tufted Mats", "Anti-skid Rubber-back"],
        features: ["Non-slip backing", "Machine-washable options", "Custom monogramming"],
        benefits: ["Protects flooring", "Absorbs incoming dirt", "Anchors an entry vignette"],
        applications: ["Foyers", "Kitchens", "Bathrooms", "Balcony doors"],
        materials: ["Natural Jute", "Cotton", "Polyester Tuft"],
        colours: ["Natural", "Ivory", "Charcoal", "Champagne"],
        care: ["Shake weekly", "Spot-clean with mild detergent", "Air-dry only"],
    },
    {
        slug: "outdoor-mats",
        name: "Outdoor Floor Mats",
        subtitle: "Weathered elegance for the entrance",
        img: "cat-outdoor-mats",
        room: "room-living",
        overview:
            "Coir, rubber, and PVC mats engineered for monsoons, dust and the daily choreography of Indian doorsteps.",
        varieties: ["Coir Mats", "Rubber-Ridged Mats", "PVC Loop Mats"],
        features: ["Weather & UV resistant", "Heavy-duty scraping surface", "Precision-cut edges"],
        benefits: ["Traps 90% of exterior grime", "Withstands monsoon", "Elevates curb appeal"],
        applications: ["Villa gates", "Apartment doors", "Restaurant entries", "Retail thresholds"],
        materials: ["Coir", "Vulcanised Rubber", "PVC"],
        colours: ["Natural Coir", "Charcoal", "Terracotta"],
        care: ["Beat weekly to release dust", "Hose down in monsoon", "Dry flat"],
    },
    {
        slug: "mattresses",
        name: "Mattresses",
        subtitle: "The architecture of a perfect night",
        img: "cat-mattresses",
        room: "room-bedroom",
        overview:
            "Layered latex, pocketed springs and memory foam — tuned to the human spine. Ten years of research, one deep breath.",
        varieties: ["Pocket Spring", "Latex Foam", "Memory Foam", "Hybrid"],
        features: ["Zero motion transfer", "Cooling gel-infused foam", "Removable Tencel covers", "10-year warranty"],
        benefits: ["Restorative deep sleep", "Precise spinal alignment", "Temperature-neutral comfort"],
        applications: ["Master bedrooms", "Guest suites", "Boutique hotels"],
        materials: ["Natural Latex", "High-density Memory Foam", "Pocketed Coils", "Tencel Fabric"],
        colours: ["Ivory Cover", "Charcoal Border"],
        care: ["Rotate head-to-foot every 3 months", "Air out monthly", "Use a breathable protector"],
    },
    {
        slug: "artificial-plants",
        name: "Artificial Plants",
        subtitle: "Botany, uninterrupted",
        img: "cat-plants",
        room: "room-living",
        overview:
            "Life-like foliage indistinguishable from living plants — no watering, no wilting, no compromise. Perfect for busy homes and Madurai's warm afternoons.",
        varieties: ["Olive Trees", "Fiddle-Leaf Figs", "Monstera", "Bonsai", "Wall Vines"],
        features: ["UV-stabilised leaves", "Real-touch stems", "Weighted planters for stability"],
        benefits: ["No maintenance", "Year-round greenery", "Allergy-free"],
        applications: ["Corners", "Foyers", "Balconies (shaded)", "Retail displays"],
        materials: ["Real-touch polyethylene", "Silk", "Cement-fibre planters"],
        colours: ["Deep Green", "Sage", "Autumn Bronze"],
        care: ["Dust monthly with a soft brush", "Wipe leaves with damp cloth", "Keep away from direct extreme heat"],
    },
    {
        slug: "custom-stitching",
        name: "Custom Stitching",
        subtitle: "Your fabric. Our atelier.",
        img: "cat-stitching",
        room: "room-dining",
        overview:
            "Bring your own fabric or choose from our library — our in-house atelier will draft, cut and stitch curtains, cushion covers, valances, bed-linens and roman shades to your exact specifications.",
        varieties: ["Curtain Stitching", "Cushion Covers", "Valances & Pelmets", "Bed Runners", "Table Linens"],
        features: ["Site measurement", "Pattern-matched seams", "Concealed weights", "3-day turnaround"],
        benefits: ["A truly bespoke fit", "Perfect fabric usage", "One workshop, one accountability"],
        applications: ["Homes", "Villas", "Hotels", "Retail"],
        materials: ["Bring-your-own", "Our imported library"],
        colours: ["Unlimited"],
        care: ["Fabric-specific care card included with delivery"],
    },
];

export const findCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const TESTIMONIALS = [
    {
        quote:
            "BK Decomart transformed our villa in three weeks. The curtains fall like they were painted by an old master.",
        author: "Aishwarya R.",
        role: "Homeowner, Anna Nagar",
    },
    {
        quote:
            "Twenty years in hospitality — no one else in Madurai understands drapery like the BK team.",
        author: "Karthik S.",
        role: "GM, Boutique Hotel",
    },
    {
        quote:
            "The wallpaper mural in our showroom is a conversation starter. Every visitor asks who did it.",
        author: "Meera V.",
        role: "Retail Founder",
    },
    {
        quote:
            "Their atelier stitched drapes for six windows in three days. Perfect fit, perfect fall.",
        author: "Nithin & Divya",
        role: "New homeowners",
    },
];

export const FAQS = [
    {
        q: "Do you offer home consultation and site measurement?",
        a: "Yes. Our consultants visit your home across Madurai and neighbouring districts at no cost. We measure every window and floor personally, take photographs, and prepare a design proposal within 48 hours.",
    },
    {
        q: "What is the turnaround time for custom curtains and blinds?",
        a: "Typically 5–10 working days from confirmation, depending on the fabric and quantity. Rush orders are possible for a small surcharge.",
    },
    {
        q: "Do you handle installation?",
        a: "Absolutely. Our in-house installation team fits rods, tracks, blinds, wallpapers, flooring and carpets — everything short of the mattress you sleep on.",
    },
    {
        q: "Can I bring my own fabric for stitching?",
        a: "Yes. Our custom-stitching atelier accepts customer-supplied fabric with a site measurement and a pattern brief.",
    },
    {
        q: "Do you deliver outside Madurai?",
        a: "We deliver across Tamil Nadu and to select cities in South India. Site installation outside Madurai is offered as a package.",
    },
    {
        q: "How does the AI Room Visualizer work?",
        a: "Upload a photo of your room, choose a product category (curtains, blinds, wallpaper, flooring, or carpet), and our AI renders a photo-realistic preview in seconds. Save it, share it on WhatsApp, or book a consultation.",
    },
    {
        q: "What are your store hours?",
        a: "We are open Monday to Saturday from 10:00 AM to 8:30 PM. Sundays are by appointment for private consultations.",
    },
    {
        q: "How can I request a quotation?",
        a: "Message us on WhatsApp at +91 97877 13802 with a rough photo and measurement, or visit our showroom in Gomathipuram, Madurai.",
    },
];

export const PROJECTS = [
    {
        title: "Villa Aranya",
        location: "Anna Nagar, Madurai",
        summary: "Full curtains, carpets and wallpapers across a 6-bedroom villa.",
        img: "gallery-1",
    },
    {
        title: "Hotel Silvana",
        location: "Alagar Kovil Road",
        summary: "Lobby drapery, corridor carpets and 32 guest-room suites.",
        img: "gallery-2",
    },
    {
        title: "Aara Studio",
        location: "K K Nagar",
        summary: "Retail showroom fit-out — flooring, blinds, feature wallpapers.",
        img: "gallery-3",
    },
    {
        title: "Meenakshi Residence",
        location: "Gomathipuram",
        summary: "Complete home transformation — from empty shell to family home.",
        img: "after",
    },
];
