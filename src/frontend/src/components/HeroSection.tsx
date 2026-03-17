import { Button } from "@/components/ui/button";
import { ChevronDown, Clock, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";
import { useShouldReduceMotion } from "../hooks/useReducedMotion";

export default function HeroSection() {
  const reduceMotion = useShouldReduceMotion();

  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x600.jpg"
          alt="Swaad Wallah Sandwich"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
      </div>

      {/* Decorative spice dots */}
      <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full bg-primary opacity-70" />
      <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-primary opacity-50" />
      <div className="absolute bottom-1/3 left-16 w-1.5 h-1.5 rounded-full bg-secondary opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm border border-primary/40 text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
        >
          <Star className="w-3 h-3 fill-current" />
          Bhopal's Favourite Sandwich Destination
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-800 text-white leading-tight mb-4"
        >
          Swaad Wallah
          <span
            className="block italic font-800"
            style={{ color: "oklch(0.82 0.26 55)" }}
          >
            Sandwich
          </span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/85 text-lg sm:text-xl font-body mb-3 max-w-lg mx-auto"
        >
          Fresh. Flavourful. Made with Love.
        </motion.p>

        {/* Info chips */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Indrapuri Sector C, Bhopal
          </span>
          <span className="text-white/30">·</span>
          <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
            <Clock className="w-3.5 h-3.5 text-primary" />
            Open 11 AM – 11 PM
          </span>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            size="lg"
            onClick={scrollToMenu}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 h-auto text-base shadow-warm"
            data-ocid="hero.primary_button"
          >
            View Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-white/40 text-white hover:bg-white/15 hover:text-white bg-transparent h-auto text-base px-8 py-3"
            data-ocid="hero.secondary_button"
          >
            Our Story
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator — CSS bounce only, no Framer Motion infinite loop */}
      <button
        type="button"
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}
