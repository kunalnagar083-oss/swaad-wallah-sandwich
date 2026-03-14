import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useState } from "react";
import type { MenuItem } from "../backend.d";
import { useGetAvailableMenuItems } from "../hooks/useQueries";

const CATEGORIES = ["All", "Sandwich", "Burger", "Beverage", "Snack"];

const categoryImages: Record<string, string> = {
  Sandwich: "/assets/generated/sandwich1.dim_400x300.jpg",
  Burger: "/assets/generated/burger1.dim_400x300.jpg",
  Beverage: "/assets/generated/beverage1.dim_400x300.jpg",
  Snack: "/assets/generated/snack1.dim_400x300.jpg",
};

const categoryColors: Record<string, string> = {
  Sandwich: "bg-primary/10 text-primary border-primary/20",
  Burger: "bg-accent/10 text-accent border-accent/20",
  Beverage: "bg-secondary/10 text-secondary border-secondary/20",
  Snack: "bg-muted text-muted-foreground border-muted",
};

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const imgSrc =
    categoryImages[item.category] ??
    "/assets/generated/sandwich1.dim_400x300.jpg";
  const colorClass =
    categoryColors[item.category] ??
    "bg-muted text-muted-foreground border-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-shadow duration-300 group"
      data-ocid={`menu.item.${index + 1}`}
    >
      <div className="relative overflow-hidden h-40">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <Badge
          className={`absolute top-3 left-3 text-xs font-semibold border ${colorClass}`}
        >
          {item.category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-display font-700 text-sm text-foreground mb-1 leading-snug">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display font-800 text-lg text-primary">
            ₹{item.price.toString()}
          </span>
          {!item.isAvailable && (
            <span className="text-xs text-destructive font-medium">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

function MenuSkeleton() {
  return (
    <div
      className="bg-card rounded-2xl overflow-hidden shadow-card"
      data-ocid="menu.loading_state"
    >
      <Skeleton className="h-40 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: menuItems, isLoading } = useGetAvailableMenuItems();

  const filtered = menuItems
    ? activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)
    : [];

  return (
    <section id="menu" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Our Offerings
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-800 text-foreground mb-4">
            Explore the Menu
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            28+ items made fresh every day — sandwiches, burgers, snacks &
            beverages
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-warm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
              }`}
              data-ocid="menu.filter.tab"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {SKELETON_KEYS.map((k) => (
              <MenuSkeleton key={k} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16" data-ocid="menu.empty_state">
            <p className="text-muted-foreground text-lg">
              No items in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((item, i) => (
              <MenuCard key={item.id.toString()} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
