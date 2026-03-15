import Footer from "../components/Footer";
import GallerySection from "../components/GallerySection";
import Navbar from "../components/Navbar";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
