import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Facebook } from "lucide-react";

// TikTok icon component since it's not in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Shop", href: "#shop" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-effect shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 lg:space-x-3">
            <img
              src="/logoBlack.png"
              alt="Bashies Logo"
              className="h-8 w-8 lg:h-10 lg:w-10 object-cover rounded-full"
            />
            <h1 className="text-2xl lg:text-3xl font-anton text-primary tracking-wider">
              BASHIES
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-raleway text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium tracking-wide"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 border-l border-border pl-6">
              <a
                href="https://www.instagram.com/bashies_biltong/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4 text-foreground hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/bashiesbeef/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4 text-foreground hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@bashies.biltong?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-4 w-4 text-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 font-raleway text-foreground hover:text-primary transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;