import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const products = [
  {
    name: "Flyers",
    sizes: [
      { size: "A5", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
      { size: "A4", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
      { size: "A3", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
    ],
  },
  {
    name: "Business Cards",
    sizes: [
      { size: "Standard (9×5cm)", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
      { size: "Premium (Thick Stock)", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
    ],
  },
  {
    name: "Posters",
    sizes: [
      { size: "A3", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
      { size: "A2", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
      { size: "A1", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
    ],
  },
  {
    name: "Banners & Roll-ups",
    sizes: [
      { size: "Roll-up (85×200cm)", prices: { "1": "[PRICE]", "5": "[PRICE]", "10": "[PRICE]" } },
      { size: "Vinyl Banner (Custom)", prices: { "1": "[PRICE]", "5": "[PRICE]", "10": "[PRICE]" } },
    ],
  },
  {
    name: "Stickers & Labels",
    sizes: [
      { size: "Sheet Stickers (A4)", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
      { size: "Die-Cut (Custom)", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
    ],
  },
  {
    name: "Brochures",
    sizes: [
      { size: "Bi-fold A4", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
      { size: "Tri-fold A4", prices: { "100": "[PRICE]", "500": "[PRICE]", "1000": "[PRICE]" } },
    ],
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProduct, setActiveProduct] = useState(0);

  const current = products[activeProduct];
  const quantities = Object.keys(current.sizes[0].prices);

  return (
    <section id="pricing" className="py-24 lg:py-32">
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

        {/* Product Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {products.map((product, i) => (
            <button
              key={product.name}
              onClick={() => setActiveProduct(i)}
              className={`font-body text-sm px-5 py-2.5 rounded-full transition-all duration-300 ${
                i === activeProduct
                  ? "bg-gradient-gold text-primary-foreground font-semibold"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>

        {/* Pricing Table */}
        <motion.div
          key={activeProduct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-body font-semibold text-sm text-muted-foreground px-6 py-4">Size</th>
                  {quantities.map((q) => (
                    <th key={q} className="text-center font-body font-semibold text-sm text-muted-foreground px-4 py-4">
                      {q} {Number(q) > 10 ? "copies" : "units"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.sizes.map((row, i) => (
                  <tr key={row.size} className={i < current.sizes.length - 1 ? "border-b border-border" : ""}>
                    <td className="font-body text-sm font-medium text-foreground px-6 py-4">{row.size}</td>
                    {quantities.map((q) => (
                      <td key={q} className="text-center font-body text-sm text-primary px-4 py-4 font-semibold">
                        {row.prices[q as keyof typeof row.prices]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs text-muted-foreground text-center mt-6 text-text-dim">
            All prices include design review. Final price confirmed after artwork check.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
