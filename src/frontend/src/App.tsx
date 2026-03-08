import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── Constants ── */
const BUSINESS_NAME = "Swaad Wallah Sandwich";
const ADDRESS = "Prabhat Chauraha, Bhopal, MP";
const PHONE = "9303526637";
const INSTAGRAM = "@Swaad_Wallah_Sandwich";
const HOURS = "11:00 AM – 11:00 PM (Daily)";
const CURRENT_YEAR = new Date().getFullYear();

const HERO_IMAGES = [
  {
    src: "/assets/uploads/20260224_022003-5.jpg",
    alt: "Swaad Wallah Sandwich – Business Banner",
  },
  {
    src: "/assets/uploads/slide-3-1.jpg",
    alt: "Fresh Sandwich – Swaad Wallah",
  },
  {
    src: "/assets/uploads/Gemini_Generated_Image_ki7wxhki7wxhki7w-2.png",
    alt: "Owner with Signature Sandwich",
  },
  {
    src: "/assets/uploads/slide-3-1-3.jpg",
    alt: "Tasty Sandwiches – Swaad Wallah",
  },
  {
    src: "/assets/uploads/Gemini_Generated_Image_ki7wxhki7wxhki7w-1-4.png",
    alt: "Illustrated Owner Portrait",
  },
];

const MENU_ITEMS = [
  {
    id: 1,
    emoji: "🥪",
    name: "Sandwich",
    desc: "Crispy, fresh, loaded with veggies & sauces",
  },
  {
    id: 2,
    emoji: "🍜",
    name: "Chaumin",
    desc: "Spicy wok-tossed noodles with desi twist",
  },
  {
    id: 3,
    emoji: "☕",
    name: "Cold Coffee",
    desc: "Chilled coffee blended to perfection",
  },
  {
    id: 4,
    emoji: "🥭",
    name: "Mango Juice",
    desc: "Fresh mango pulp – taste of summer",
  },
  {
    id: 5,
    emoji: "🍕",
    name: "Pizza",
    desc: "Loaded with toppings, baked fresh daily",
  },
];

