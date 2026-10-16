import { Instagram, Facebook } from "lucide-react";

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

const Footer = () => {
  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Shop", href: "#shop" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div>
            <img
              src="/images/optimized/banner-white-720.webp"
              width={720}
              height={240}
              loading="lazy"
              decoding="async"
              alt="Bashies Deli & Biltong"
              className="h-16 lg:h-20 w-auto mx-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-raleway text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Social Media */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/bashies_biltong/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/bashiesbeef/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@bashies.biltong?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
              aria-label="Follow us on TikTok"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm font-raleway text-primary-foreground/80">
            <p>Gabriel Road, Wicklow Rd, Plumstead, Cape Town, 7800</p>
            <p>+27 66 120 9331 | hello@bashies.co.za</p>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-sm font-raleway text-primary-foreground/60" suppressHydrationWarning>
              © {new Date().getFullYear()} Bashies Deli & Biltong. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;