import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SiteContent {
  hero: {
    tagline: string;
    headline1: string;
    headline2: string;
    description: string;
  };
  products: Array<{
    title: string;
    subtitle: string;
  }>;
  pricing: Array<{
    name: string;
    sizes: Array<{
      size: string;
      prices: Record<string, string>;
    }>;
  }>;
  process: Array<{
    title: string;
    description: string;
  }>;
  values: Array<{
    title: string;
    description: string;
  }>;
  contact: {
    whatsappNumber: string;
  };
  footer: {
    brandName: string;
    tagline: string;
  };
}

const defaultContent: SiteContent = {
  hero: {
    tagline: "Egypt's Premium Print Partner",
    headline1: "We Print",
    headline2: "Your Vision",
    description: "From business cards to large-format banners — premium quality printing with nationwide delivery across Egypt.",
  },
  products: [
    { title: "Flyers", subtitle: "A5 · A4 · A3" },
    { title: "Banners & Roll-ups", subtitle: "All Formats" },
    { title: "Business Cards", subtitle: "Standard & Premium" },
    { title: "Posters", subtitle: "Small to Large Format" },
    { title: "Stickers & Labels", subtitle: "Die-cut & Sheet" },
    { title: "Brochures & Catalogues", subtitle: "Bi-fold · Tri-fold" },
  ],
  pricing: [
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
  ],
  process: [
    { title: "Upload Your Design", description: "Send us your artwork or tell us your idea — our team will handle the rest." },
    { title: "Choose Size & Quantity", description: "Pick from our range of sizes and quantities. Custom options always available." },
    { title: "We Print & Deliver", description: "Premium quality printing with fast turnaround, delivered straight to your door." },
  ],
  values: [
    { title: "Fast Turnaround", description: "Rush orders welcome. Most jobs completed within 24–48 hours." },
    { title: "Premium Quality", description: "Top-grade materials and state-of-the-art printing technology." },
    { title: "Nationwide Delivery", description: "We deliver across all of Egypt — Cairo to Aswan and everywhere in between." },
    { title: "Expert Design Support", description: "Our in-house designers can refine or create your artwork from scratch." },
  ],
  contact: {
    whatsappNumber: "201000000000",
  },
  footer: {
    brandName: "Crooque",
    tagline: "Your Creative Production Partner",
  },
};

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  content: SiteContent;
  updateContent: (content: SiteContent) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

// Hardcoded admin credentials (frontend-only, will move to Supabase later)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Crooque2026!";

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("crooque_admin") === "true";
  });

  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem("crooque_content");
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem("crooque_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("crooque_admin");
  };

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem("crooque_content", JSON.stringify(newContent));
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, content, updateContent }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};

export type { SiteContent };
