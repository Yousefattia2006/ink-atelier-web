import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProduct, setActiveProduct] = useState(0);
  const { content } = useAdmin();

  const products = content.pricing;
  const current = products[activeProduct];
  if (!current) return null;
  const quantities = Object.keys(current.sizes[0].prices);

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.25em] text-primary mb-4">Transparent Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Sizes & <span className="text-gradient-gold">Pricing</span>
          </h2>
        </motion.div>

        <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap justify-start sm:justify-center gap-2 mb-8 sm:mb-12 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
          {products.map((product, i) => (
            <button
              key={product.name}
              onClick={() => setActiveProduct(i)}
              className={`font-body text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                i === activeProduct
                  ? "bg-gradient-gold text-primary-foreground font-semibold"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>

        <motion.div
          key={activeProduct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-border overflow-hidden bg-card overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-body font-semibold text-xs sm:text-sm text-muted-foreground px-3 sm:px-6 py-3 sm:py-4">Size</th>
                  {quantities.map((q) => (
                    <th key={q} className="text-center font-body font-semibold text-xs sm:text-sm text-muted-foreground px-2 sm:px-4 py-3 sm:py-4">
                      {q} {Number(q) > 10 ? "copies" : "units"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.sizes.map((row, i) => (
                  <tr key={row.size} className={i < current.sizes.length - 1 ? "border-b border-border" : ""}>
                    <td className="font-body text-xs sm:text-sm font-medium text-foreground px-3 sm:px-6 py-3 sm:py-4">{row.size}</td>
                    {quantities.map((q) => (
                      <td key={q} className="text-center font-body text-xs sm:text-sm text-primary px-2 sm:px-4 py-3 sm:py-4 font-semibold">
                        {row.prices[q as keyof typeof row.prices]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs text-muted-foreground text-center mt-6">
            All prices include design review. Final price confirmed after artwork check.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
