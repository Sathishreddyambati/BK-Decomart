import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
    return (
        <section className="min-h-[100svh] flex items-center justify-center bg-ivory pt-28 pb-24" data-testid="notfound-page">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
                <p className="overline"><span className="hairline" /> Page not found</p>
                <p className="font-serif text-[8rem] md:text-[12rem] leading-none text-champagne italic mt-4">404</p>
                <h1 className="section-title mt-4">
                    A curtain fell <span className="font-serif-italic text-walnut">between rooms.</span>
                </h1>
                <p className="mt-6 text-charcoal font-light max-w-md mx-auto">
                    The page you were looking for isn't dressed for showing right now.
                    Let's take you back to somewhere more inviting.
                </p>
                <div className="mt-10 flex flex-wrap gap-4 justify-center">
                    <Link to="/" className="btn-primary" data-testid="notfound-home-btn">
                        <Home size={16} /> Back Home
                    </Link>
                    <Link to="/products" className="btn-outline">
                        Explore Collections <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
