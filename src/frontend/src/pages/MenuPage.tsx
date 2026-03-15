import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import MenuSection from "../components/MenuSection";
import Navbar from "../components/Navbar";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MenuSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
