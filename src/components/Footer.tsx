import { useAdmin } from "@/contexts/AdminContext";

const Footer = () => {
  const { content } = useAdmin();

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <span className="font-display text-xl font-bold text-foreground">
              {content.footer.brandName}<span className="text-primary">.</span>
            </span>
            <p className="font-body text-sm text-muted-foreground mt-1">{content.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <a href="#products" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Products</a>
            <a href="#pricing" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#gallery" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Gallery</a>
            <a href="#contact" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="font-body text-xs text-text-dim">
            © 2026 {content.footer.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
