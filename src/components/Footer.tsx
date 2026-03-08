const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display text-xl font-bold text-foreground">
              Crooque<span className="text-primary">.</span>
            </span>
            <p className="font-body text-sm text-muted-foreground mt-1">Your Creative Production Partner</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#products" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Products</a>
            <a href="#pricing" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#gallery" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Gallery</a>
            <a href="#contact" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="font-body text-xs text-text-dim">
            © 2026 Crooque. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
