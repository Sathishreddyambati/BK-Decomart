import Nav from "./Nav";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Loader from "./Loader";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return (
        <>
            <Loader />
            <Nav />
            <main data-testid="site-main">{children}</main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
