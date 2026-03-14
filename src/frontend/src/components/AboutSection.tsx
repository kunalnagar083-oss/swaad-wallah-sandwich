import {
  Crown,
  Leaf,
  MapPin,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Customers Daily" },
  { icon: UtensilsCrossed, value: "28+", label: "Menu Items" },
  { icon: Leaf, value: "Fresh", label: "Ingredients Daily" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.88 0.10 55) 0%, oklch(0.92 0.08 65) 40%, oklch(0.85 0.12 42) 100%)",
      }}
    >
      {/* Decorative mandala/pattern background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.50 0.22 48) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.55 0.20 30) 0%, transparent 40%), radial-gradient(circle at 60% 80%, oklch(0.60 0.18 55) 0%, transparent 40%)",
        }}
      />
      {/* Spice dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.30 0.15 48) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top banner badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.60 0.22 48), oklch(0.55 0.20 35))",
              color: "white",
              boxShadow: "0 4px 24px oklch(0.60 0.22 48 / 0.45)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Our Story</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-display text-5xl sm:text-6xl font-800 mb-6 leading-tight"
              style={{ color: "oklch(0.22 0.06 45)" }}
            >
              The{" "}
              <span
                style={{ color: "oklch(0.58 0.22 48)", fontStyle: "italic" }}
              >
                Swaad
              </span>{" "}
              Behind
              <br />
              <span style={{ color: "oklch(0.45 0.18 40)" }}>Every Bite</span> 🌶️
            </h2>

            <p
              className="leading-relaxed text-base mb-4"
              style={{ color: "oklch(0.35 0.05 50)" }}
            >
              Born from a passion for authentic street food, Swaad Wallah
              Sandwich has been Bhopal's beloved destination for fresh,
              flavourful sandwiches and snacks. Every recipe carries the warmth
              of home and the boldness of Indian spices.
            </p>
            <p
              className="leading-relaxed text-base mb-6"
              style={{ color: "oklch(0.35 0.05 50)" }}
            >
              From our signature grilled sandwiches to spicy paneer burgers and
              refreshing beverages, each bite is crafted with love and the
              authentic flavours of Bhopal.
            </p>

            {/* Founder Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <div
                className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.99 0.02 75), oklch(0.96 0.06 68))",
                  border: "2px solid oklch(0.80 0.12 55)",
                  boxShadow: "0 6px 30px oklch(0.60 0.22 48 / 0.25)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.22 48), oklch(0.55 0.20 35))",
                  }}
                >
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "oklch(0.60 0.22 48)" }}
                  >
                    Founder & Owner
                  </div>
                  <div
                    className="font-display text-lg font-800"
                    style={{ color: "oklch(0.22 0.06 45)" }}
                  >
                    Kunal Nagar
                  </div>
                </div>
                <div className="ml-2 text-2xl">🙏</div>
              </div>
            </motion.div>

            <div
              className="flex items-center gap-2 text-sm mb-8 px-4 py-2.5 rounded-xl w-fit"
              style={{
                background: "oklch(0.99 0.02 75 / 0.7)",
                border: "1px solid oklch(0.80 0.12 55)",
                color: "oklch(0.40 0.08 50)",
              }}
            >
              <MapPin
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "oklch(0.60 0.22 48)" }}
              />
              <span>
                Indrapuri Sector C, Bhopal &nbsp;·&nbsp; Open 11 AM – 11 PM
                daily
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="text-center p-4 rounded-2xl shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.22 48), oklch(0.55 0.20 35))",
                    boxShadow: "0 4px 16px oklch(0.60 0.22 48 / 0.35)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: "oklch(0.99 0.02 75 / 0.25)" }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-display font-800 text-xl text-white">
                    {value}
                  </div>
                  <div
                    className="text-xs leading-tight mt-0.5"
                    style={{ color: "oklch(0.97 0.02 75 / 0.80)" }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Decorative ring */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.22 48), oklch(0.55 0.20 30), transparent)",
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 20px 60px oklch(0.50 0.18 45 / 0.45)" }}
            >
              <img
                src="/assets/generated/sandwich1.dim_400x300.jpg"
                alt="Fresh Swaad Wallah Sandwich"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Spice accent label */}
              <div
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.60 0.22 48), oklch(0.55 0.20 30))",
                }}
              >
                🌶️ Desi Swaad
              </div>
            </div>
            {/* Floating card */}
            <div
              className="absolute -bottom-6 -left-6 rounded-2xl p-4 flex items-center gap-3 shadow-xl"
              style={{
                background: "oklch(0.99 0.02 75)",
                border: "2px solid oklch(0.80 0.12 55)",
                boxShadow: "0 8px 30px oklch(0.60 0.22 48 / 0.30)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.42 0.14 145), oklch(0.38 0.12 150))",
                }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="font-display font-700 text-sm"
                  style={{ color: "oklch(0.22 0.06 45)" }}
                >
                  100% Fresh
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.48 0.06 55)" }}
                >
                  Made daily with love
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
