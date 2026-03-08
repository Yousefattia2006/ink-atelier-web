import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Award, MapPin, Palette } from "lucide-react";

const values = [
  { icon: Zap, title: "Fast Turnaround", description: "Rush orders welcome. Most jobs completed within 24–48 hours." },
  { icon: Award, title: "Premium Quality", description: "Top-grade materials and state-of-the-art printing technology." },
  { icon: MapPin, title: "Nationwide Delivery", description: "We deliver across all of Egypt — Cairo to Aswan and everywhere in between." },
  { icon: Palette, title: "Expert Design Support", description: "Our in-house designers can refine or create your artwork from scratch." },
];

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.25em] text-primary mb-4">The Crooque Difference</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Why Choose <span className="text-gradient-gold">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-card border border-border rounded-xl p-8 hover:border-gold hover:shadow-gold transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{value.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
