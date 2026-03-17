import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useShouldReduceMotion } from "../hooks/useReducedMotion";

export default function ContactSection() {
  const reduceMotion = useShouldReduceMotion();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", phone: "", message: "" });
    setSubmitting(false);
  };

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Indrapuri+Sector+C,+Bhopal,+Madhya+Pradesh";

  return (
    <section id="contact" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-primary font-bold text-base uppercase tracking-widest mb-3">
            🕉️ संपर्क करें · Get In Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-foreground mb-5">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Have a question or want to place a bulk order? We'd love to hear
            from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-start">
          {/* ── LEFT: Contact info cards ── */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-5"
          >
            {/* ─ PHONE – Big CTA ─ */}
            <a
              href="tel:+919303526637"
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-7 rounded-3xl cursor-pointer no-underline block hover:opacity-90 active:scale-95 transition-all"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.24 48), oklch(0.55 0.26 35))",
                boxShadow: "0 8px 32px oklch(0.62 0.24 48 / 0.45)",
              }}
              data-ocid="contact.phone.link"
            >
              <div
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                <Phone className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="text-orange-100 font-bold text-sm sm:text-base uppercase tracking-widest mb-1">
                  📞 Call Now
                </div>
                <div className="text-white font-display text-xl sm:text-3xl font-bold leading-tight break-words">
                  +91 93035 26637
                </div>
                <div className="text-orange-200 text-sm mt-1.5 font-medium">
                  Tap to call instantly →
                </div>
              </div>
            </a>

            {/* ─ INSTAGRAM – Gradient card ─ */}
            <a
              href="https://www.instagram.com/swaad_wallah_sandwich"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-3xl cursor-pointer no-underline block hover:opacity-90 active:scale-95 transition-all"
              style={{
                background:
                  "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                boxShadow: "0 8px 32px rgba(253,29,29,0.35)",
              }}
              data-ocid="contact.instagram.link"
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                <Instagram className="w-6 h-6 sm:w-9 sm:h-9 text-white" />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden break-words">
                <div className="text-pink-100 font-bold text-xs sm:text-sm uppercase tracking-widest mb-1">
                  ✨ Follow on Instagram
                </div>
                <div className="text-white font-display text-base sm:text-2xl font-bold break-all">
                  @swaad_wallah_sandwich
                </div>
                <div className="text-pink-200 text-sm mt-1 font-medium">
                  Tap to open Instagram →
                </div>
              </div>
            </a>

            {/* ─ ADDRESS – Opens Google Maps ─ */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-3xl cursor-pointer no-underline block border-2 hover:opacity-90 active:scale-95 transition-all"
              style={{
                background: "oklch(0.96 0.06 70)",
                borderColor: "oklch(0.70 0.22 50)",
                boxShadow: "0 4px 20px oklch(0.70 0.22 50 / 0.2)",
              }}
              data-ocid="contact.map_marker"
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.65 0.22 48)" }}
              >
                <Navigation className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div
                  className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.55 0.20 48)" }}
                >
                  📍 Our Location
                </div>
                <div
                  className="font-display text-lg sm:text-xl font-bold leading-snug"
                  style={{ color: "oklch(0.22 0.05 45)" }}
                >
                  Indrapuri Sector C
                </div>
                <div
                  className="text-sm sm:text-base font-medium"
                  style={{ color: "oklch(0.38 0.08 50)" }}
                >
                  Bhopal, Madhya Pradesh
                </div>
                <div
                  className="text-sm mt-1.5 font-semibold flex items-center gap-1"
                  style={{ color: "oklch(0.60 0.22 48)" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps
                </div>
              </div>
            </a>

            {/* ─ HOURS ─ */}
            <div
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-3xl border-2"
              style={{
                background: "oklch(0.97 0.04 75)",
                borderColor: "oklch(0.75 0.18 80)",
              }}
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.70 0.18 80)" }}
              >
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0 overflow-hidden">
                <div
                  className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.55 0.14 80)" }}
                >
                  🕐 Opening Hours
                </div>
                <div
                  className="font-display text-xl sm:text-2xl font-bold"
                  style={{ color: "oklch(0.22 0.05 45)" }}
                >
                  11 AM – 11 PM
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.45 0.08 55)" }}
                >
                  Open Daily · Every Day
                </div>
              </div>
            </div>

            {/* ─ OWNER ─ */}
            <div
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-3xl border-2"
              style={{
                background: "oklch(0.97 0.04 65)",
                borderColor: "oklch(0.78 0.16 60)",
              }}
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.65 0.22 48)" }}
              >
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0 overflow-hidden">
                <div
                  className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.55 0.20 48)" }}
                >
                  👨‍🍳 Owner
                </div>
                <div
                  className="font-display text-xl sm:text-2xl font-bold"
                  style={{ color: "oklch(0.22 0.05 45)" }}
                >
                  Kunal Nagar
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.45 0.08 55)" }}
                >
                  Swaad Wallah Sandwich, Bhopal
                </div>
              </div>
            </div>

            {/* ─ MAP embed clickable ─ */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-3xl overflow-hidden border-4 cursor-pointer hover:opacity-95 transition-opacity"
              style={{
                borderColor: "oklch(0.65 0.22 48)",
                boxShadow: "0 8px 28px oklch(0.65 0.22 48 / 0.3)",
              }}
              data-ocid="contact.map_marker"
            >
              <div className="relative">
                <iframe
                  title="Swaad Wallah Sandwich Location"
                  src="https://maps.google.com/maps?q=Indrapuri+Sector+C,+Bhopal,+Madhya+Pradesh&z=15&output=embed"
                  width="100%"
                  height="260"
                  className="w-full"
                  style={{ border: 0, display: "block", pointerEvents: "none" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Overlay to make whole area clickable */}
                <div
                  className="absolute inset-0 flex items-end justify-center pb-4"
                  style={{ background: "transparent" }}
                >
                  <div
                    className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-white text-sm shadow-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.24 48), oklch(0.55 0.26 35))",
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Tap to Open Google Maps
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* ── RIGHT: Contact form ── */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-5 sm:p-8 space-y-6 border-2"
              style={{
                background: "oklch(0.97 0.04 68)",
                borderColor: "oklch(0.75 0.18 55)",
                boxShadow: "0 8px 40px oklch(0.65 0.22 48 / 0.18)",
              }}
              data-ocid="contact.panel"
            >
              <div className="mb-2">
                <h3
                  className="font-display text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: "oklch(0.22 0.05 45)" }}
                >
                  Send a Message
                </h3>
                <p
                  style={{ color: "oklch(0.45 0.08 55)" }}
                  className="text-base"
                >
                  We reply within a few hours!
                </p>
              </div>

              <div>
                <Label
                  htmlFor="contact-name"
                  className="font-semibold text-base mb-2 block"
                  style={{ color: "oklch(0.28 0.06 48)" }}
                >
                  Your Name
                </Label>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="h-14 text-base rounded-xl border-2"
                  style={{
                    borderColor: "oklch(0.78 0.16 60)",
                    background: "oklch(0.99 0.02 70)",
                  }}
                  data-ocid="contact.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="contact-phone"
                  className="font-semibold text-base mb-2 block"
                  style={{ color: "oklch(0.28 0.06 48)" }}
                >
                  Phone Number
                </Label>
                <Input
                  id="contact-phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  className="h-14 text-base rounded-xl border-2"
                  style={{
                    borderColor: "oklch(0.78 0.16 60)",
                    background: "oklch(0.99 0.02 70)",
                  }}
                  data-ocid="contact.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="contact-message"
                  className="font-semibold text-base mb-2 block"
                  style={{ color: "oklch(0.28 0.06 48)" }}
                >
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  placeholder="I'd like to place a bulk order..."
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  className="text-base rounded-xl border-2 resize-none"
                  style={{
                    borderColor: "oklch(0.78 0.16 60)",
                    background: "oklch(0.99 0.02 70)",
                  }}
                  data-ocid="contact.textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-16 text-lg font-bold rounded-2xl text-white transition-all"
                style={{
                  background: submitting
                    ? "oklch(0.75 0.12 48)"
                    : "linear-gradient(135deg, oklch(0.62 0.24 48), oklch(0.55 0.26 35))",
                  boxShadow: submitting
                    ? "none"
                    : "0 6px 24px oklch(0.62 0.24 48 / 0.45)",
                }}
                data-ocid="contact.submit_button"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Send className="w-5 h-5" /> Send Message
                  </span>
                )}
              </Button>

              {/* Quick contact strip */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="tel:+919303526637"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base no-underline hover:opacity-90 active:scale-95 transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.24 48), oklch(0.55 0.26 35))",
                  }}
                  data-ocid="contact.phone.link"
                >
                  <Phone className="w-5 h-5" /> Call Us
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base no-underline hover:opacity-90 active:scale-95 transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.16 145), oklch(0.45 0.18 155))",
                  }}
                  data-ocid="contact.map_marker"
                >
                  <MapPin className="w-5 h-5" /> Directions
                </a>
              </div>

              {/* Mail */}
              <div
                className="flex items-center gap-3 p-4 rounded-2xl border"
                style={{
                  borderColor: "oklch(0.82 0.12 65)",
                  background: "oklch(0.96 0.03 70)",
                }}
              >
                <Mail
                  className="w-6 h-6 flex-shrink-0"
                  style={{ color: "oklch(0.60 0.20 48)" }}
                />
                <span
                  className="text-sm sm:text-base font-medium break-all"
                  style={{ color: "oklch(0.35 0.08 48)" }}
                >
                  swaadwallahbhopal@gmail.com
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
