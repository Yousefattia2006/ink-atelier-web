import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const { content } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-sm uppercase tracking-[0.25em] text-primary mb-4">Let's Work Together</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-gradient-gold">Print?</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-md">
                Tell us about your project and we'll get back to you with a quote within hours.
                Or reach out directly on WhatsApp for instant support.
              </p>
              <a
                href={`https://wa.me/${content.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-primary-foreground px-6 py-3.5 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5"
            >
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+20 1XX XXX XXXX"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Product Needed</label>
                <select
                  required
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a product</option>
                  <option>Flyers</option>
                  <option>Banners & Roll-ups</option>
                  <option>Business Cards</option>
                  <option>Posters</option>
                  <option>Stickers & Labels</option>
                  <option>Brochures & Catalogues</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Quantity</label>
                <input
                  type="text"
                  placeholder="e.g. 500 copies"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-gold text-primary-foreground py-4 rounded-full font-body font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {submitted ? "Sent! We'll be in touch ✓" : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Enquiry
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
