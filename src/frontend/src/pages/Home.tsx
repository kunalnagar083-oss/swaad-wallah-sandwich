import AboutSection from "../components/AboutSection";
import CartDrawer from "../components/CartDrawer";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import GallerySection from "../components/GallerySection";
import HeroSection from "../components/HeroSection";
import MenuSection from "../components/MenuSection";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div id="home">
      <Navbar />
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <CartDrawer />
    </div>
  );
}
