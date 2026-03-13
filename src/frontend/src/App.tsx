import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Instagram,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  ShoppingCart,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  backendInterface as AppBackendInterface,
  MenuItem,
  Message,
  Order,
  OrderItem,
} from "./backend.d";
import { useActor } from "./hooks/useActor";

/* ── Constants ── */
const BUSINESS_NAME = "Swaad Wallah Sandwich";
const OWNER_NAME = "Kunall_nagarrr";
const ADDRESS = "Indrapuri Sector C, Bhopal, MP";
const PHONE = "9303526637";
const INSTAGRAM = "@Swaad_Wallah_Sandwich";
const HOURS = "11:00 AM – 11:00 PM (Daily)";

const STATIC_MENU = [
  {
    id: BigInt(1),
    name: "Veg Sandwich",
    category: "Sandwich",
    price: BigInt(40),
    ingredients: "Bread, fresh veggies, tomato, onion, sauces",
  },
  {
    id: BigInt(2),
    name: "Cheese Sandwich",
    category: "Sandwich",
    price: BigInt(60),
    ingredients: "Bread, cheese, veggies, mayo",
  },
  {
    id: BigInt(3),
    name: "Grilled Sandwich",
    category: "Sandwich",
    price: BigInt(50),
    ingredients: "Toasted bread, veggies, butter, spices",
  },
  {
    id: BigInt(4),
    name: "Club Sandwich",
    category: "Sandwich",
    price: BigInt(70),
    ingredients: "Layered bread, veggies, cheese, sauces",
  },
  {
    id: BigInt(5),
    name: "Paneer Sandwich",
    category: "Sandwich",
    price: BigInt(70),
    ingredients: "Bread, paneer tikka, veggies, mint chutney",
  },
  {
    id: BigInt(6),
    name: "Veg Burger",
    category: "Burger",
    price: BigInt(50),
    ingredients: "Bun, veg patty, lettuce, tomato, sauces",
  },
  {
    id: BigInt(7),
    name: "Cheese Burger",
    category: "Burger",
    price: BigInt(70),
    ingredients: "Bun, veg patty, cheese slice, lettuce, mayo",
  },
  {
    id: BigInt(8),
    name: "Paneer Burger",
    category: "Burger",
    price: BigInt(80),
    ingredients: "Bun, paneer patty, veggies, special sauce",
  },
  {
    id: BigInt(9),
    name: "Veg Chaumin",
    category: "Chaumin",
    price: BigInt(60),
    ingredients: "Noodles, mixed veggies, soy sauce, spices",
  },
  {
    id: BigInt(10),
    name: "Paneer Chaumin",
    category: "Chaumin",
    price: BigInt(80),
    ingredients: "Noodles, paneer, veggies, desi twist",
  },
  {
    id: BigInt(11),
    name: "Hakka Noodles",
    category: "Chaumin",
    price: BigInt(70),
    ingredients: "Hakka noodles, veggies, sauces, spices",
  },
  {
    id: BigInt(12),
    name: "Steamed Momos",
    category: "Momos",
    price: BigInt(60),
    ingredients: "Flour, veg/paneer filling, dipping sauce",
  },
  {
    id: BigInt(13),
    name: "Fried Momos",
    category: "Momos",
    price: BigInt(70),
    ingredients: "Crispy fried dumplings, spicy sauce",
  },
  {
    id: BigInt(14),
    name: "Paneer Fried Momos",
    category: "Momos",
    price: BigInt(80),
    ingredients: "Fried momos with paneer stuffing",
  },
  {
    id: BigInt(15),
    name: "Tandoori Momos",
    category: "Momos",
    price: BigInt(90),
    ingredients: "Chargrilled momos, tandoori spices, chutney",
  },
  {
    id: BigInt(16),
    name: "Cold Coffee",
    category: "Drinks",
    price: BigInt(50),
    ingredients: "Coffee, milk, ice, sugar",
  },
  {
    id: BigInt(17),
    name: "Mango Juice",
    category: "Drinks",
    price: BigInt(40),
    ingredients: "Fresh mango pulp, chilled",
  },
  {
    id: BigInt(18),
    name: "Lemon Soda",
    category: "Drinks",
    price: BigInt(30),
    ingredients: "Fresh lime, soda water, salt/sugar",
  },
  {
    id: BigInt(19),
    name: "Lassi",
    category: "Drinks",
    price: BigInt(40),
    ingredients: "Yogurt, sugar, cardamom, chilled",
  },
] as MenuItem[];

const CURRENT_YEAR = new Date().getFullYear();

