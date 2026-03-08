import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Ruler, Truck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Design",
    description: "Send us your artwork or tell us your idea — our team will handle the rest.",
  },
  {
    icon: Ruler,
    number: "02",
    title: "Choose Size & Quantity",
    description: "Pick from our range of sizes and quantities. Custom options always available.",
  },
  {
    icon: Truck,
    number: "03",
    title: "We Print & Deliver",
    description: "Premium quality printing with fast turnaround, delivered straight to your door.",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.25em] text-primary mb-4">Simple Process</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6 group-hover:shadow-gold transition-shadow duration-500">
                  <StepIcon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center font-body text-xs font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
