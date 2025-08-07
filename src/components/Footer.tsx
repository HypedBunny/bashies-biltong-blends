import { Instagram, Facebook } from "lucide-react";

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
            <h2 className="text-3xl lg:text-4xl font-anton tracking-wider">
              BASHIES
            </h2>
            <p className="mt-2 font-raleway text-primary-foreground/80">
              Beef & Biltong
            </p>
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
              href="https://instagram.com/bashies_deli"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com/bashies"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors duration-200"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm font-raleway text-primary-foreground/80">
            <p>123 Deli Street, Cape Town, 8001</p>
            <p>+27 21 123 4567 | hello@bashies.co.za</p>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-sm font-raleway text-primary-foreground/60">
              © {new Date().getFullYear()} Bashies Beef & Biltong. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;