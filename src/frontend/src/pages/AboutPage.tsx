import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