type Page = "home" | "menu" | "order" | "messages" | "admin";

const HERO_IMAGES = [
  {
    src: "/assets/uploads/slide-5-1.jpg",
    alt: "Create Your Swaad Wallah Masterpiece",
  },
  {
    src: "/assets/uploads/slide-3-4-2.jpg",
    alt: "Elevate Your Sandwich Game",
  },
  {
    src: "/assets/uploads/slide-5-1-3.jpg",
    alt: "Take the First Step to a Healthier You",
  },
  {
    src: "/assets/uploads/Gemini_Generated_Image_ki7wxhki7wxhki7w-2-4.png",
    alt: "Swaad Wallah Sandwich – Owner Portrait",
  },
  {
    src: "/assets/uploads/20260224_022003-2-5.jpg",
    alt: "Swaad Wallah Sandwich – Business Banner",
  },
  {
    src: "/assets/uploads/slide-4-1.jpg",
    alt: "Savor Every Bite – Swaad Wallah",
  },
  {
    src: "/assets/uploads/slide-2-2-2.jpg",
    alt: "Swaad Wallah Sandwich Magic",
  },
  {
    src: "/assets/uploads/20260224_022003-5.jpg",
    alt: "Swaad Wallah Sandwich – Banner",
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

const MENU_PREVIEW_ITEMS = [
  {
    id: 1,
    emoji: "🥪",
    name: "Sandwich",
    desc: "Crispy, fresh, loaded with veggies & sauces",
  },
  {
    id: 2,
    emoji: "🍔",
    name: "Burger",
    desc: "Juicy patty, fresh bun, loaded with sauces",
  },
  {
    id: 3,
    emoji: "🍜",
    name: "Chaumin",
    desc: "Spicy wok-tossed noodles with desi twist",
  },
  {
    id: 4,
    emoji: "🥟",
    name: "Momos",
    desc: "Steamed & fried dumplings with spicy chutney",
  },
  {
    id: 5,
    emoji: "🥤",
    name: "Drinks",
    desc: "Cold coffee, mango juice, lemon soda & lassi",
  },
];

/* ── Navbar ── */
function Navbar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleHome = (href: string) => {
    setOpen(false);
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigate = (p: Page) => {
    setPage(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || page !== "home"
          ? "bg-charcoal/95 backdrop-blur-md shadow-warm-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex items-center gap-2"
          data-ocid="nav.home_link"
        >
          <span className="text-2xl">🥪</span>
          <span className="font-display text-xl font-bold text-cream leading-tight">
            Swaad Wallah
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            data-ocid="nav.menu_link"
            onClick={() => navigate("menu")}
            className={`font-body font-semibold text-sm uppercase tracking-widest transition-colors duration-200 ${page === "menu" ? "text-saffron" : "text-cream/90 hover:text-saffron"}`}
          >
            Menu
          </button>
          <button
            type="button"
            data-ocid="nav.gallery_link"
            onClick={() => handleHome("#gallery")}
            className="font-body font-semibold text-cream/90 hover:text-saffron transition-colors duration-200 text-sm uppercase tracking-widest"
          >
            Gallery
          </button>
          <button
            type="button"
            data-ocid="nav.order_link"
            onClick={() => navigate("order")}
            className={`font-body font-semibold text-sm uppercase tracking-widest transition-colors duration-200 ${
              page === "order"
                ? "text-saffron"
                : "text-cream/90 hover:text-saffron"
            }`}
          >
            Order Online
          </button>
          <button
            type="button"
            data-ocid="nav.messages_link"
            onClick={() => navigate("messages")}
            className={`font-body font-semibold text-sm uppercase tracking-widest transition-colors duration-200 ${
              page === "messages"
                ? "text-saffron"
                : "text-cream/90 hover:text-saffron"
            }`}
          >
            Messages
          </button>
          <button
            type="button"
            data-ocid="nav.admin_link"
            onClick={() => navigate("admin")}
            className="font-body font-semibold text-cream/40 hover:text-cream/70 transition-colors duration-200 text-xs uppercase tracking-widest"
          >
            Admin
          </button>
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
            <div className="px-4 py-4 flex flex-col gap-3">
              {[
                { label: "Home", action: () => navigate("home") },
                { label: "Menu", action: () => navigate("menu") },
                { label: "Gallery", action: () => handleHome("#gallery") },
                { label: "Order Online 🛒", action: () => navigate("order") },
                { label: "Messages 💬", action: () => navigate("messages") },
                { label: "Admin", action: () => navigate("admin") },
              ].map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={link.action}
                  className="font-body font-semibold text-cream py-2 text-lg border-b border-white/10 last:border-0 text-left"
                >
                  {link.label}
                </button>
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
function HeroCarousel({ onOrderClick }: { onOrderClick: () => void }) {
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
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.2 55 / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

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
          <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm">
            <span className="text-saffron text-sm font-bold uppercase tracking-widest">
              Owner:
            </span>
            <span className="text-white font-bold text-base tracking-wide">
              {OWNER_NAME}
            </span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              data-ocid="hero.order_button"
              onClick={onOrderClick}
              className="px-8 py-3.5 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-all duration-300 shadow-warm hover:shadow-warm-lg flex items-center gap-2"
            >
              <ShoppingCart size={20} /> Order Online
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

/* ── Menu Section (Home Preview) ── */
function MenuSection({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section
      id="menu"
      data-ocid="menu.section"
      className="py-24 bg-charcoal relative overflow-hidden"
    >
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
          {MENU_PREVIEW_ITEMS.map((item, i) => (
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
          className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            data-ocid="menu.order_button"
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-colors shadow-warm"
          >
            <ShoppingCart size={20} />
            Order Online Now
          </button>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
          >
            <Phone size={18} />
            Order by Phone
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

  const gridClasses = [
    "col-span-2 md:col-span-2 row-span-2",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1",
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

/* ── Contact / Footer ── */
function ContactFooter() {
  return (
    <footer id="contact" data-ocid="contact.section">
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

      <div className="bg-charcoal py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥪</span>
              <span className="font-display text-lg font-bold text-cream">
                {BUSINESS_NAME}
              </span>
            </div>
            <p className="font-body text-white/50 text-xs">
              Owner:{" "}
              <span className="text-saffron font-semibold">{OWNER_NAME}</span>
            </p>
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

/* ────────────────────────────────────────────────
   ORDER PAGE
──────────────────────────────────────────────── */
type CartItem = { item: MenuItem; qty: number };

function OrderPage({ onBack }: { onBack: () => void }) {
  const { actor: _actor } = useActor();
  const actor = _actor as AppBackendInterface | null;
  const [menuItems, setMenuItems] = useState<MenuItem[]>(STATIC_MENU);
  const [loading, _setLoading] = useState(false);
  const [error, _setError] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("Cash on Pickup");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<bigint | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor
      .getMenuItems()
      .then((items) => {
        if (items.length > 0) setMenuItems(items);
      })
      .catch(() => {});
  }, [actor]);

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((m) => m.category))),
  ];
  const filtered =
    category === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === category);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing)
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c,
        );
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (id: bigint) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0),
    );
  };

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + Number(c.item.price) * c.qty, 0);

  const handleOrder = async () => {
    if (!customerName.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }
    setSubmitting(true);
    try {
      const orderItems: OrderItem[] = cart.map((c) => ({
        name: c.item.name,
        price: c.item.price,
        qty: BigInt(c.qty),
      }));
      if (!actor) return;
      const id = await actor.placeOrder(
        customerName,
        phone,
        orderItems,
        payment,
      );
      setOrderId(id);
      setCart([]);
      setShowCheckout(false);
      setShowCart(false);
    } catch {
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId !== null) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-warm-lg"
          data-ocid="order.success_state"
        >
          <div className="text-7xl mb-6">🎉</div>
          <h2 className="font-display text-3xl font-bold text-charcoal mb-3">
            Order Placed!
          </h2>
          <p className="font-body text-muted-foreground mb-2">
            Order ID:{" "}
            <span className="font-bold text-charcoal">
              #{orderId.toString()}
            </span>
          </p>
          <p className="font-body text-foreground text-lg mb-6">
            Your order is being prepared! 🍴
          </p>
          <p className="font-body text-muted-foreground text-sm mb-6">
            We will notify you once your order is ready for pickup.
          </p>
          <button
            type="button"
            onClick={() => {
              setOrderId(null);
            }}
            className="px-8 py-3 rounded-full bg-saffron text-white font-bold hover:bg-saffron-dark transition-colors"
          >
            Order More
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-charcoal pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            type="button"
            data-ocid="order.back_button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-3xl font-bold text-cream">
              Order Online
            </h1>
            <p className="font-body text-white/60 text-sm">
              Fresh food, delivered to your doorstep
            </p>
          </div>
          <button
            type="button"
            data-ocid="order.cart_button"
            onClick={() => setShowCart(true)}
            className="ml-auto relative w-12 h-12 rounded-full bg-saffron text-white flex items-center justify-center hover:bg-saffron-dark transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-chili text-white text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {loading ? (
            <div data-ocid="order.loading_state" className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-9 w-24 rounded-full bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            categories.map((cat) => (
              <button
                type="button"
                key={cat}
                data-ocid="order.filter.tab"
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full font-body font-semibold text-sm whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-saffron text-white"
                    : "bg-muted text-muted-foreground hover:bg-saffron/10 hover:text-saffron"
                }`}
              >
                {cat}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div
            data-ocid="order.error_state"
            className="text-center text-destructive py-12"
          >
            {error}
          </div>
        )}
        {loading && !error && (
          <div
            data-ocid="order.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-xs animate-pulse h-40"
              />
            ))}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div
            data-ocid="order.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            No items in this category.
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => {
              const inCart = cart.find((c) => c.item.id === item.id);
              return (
                <motion.div
                  key={item.id.toString()}
                  data-ocid={`order.item.${i + 1}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-border hover:border-saffron/40 hover:shadow-warm transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-saffron/10 text-saffron text-xs font-semibold mb-2">
                        {item.category}
                      </span>
                      <h3 className="font-display text-lg font-bold text-charcoal">
                        {item.name}
                      </h3>
                    </div>
                    <span className="font-body font-bold text-saffron-dark text-lg ml-3">
                      ₹{item.price.toString()}
                    </span>
                  </div>
                  <p className="font-body text-muted-foreground text-sm mb-4 leading-relaxed">
                    {item.ingredients}
                  </p>
                  <div className="flex items-center justify-between">
                    {inCart ? (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full bg-saffron/10 text-saffron font-bold hover:bg-saffron/20 transition-colors"
                        >
                          −
                        </button>
                        <span className="font-bold text-charcoal">
                          {inCart.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 rounded-full bg-saffron text-white font-bold hover:bg-saffron-dark transition-colors"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="px-5 py-2 rounded-full bg-saffron text-white font-semibold text-sm hover:bg-saffron-dark transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating cart button on mobile */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden">
          <button
            type="button"
            onClick={() => setShowCart(true)}
            className="flex items-center gap-3 px-6 py-3 bg-saffron text-white font-bold rounded-full shadow-warm-lg"
          >
            <ShoppingCart size={18} />
            {totalItems} item{totalItems > 1 ? "s" : ""} — ₹{totalPrice}
          </button>
        </div>
      )}

      {/* Cart Sheet */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              data-ocid="order.panel"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Your Cart
                </h2>
                <button
                  type="button"
                  data-ocid="order.close_button"
                  onClick={() => setShowCart(false)}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div
                    data-ocid="order.empty_state"
                    className="text-center py-16 text-muted-foreground"
                  >
                    <ShoppingCart
                      size={48}
                      className="mx-auto mb-4 opacity-30"
                    />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((c, i) => (
                      <div
                        key={c.item.id.toString()}
                        data-ocid={`order.row.${i + 1}`}
                        className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl"
                      >
                        <div className="flex-1">
                          <p className="font-body font-semibold text-charcoal">
                            {c.item.name}
                          </p>
                          <p className="font-body text-muted-foreground text-sm">
                            ₹{c.item.price.toString()} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => removeFromCart(c.item.id)}
                            className="w-7 h-7 rounded-full bg-white border border-border text-charcoal font-bold hover:bg-saffron/10 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-bold">
                            {c.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(c.item)}
                            className="w-7 h-7 rounded-full bg-saffron text-white font-bold hover:bg-saffron-dark transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-saffron-dark w-14 text-right">
                          ₹{(Number(c.item.price) * c.qty).toString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-body font-semibold text-charcoal">
                      Total
                    </span>
                    <span className="font-display text-2xl font-bold text-saffron-dark">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <button
                    type="button"
                    data-ocid="order.primary_button"
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full py-3.5 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              data-ocid="order.dialog"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Checkout
                </h2>
                <button
                  type="button"
                  data-ocid="order.close_button"
                  onClick={() => setShowCheckout(false)}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="font-body font-semibold text-sm text-charcoal mb-1 block"
                  >
                    Your Name *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    data-ocid="order.input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="font-body font-semibold text-sm text-charcoal mb-1 block"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    data-ocid="order.input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-charcoal mb-2">
                    Payment Method
                  </p>
                  <div className="flex gap-3">
                    {["Cash on Pickup", "Online Payment"].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        data-ocid="order.radio"
                        onClick={() => setPayment(opt)}
                        className={`flex-1 py-3 rounded-xl border-2 font-body font-semibold text-sm transition-colors ${
                          payment === opt
                            ? "border-saffron bg-saffron/10 text-saffron"
                            : "border-border text-muted-foreground hover:border-saffron/40"
                        }`}
                      >
                        {opt === "Cash on Pickup" ? "💵 " : "📱 "}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {payment === "Online Payment" && (
                  <div className="bg-saffron/10 border border-saffron/30 rounded-xl p-4">
                    <p className="font-body font-semibold text-saffron-dark text-sm">
                      📱 Pay via PhonePe / GPay
                    </p>
                    <p className="font-body text-charcoal font-bold text-lg mt-1">
                      {PHONE}
                    </p>
                    <p className="font-body text-muted-foreground text-xs mt-1">
                      Send payment screenshot to us on WhatsApp after ordering.
                    </p>
                  </div>
                )}

                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="font-body font-semibold text-charcoal text-sm mb-2">
                    Order Summary
                  </p>
                  {cart.map((c) => (
                    <div
                      key={c.item.id.toString()}
                      className="flex justify-between text-sm font-body"
                    >
                      <span className="text-muted-foreground">
                        {c.item.name} × {c.qty}
                      </span>
                      <span className="font-semibold">
                        ₹{Number(c.item.price) * c.qty}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-base border-t border-border mt-2 pt-2">
                    <span>Total</span>
                    <span className="text-saffron-dark">₹{totalPrice}</span>
                  </div>
                </div>

                <button
                  type="button"
                  data-ocid="order.submit_button"
                  onClick={handleOrder}
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 size={18} className="animate-spin" />}
                  {submitting ? "Placing Order..." : "Confirm Order 🎉"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────
   MESSAGES PAGE
──────────────────────────────────────────────── */
function MessagesPage({ onBack }: { onBack: () => void }) {
  const { actor: _actor } = useActor();
  const actor = _actor as AppBackendInterface | null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [senderName, setSenderName] = useState(
    () => localStorage.getItem("swaad_name") || "",
  );
  const [nameSet, setNameSet] = useState(
    () => !!localStorage.getItem("swaad_name"),
  );
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    if (!actor) return;
    try {
      const msgs = await actor.getMessages();
      setMessages(msgs);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line
  }, []);

  const handleSetName = () => {
    if (!senderName.trim()) return;
    localStorage.setItem("swaad_name", senderName.trim());
    setNameSet(true);
  };

  const handleSend = async () => {
    if (!text.trim() || !senderName) return;
    setSending(true);
    try {
      if (!actor) return;
      await actor.sendMessage(senderName, text.trim(), false);
      setText("");
      await fetchMessages();
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="bg-charcoal pt-20 pb-5 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            type="button"
            data-ocid="messages.back_button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-cream">
                {BUSINESS_NAME}
              </h1>
              <p className="font-body text-white/60 text-xs">
                Message the owner directly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Name Setup */}
      {!nameSet && (
        <div className="max-w-3xl mx-auto w-full px-4 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-warm text-center">
            <h3 className="font-display text-xl font-bold text-charcoal mb-3">
              What's your name?
            </h3>
            <p className="font-body text-muted-foreground text-sm mb-5">
              Enter your name to start chatting with us.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                data-ocid="messages.input"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSetName()}
                placeholder="Your name"
                className="flex-1 px-4 py-3 rounded-xl border border-border font-body focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <button
                type="button"
                data-ocid="messages.submit_button"
                onClick={handleSetName}
                className="px-6 py-3 rounded-xl bg-saffron text-white font-bold hover:bg-saffron-dark transition-colors"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {nameSet && (
        <>
          <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-5 space-y-3 overflow-y-auto">
            {loading && (
              <div
                data-ocid="messages.loading_state"
                className="flex justify-center py-12"
              >
                <Loader2 className="animate-spin text-saffron" size={32} />
              </div>
            )}
            {!loading && messages.length === 0 && (
              <div
                data-ocid="messages.empty_state"
                className="text-center py-16 text-muted-foreground"
              >
                <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
                <p>No messages yet. Say hello! 👋</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={msg.id.toString()}
                data-ocid={`messages.item.${i + 1}`}
                className={`flex ${
                  msg.isAdmin ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl font-body text-sm ${
                    msg.isAdmin
                      ? "bg-white text-charcoal shadow-xs rounded-tl-sm"
                      : "bg-saffron text-white rounded-tr-sm"
                  }`}
                >
                  {msg.isAdmin && (
                    <p className="text-xs font-bold text-saffron mb-1">
                      🥪 {msg.senderName}
                    </p>
                  )}
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="sticky bottom-0 bg-white border-t border-border">
            <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
              <input
                type="text"
                data-ocid="messages.textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl border border-border font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 bg-muted/30"
              />
              <button
                type="button"
                data-ocid="messages.submit_button"
                onClick={handleSend}
                disabled={sending || !text.trim()}
                className="w-12 h-12 rounded-full bg-saffron text-white flex items-center justify-center hover:bg-saffron-dark transition-colors disabled:opacity-50"
              >
                {sending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   ADMIN PAGE
──────────────────────────────────────────────── */
function AdminPage({ onBack }: { onBack: () => void }) {
  const { actor: _actor } = useActor();
  const actor = _actor as AppBackendInterface | null;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "messages" | "prices">(
    "orders",
  );

  const handleLogin = async () => {
    setLoggingIn(true);
    setLoginError("");
    try {
      if (!actor) {
        setLoginError("Not connected. Please try again.");
        return;
      }
      const ok = await actor.adminLogin(username, password);
      if (ok) {
        setIsLoggedIn(true);
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col">
        <div className="pt-24 px-4">
          <div className="max-w-md mx-auto">
            <button
              type="button"
              data-ocid="admin.back_button"
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} /> Back to Home
            </button>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🔐</div>
                <h1 className="font-display text-3xl font-bold text-cream mb-2">
                  Admin Login
                </h1>
                <p className="font-body text-white/50 text-sm">
                  Access the Swaad Wallah dashboard
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="admin-username"
                    className="font-body font-semibold text-sm text-white/70 mb-1 block"
                  >
                    Username
                  </label>
                  <input
                    id="admin-username"
                    type="text"
                    data-ocid="admin.input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Enter username"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-body placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-password"
                    className="font-body font-semibold text-sm text-white/70 mb-1 block"
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    data-ocid="admin.input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-body placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  />
                </div>
                {loginError && (
                  <p
                    data-ocid="admin.error_state"
                    className="text-red-400 text-sm font-body"
                  >
                    {loginError}
                  </p>
                )}
                <button
                  type="button"
                  data-ocid="admin.submit_button"
                  onClick={handleLogin}
                  disabled={loggingIn}
                  className="w-full py-4 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loggingIn && <Loader2 size={18} className="animate-spin" />}
                  {loggingIn ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin header */}
      <div className="bg-charcoal pt-20 pb-5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="admin.back_button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold text-cream">
                Admin Dashboard
              </h1>
              <p className="font-body text-white/50 text-xs">
                Welcome, {OWNER_NAME}
              </p>
            </div>
          </div>
          <button
            type="button"
            data-ocid="admin.secondary_button"
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-body hover:bg-white/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 py-2">
          {(["orders", "messages", "prices"] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              data-ocid="admin.tab"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-body font-semibold text-sm capitalize transition-colors ${
                activeTab === tab
                  ? "bg-saffron text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab === "orders"
                ? "📦 Orders"
                : tab === "messages"
                  ? "💬 Messages"
                  : "💰 Menu Prices"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "messages" && <AdminMessages />}
        {activeTab === "prices" && <AdminPrices />}
      </div>
    </div>
  );
}

/* Admin sub-components */
function AdminOrders() {
  const { actor: _actor } = useActor();
  const actor = _actor as AppBackendInterface | null;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<bigint | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor
      .getOrders()
      .then((o) => {
        setOrders(o);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [actor]);

  const updateStatus = async (id: bigint, newStatus: string) => {
    setUpdating(id);
    try {
      if (!actor) return;
      await actor.updateOrderStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)),
      );
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdating(null);
    }
  };

  const statusColor = (status: string) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "Ready for Pickup") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-600";
  };

  if (loading)
    return (
      <div
        data-ocid="admin.loading_state"
        className="flex justify-center py-16"
      >
        <Loader2 className="animate-spin text-saffron" size={32} />
      </div>
    );

  if (orders.length === 0)
    return (
      <div data-ocid="admin.empty_state" className="text-center py-16">
        <p className="text-muted-foreground font-body">No orders yet.</p>
      </div>
    );

  return (
    <div className="space-y-4">
      {orders.map((order, i) => (
        <div
          key={order.id.toString()}
          data-ocid={`admin.item.${i + 1}`}
          className="bg-white rounded-2xl p-5 shadow-xs border border-border"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <p className="font-body text-xs text-muted-foreground">
                Order #{order.id.toString()}
              </p>
              <h3 className="font-display text-lg font-bold text-charcoal">
                {order.customerName}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                📞 {order.phone} · 💳 {order.payment}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>

          <div className="bg-muted/40 rounded-xl p-3 mb-4">
            {order.items.map((item) => (
              <div
                key={item.name}
                className="flex justify-between text-sm font-body"
              >
                <span className="text-muted-foreground">
                  {item.name} × {item.qty.toString()}
                </span>
                <span className="font-semibold">
                  ₹{(Number(item.price) * Number(item.qty)).toString()}
                </span>
              </div>
            ))}
            <div className="flex justify-between font-bold border-t border-border mt-2 pt-2">
              <span>Total</span>
              <span className="text-saffron-dark">
                ₹{order.total.toString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {order.status === "Pending" && (
              <button
                type="button"
                data-ocid="admin.primary_button"
                onClick={() => updateStatus(order.id, "Ready for Pickup")}
                disabled={updating === order.id}
                className="px-5 py-2 rounded-full bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors disabled:opacity-60"
              >
                {updating === order.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "✅ Mark Ready"
                )}
              </button>
            )}
            {order.status === "Ready for Pickup" && (
              <button
                type="button"
                data-ocid="admin.secondary_button"
                onClick={() => updateStatus(order.id, "Done")}
                disabled={updating === order.id}
                className="px-5 py-2 rounded-full bg-gray-600 text-white font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                {updating === order.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "✔ Mark Done"
                )}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminMessages() {
  const { actor: _actor } = useActor();
  const actor = _actor as AppBackendInterface | null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    if (!actor) return;
    try {
      const msgs = await actor.getMessages();
      setMessages(msgs);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      if (!actor) return;
      await actor.sendMessage("Owner", text.trim(), true);
      setText("");
      await fetchMessages();
    } catch {
      alert("Failed to send.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-border overflow-hidden">
      <div className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && (
            <div
              data-ocid="admin.loading_state"
              className="flex justify-center py-8"
            >
              <Loader2 className="animate-spin text-saffron" size={24} />
            </div>
          )}
          {!loading && messages.length === 0 && (
            <div data-ocid="admin.empty_state" className="text-center py-12">
              <p className="text-muted-foreground font-body text-sm">
                No messages yet.
              </p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={msg.id.toString()}
              data-ocid={`admin.item.${i + 1}`}
              className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl font-body text-sm ${
                  msg.isAdmin
                    ? "bg-saffron text-white rounded-tr-sm"
                    : "bg-muted text-charcoal rounded-tl-sm"
                }`}
              >
                {!msg.isAdmin && (
                  <p className="text-xs font-bold text-saffron mb-1">
                    {msg.senderName}
                  </p>
                )}
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-border p-3 flex gap-2">
          <input
            type="text"
            data-ocid="admin.textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
            placeholder="Reply as owner..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
          <button
            type="button"
            data-ocid="admin.submit_button"
            onClick={handleSend}
            disabled={sending || !text.trim()}
            className="w-10 h-10 rounded-full bg-saffron text-white flex items-center justify-center hover:bg-saffron-dark transition-colors disabled:opacity-50"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminPrices() {
  const { actor: _actor } = useActor();
  const actor = _actor as AppBackendInterface | null;
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<bigint | null>(null);
  const [saved, setSaved] = useState<bigint | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor
      .getMenuItems()
      .then((menuItems) => {
        setItems(menuItems);
        const p: Record<string, string> = {};
        for (const m of menuItems) {
          p[m.id.toString()] = m.price.toString();
        }
        setPrices(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [actor]);

  const handleSave = async (item: MenuItem) => {
    const newPriceStr = prices[item.id.toString()];
    const newPrice = Number.parseInt(newPriceStr, 10);
    if (Number.isNaN(newPrice) || newPrice < 0) {
      alert("Please enter a valid price.");
      return;
    }
    setSaving(item.id);
    try {
      if (!actor) return;
      await actor.updateMenuItemPrice(item.id, BigInt(newPrice));
      setItems((prev) =>
        prev.map((m) =>
          m.id === item.id ? { ...m, price: BigInt(newPrice) } : m,
        ),
      );
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2000);
    } catch {
      alert("Failed to save price.");
    } finally {
      setSaving(null);
    }
  };

  if (loading)
    return (
      <div
        data-ocid="admin.loading_state"
        className="flex justify-center py-16"
      >
        <Loader2 className="animate-spin text-saffron" size={32} />
      </div>
    );

  return (
    <div className="space-y-3">
      <p className="font-body text-muted-foreground text-sm mb-4">
        Update prices for any menu item. Changes apply immediately.
      </p>
      {items.map((item, i) => (
        <div
          key={item.id.toString()}
          data-ocid={`admin.item.${i + 1}`}
          className="bg-white rounded-xl p-4 shadow-xs border border-border flex flex-wrap items-center gap-3"
        >
          <div className="flex-1 min-w-0">
            <span className="font-body font-semibold text-charcoal">
              {item.name}
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              ({item.category})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-muted-foreground">₹</span>
            <input
              type="number"
              data-ocid="admin.input"
              value={prices[item.id.toString()] ?? ""}
              onChange={(e) =>
                setPrices((prev) => ({
                  ...prev,
                  [item.id.toString()]: e.target.value,
                }))
              }
              className="w-24 px-3 py-2 rounded-xl border border-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <button
              type="button"
              data-ocid="admin.save_button"
              onClick={() => handleSave(item)}
              disabled={saving === item.id}
              className={`px-4 py-2 rounded-xl font-body font-semibold text-sm transition-colors ${
                saved === item.id
                  ? "bg-green-100 text-green-700"
                  : "bg-saffron text-white hover:bg-saffron-dark"
              } disabled:opacity-60`}
            >
              {saving === item.id ? (
                <Loader2 size={14} className="animate-spin" />
              ) : saved === item.id ? (
                "✓ Saved"
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Full Menu Page ── */
function MenuPage({
  onBack: _onBack,
  onOrderClick,
}: { onBack: () => void; onOrderClick: () => void }) {
  const { actor: _actor } = useActor();
  const actor = _actor as AppBackendInterface | null;
  const [menuItems, setMenuItems] = useState<MenuItem[]>(STATIC_MENU);
  const [loading, _setLoading] = useState(false);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!actor) return;
    actor
      .getMenuItems()
      .then((items) => {
        if (items.length > 0) setMenuItems(items);
      })
      .catch(() => {});
  }, [actor]);

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((m) => m.category))),
  ];
  const filtered =
    category === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === category);

  const categoryEmoji: Record<string, string> = {
    Sandwich: "🥪",
    Burger: "🍔",
    Chaumin: "🍜",
    Momos: "🥟",
    Drinks: "🥤",
  };

  return (
    <div data-ocid="menu.page" className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-charcoal py-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.72 0.2 55) 0, oklch(0.72 0.2 55) 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative">
          <span className="inline-block text-saffron text-sm font-bold uppercase tracking-[0.2em] mb-3">
            — Full Menu —
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
            Our Menu & Prices
          </h1>
          <p className="font-body text-white/60 text-lg">
            Fresh ingredients, bold flavours — made with love in Bhopal
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Category Filter */}
        <div
          data-ocid="menu.tab"
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                category === cat
                  ? "bg-saffron text-white shadow-warm"
                  : "bg-white border border-border text-charcoal hover:border-saffron/50 hover:text-saffron"
              }`}
            >
              {cat === "All"
                ? "🍽️ All Items"
                : `${categoryEmoji[cat] ?? ""} ${cat}`}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div
            data-ocid="menu.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-xs animate-pulse h-36 border border-border"
              />
            ))}
          </div>
        )}

        {/* Menu Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id.toString()}
                data-ocid={`menu.item.${i + 1}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white rounded-2xl p-5 shadow-xs border border-border hover:border-saffron/40 hover:shadow-warm transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-saffron/10 text-saffron text-xs font-semibold mb-2">
                      {categoryEmoji[item.category] ?? ""} {item.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-charcoal">
                      {item.name}
                    </h3>
                  </div>
                  <span className="font-body font-bold text-saffron-dark text-xl ml-3">
                    ₹{item.price.toString()}
                  </span>
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {item.ingredients}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Order CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            data-ocid="menu.order_button"
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-saffron text-white font-bold text-lg hover:bg-saffron-dark transition-colors shadow-warm"
          >
            <ShoppingCart size={20} />
            Place Order Online
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── App ── */
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const goHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroCarousel onOrderClick={() => setPage("order")} />
            <InfoSection />
            <MenuSection onOrderClick={() => setPage("order")} />
            <GallerySection />
            <ContactFooter />
          </motion.main>
        )}
        {page === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <MenuPage onBack={goHome} onOrderClick={() => setPage("order")} />
          </motion.div>
        )}
        {page === "order" && (
          <motion.div
            key="order"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <OrderPage onBack={goHome} />
          </motion.div>
        )}
        {page === "messages" && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <MessagesPage onBack={goHome} />
          </motion.div>
        )}
        {page === "admin" && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <AdminPage onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
