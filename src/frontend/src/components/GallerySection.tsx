import { motion } from "motion/react";

const galleryImages = [
  {
    src: "/assets/generated/sandwich1.dim_400x300.jpg",
    alt: "Mumbai-style sandwich",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/assets/generated/burger1.dim_400x300.jpg",
    alt: "Indian spiced burger",
  },
  {
    src: "/assets/generated/beverage1.dim_400x300.jpg",
    alt: "Indian beverages",
  },
  {
    src: "/assets/generated/snack1.dim_400x300.jpg",
    alt: "Indian street snacks",
    className: "col-span-2",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Visual Feast
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-800 text-foreground mb-4">
            Our Delicious Food
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A glimpse of the flavors waiting for you at Swaad Wallah
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.className ?? ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
