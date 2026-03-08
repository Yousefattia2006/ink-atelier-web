import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import flyersImg from "@/assets/product-flyers.jpg";
import bannersImg from "@/assets/product-banners.jpg";
import cardsImg from "@/assets/product-cards.jpg";
import postersImg from "@/assets/product-posters.jpg";
import stickersImg from "@/assets/product-stickers.jpg";
import brochuresImg from "@/assets/product-brochures.jpg";

const images = [flyersImg, bannersImg, cardsImg, postersImg, stickersImg, brochuresImg];

const ProductCard = ({ product, index, image }: { product: { title: string; subtitle: string }; index: number; image: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">
          {product.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground">{product.subtitle}</p>
      </div>
      <div className="absolute inset-0 border border-transparent group-hover:border-gold rounded-lg transition-all duration-500" />
    </motion.div>
  );
};

const ProductsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useAdmin();

  return (
    <section id="products" className="py-16 sm:py-24 lg:py-32 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.25em] text-primary mb-4">Our Products</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            What We <span className="text-gradient-gold">Print</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.products.map((product, i) => (
            <ProductCard key={i} product={product} index={i} image={images[i] || images[0]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
