import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import GallerySection from "../components/GallerySection";
import HeroSection from "../components/HeroSection";
import MenuSection from "../components/MenuSection";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

export default function HomePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (actor) {
      actor
        .seedDatabaseIfEmpty()
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["availableMenuItems"] });
          queryClient.refetchQueries({ queryKey: ["availableMenuItems"] });
        })
        .catch(() => {});
    }
  }, [actor, queryClient]);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