/* ── Navbar ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Menu", href: "#menu", ocid: "nav.menu_link" },
    { label: "Gallery", href: "#gallery", ocid: "nav.gallery_link" },
    { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-warm-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          type="button"
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🥪</span>
          <span className="font-display text-xl font-bold text-cream leading-tight">
            Swaad Wallah
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid={link.ocid}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.href);
              }}
              className="font-body font-semibold text-cream/90 hover:text-saffron transition-colors duration-200 text-sm uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE}`}
            className="px-5 py-2 rounded-full bg-saffron text-white font-semibold text-sm hover:bg-saffron-dark transition-colors duration-200"
          >
            Call Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-charcoal/98 border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid={link.ocid}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="font-body font-semibold text-cream py-2 text-lg border-b border-white/10 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${PHONE}`}
                className="mt-2 px-6 py-3 rounded-full bg-saffron text-white font-bold text-center"
              >
                📞 Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Hero Carousel ── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = HERO_IMAGES.length;

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAuto]);

  const go = (dir: "next" | "prev") => {
    setCurrent((c) =>
      dir === "next" ? (c + 1) % total : (c - 1 + total) % total,
    );
    startAuto();
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={HERO_IMAGES[current].src}
            alt={HERO_IMAGES[current].alt}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-gradient" />
        {/* Decorative spice dots */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.2 55 / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-saffron/90 text-white text-xs font-bold uppercase tracking-[0.2em] mb-5">
            🌶️ Bhopal's Favourite Street Food
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Swaad
            <br />
            <span className="text-saffron">Wallah</span>
          </h1>
          <p className="font-body text-lg md:text-2xl text-white/90 font-light mb-2">
            Fresh & Tasty
          </p>
          <p className="font-body text-base md:text-lg text-white/70 flex items-center justify-center gap-2">
            <MapPin size={16} className="text-saffron" />
            {ADDRESS}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3.5 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-all duration-300 shadow-warm hover:shadow-warm-lg"
            >
              View Menu
            </button>
            <a
              href={`tel:${PHONE}`}
              className="px-8 py-3.5 rounded-full border-2 border-white/70 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              📞 Call Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        data-ocid="hero.carousel_prev"
        onClick={() => go("prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-saffron text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        data-ocid="hero.carousel_next"
        onClick={() => go("next")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-saffron text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {HERO_IMAGES.map((img, i) => (
          <button
            type="button"
            key={img.src}
            onClick={() => {
              setCurrent(i);
              startAuto();
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-saffron"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Info Cards Section ── */
function InfoSection() {
  const cards = [
    {
      icon: <MapPin size={28} className="text-saffron" />,
      title: "Find Us",
      content: ADDRESS,
      sub: "Bhopal, Madhya Pradesh",
      href: `https://maps.google.com/?q=${encodeURIComponent(`${ADDRESS} Bhopal`)}`,
      linkLabel: "Get Directions",
    },
    {
      icon: <Clock size={28} className="text-saffron" />,
      title: "Open Daily",
      content: HOURS,
      sub: "Come any time, we're here for you!",
      href: null,
      linkLabel: null,
    },
    {
      icon: <Phone size={28} className="text-saffron" />,
      title: "Call Us",
      content: PHONE,
      sub: "Tap to call directly",
      href: `tel:${PHONE}`,
      linkLabel: "Call Now",
      ocid: "contact.phone_link",
    },
    {
      icon: <Instagram size={28} className="text-saffron" />,
      title: "Follow Us",
      content: INSTAGRAM,
      sub: "Stay updated on Instagram",
      href: "https://instagram.com/Swaad_Wallah_Sandwich",
      linkLabel: "Follow",
    },
  ];

  return (
    <section className="py-20 spice-pattern bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-saffron text-sm font-bold uppercase tracking-[0.2em] mb-3">
            — Visit Us —
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            Find, Visit & Connect
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-warm card-hover flex flex-col items-center text-center border border-saffron/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-saffron/10 flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-charcoal mb-1">
                {card.title}
              </h3>
              <p className="font-body font-semibold text-foreground mb-1 text-base">
                {card.content}
              </p>
              <p className="font-body text-muted-foreground text-sm mb-4">
                {card.sub}
              </p>
              {card.href && (
                <a
                  href={card.href}
                  data-ocid={card.ocid}
                  target={card.href.startsWith("tel") ? undefined : "_blank"}
                  rel={
                    card.href.startsWith("tel")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="mt-auto inline-flex items-center gap-1.5 text-saffron-dark font-semibold text-sm hover:text-chili transition-colors"
                >
                  {card.linkLabel}
                  <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Menu Section ── */
function MenuSection() {
  return (
    <section
      id="menu"
      data-ocid="menu.section"
      className="py-24 bg-charcoal relative overflow-hidden"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.72 0.2 55) 0, oklch(0.72 0.2 55) 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-saffron text-sm font-bold uppercase tracking-[0.2em] mb-3">
            — Our Specialties —
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            What We Serve
          </h2>
          <p className="font-body text-white/60 text-lg max-w-xl mx-auto">
            Fresh ingredients, bold flavours — made with love in Bhopal
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              data-ocid={`menu.item.${item.id}`}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center cursor-default hover:bg-saffron/15 hover:border-saffron/40 transition-all duration-300"
            >
              <span className="text-5xl mb-4 drop-shadow-sm">{item.emoji}</span>
              <h3 className="font-display text-lg font-bold text-cream mb-2">
                {item.name}
              </h3>
              <p className="font-body text-white/55 text-xs leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-colors shadow-warm"
          >
            <Phone size={18} />
            Order by Phone: {PHONE}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Gallery Section ── */
function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const goPrev = useCallback(
    () =>
      setLightbox((c) =>
        c !== null ? (c - 1 + HERO_IMAGES.length) % HERO_IMAGES.length : null,
      ),
    [],
  );
  const goNext = useCallback(
    () =>
      setLightbox((c) => (c !== null ? (c + 1) % HERO_IMAGES.length : null)),
    [],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLightbox, goPrev, goNext]);

  // Grid layout: 2 large + 3 smaller
  const gridClasses = [
    "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1",
  ];

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="py-24 bg-cream"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-saffron text-sm font-bold uppercase tracking-[0.2em] mb-3">
            — Our Moments —
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            Gallery
          </h2>
          <p className="font-body text-muted-foreground text-lg mt-3">
            A glimpse into the flavours of Swaad Wallah
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 auto-rows-[220px]">
          {HERO_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              data-ocid={`gallery.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`gallery-item relative overflow-hidden rounded-2xl cursor-pointer shadow-warm group ${gridClasses[i]}`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-400 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-3xl">
                  🔍
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-saffron text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={HERO_IMAGES[lightbox].src}
              alt={HERO_IMAGES[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-saffron text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body">
              {lightbox + 1} / {HERO_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Contact / Footer Section ── */
function ContactFooter() {
  return (
    <footer id="contact" data-ocid="contact.section">
      {/* Contact Band */}
      <div className="bg-saffron-dark py-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-white/70 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              — Get In Touch —
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Visit Us Today
            </h2>
            <p className="font-body text-white/80 text-lg mt-3">
              We're open every day — come taste the difference!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin size={24} className="text-white" />,
                label: "Address",
                value: ADDRESS,
                value2: "Bhopal, MP",
                href: `https://maps.google.com/?q=${encodeURIComponent(`${ADDRESS} Bhopal`)}`,
              },
              {
                icon: <Phone size={24} className="text-white" />,
                label: "Phone",
                value: PHONE,
                value2: "Tap to call",
                href: `tel:${PHONE}`,
                ocid: "contact.phone_link" as const,
              },
              {
                icon: <Clock size={24} className="text-white" />,
                label: "Hours",
                value: "11:00 AM – 11:00 PM",
                value2: "Open Daily",
                href: null,
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <span className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    data-ocid={item.ocid}
                    target={item.href.startsWith("tel") ? undefined : "_blank"}
                    rel={
                      item.href.startsWith("tel")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="text-white font-bold text-lg hover:text-turmeric transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-white font-bold text-lg">
                    {item.value}
                  </span>
                )}
                <span className="text-white/70 text-sm mt-0.5">
                  {item.value2}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <a
              href="https://instagram.com/Swaad_Wallah_Sandwich"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-saffron-dark font-bold text-lg rounded-full hover:bg-cream transition-colors shadow-warm"
            >
              <Instagram size={22} />
              Follow {INSTAGRAM}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div className="bg-charcoal py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥪</span>
            <span className="font-display text-lg font-bold text-cream">
              {BUSINESS_NAME}
            </span>
          </div>
          <p className="font-body text-white/50 text-sm">
            © {CURRENT_YEAR} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p className="font-body text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-saffron transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <InfoSection />
        <MenuSection />
        <GallerySection />
      </main>
      <ContactFooter />
    </div>
  );
}
