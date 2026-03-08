import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin, SiteContent } from "@/contexts/AdminContext";
import { LogOut, Save, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

const Section = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 font-display text-base sm:text-lg font-bold text-foreground"
      >
        {title}
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 sm:px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
};

const Field = ({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) => (
  <div>
    <label className="font-body text-xs text-muted-foreground mb-1 block">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-primary transition-colors resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-primary transition-colors"
      />
    )}
  </div>
);

const AdminDashboard = () => {
  const { isAdmin, logout, content, updateContent } = useAdmin();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAdmin) navigate("/admin-login");
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const handleSave = () => {
    updateContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateHero = (key: keyof SiteContent["hero"], value: string) => {
    setDraft({ ...draft, hero: { ...draft.hero, [key]: value } });
  };

  const updateProduct = (index: number, key: "title" | "subtitle", value: string) => {
    const products = [...draft.products];
    products[index] = { ...products[index], [key]: value };
    setDraft({ ...draft, products });
  };

  const updatePrice = (productIdx: number, sizeIdx: number, qtyKey: string, value: string) => {
    const pricing = JSON.parse(JSON.stringify(draft.pricing));
    pricing[productIdx].sizes[sizeIdx].prices[qtyKey] = value;
    setDraft({ ...draft, pricing });
  };

  const updateProcess = (index: number, key: "title" | "description", value: string) => {
    const process = [...draft.process];
    process[index] = { ...process[index], [key]: value };
    setDraft({ ...draft, process });
  };

  const updateValue = (index: number, key: "title" | "description", value: string) => {
    const values = [...draft.values];
    values[index] = { ...values[index], [key]: value };
    setDraft({ ...draft, values });
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-display text-lg font-bold">
              Crooque<span className="text-primary">.</span> Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground px-3 sm:px-4 py-2 rounded-full font-body font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
            >
              <Save className="w-3.5 h-3.5" />
              {saved ? "Saved ✓" : "Save"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-border text-muted-foreground px-3 py-2 rounded-full font-body text-xs sm:text-sm hover:text-foreground transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Hero */}
        <Section title="Hero Section" defaultOpen>
          <Field label="Tagline" value={draft.hero.tagline} onChange={(v) => updateHero("tagline", v)} />
          <Field label="Headline Line 1" value={draft.hero.headline1} onChange={(v) => updateHero("headline1", v)} />
          <Field label="Headline Line 2 (Gold)" value={draft.hero.headline2} onChange={(v) => updateHero("headline2", v)} />
          <Field label="Description" value={draft.hero.description} onChange={(v) => updateHero("description", v)} multiline />
        </Section>

        {/* Products */}
        <Section title="Products">
          {draft.products.map((p, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label={`Product ${i + 1} Title`} value={p.title} onChange={(v) => updateProduct(i, "title", v)} />
              <Field label={`Product ${i + 1} Subtitle`} value={p.subtitle} onChange={(v) => updateProduct(i, "subtitle", v)} />
            </div>
          ))}
        </Section>

        {/* Pricing */}
        <Section title="Pricing">
          {draft.pricing.map((product, pi) => (
            <div key={pi} className="space-y-3">
              <h4 className="font-body text-sm font-semibold text-primary">{product.name}</h4>
              {product.sizes.map((size, si) => (
                <div key={si} className="space-y-2">
                  <p className="font-body text-xs text-muted-foreground">{size.size}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(size.prices).map(([qty, price]) => (
                      <Field
                        key={qty}
                        label={`${qty} ${Number(qty) > 10 ? "copies" : "units"}`}
                        value={price}
                        onChange={(v) => updatePrice(pi, si, qty, v)}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {pi < draft.pricing.length - 1 && <div className="border-t border-border pt-3" />}
            </div>
          ))}
        </Section>

        {/* Process */}
        <Section title="How It Works">
          {draft.process.map((step, i) => (
            <div key={i} className="space-y-2">
              <Field label={`Step ${i + 1} Title`} value={step.title} onChange={(v) => updateProcess(i, "title", v)} />
              <Field label={`Step ${i + 1} Description`} value={step.description} onChange={(v) => updateProcess(i, "description", v)} multiline />
            </div>
          ))}
        </Section>

        {/* Values */}
        <Section title="Why Choose Us">
          {draft.values.map((val, i) => (
            <div key={i} className="space-y-2">
              <Field label={`Value ${i + 1} Title`} value={val.title} onChange={(v) => updateValue(i, "title", v)} />
              <Field label={`Value ${i + 1} Description`} value={val.description} onChange={(v) => updateValue(i, "description", v)} multiline />
            </div>
          ))}
        </Section>

        {/* Contact */}
        <Section title="Contact Settings">
          <Field
            label="WhatsApp Number (with country code, no +)"
            value={draft.contact.whatsappNumber}
            onChange={(v) => setDraft({ ...draft, contact: { ...draft.contact, whatsappNumber: v } })}
          />
        </Section>

        {/* Footer */}
        <Section title="Footer">
          <Field label="Brand Name" value={draft.footer.brandName} onChange={(v) => setDraft({ ...draft, footer: { ...draft.footer, brandName: v } })} />
          <Field label="Tagline" value={draft.footer.tagline} onChange={(v) => setDraft({ ...draft, footer: { ...draft.footer, tagline: v } })} />
        </Section>
      </div>
    </div>
  );
};

export default AdminDashboard;
