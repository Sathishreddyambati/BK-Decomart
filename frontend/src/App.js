import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductCategory from "@/pages/ProductCategory";
import Gallery from "@/pages/Gallery";
import Projects from "@/pages/Projects";
import Visualizer from "@/pages/Visualizer";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductCategory />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/visualizer" element={<Visualizer />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
            <Toaster position="bottom-center" richColors closeButton />
        </BrowserRouter>
    );
}

export default App;
