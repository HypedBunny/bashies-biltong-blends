import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('shop');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-gradient-animated">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-6 sm:space-y-8">
          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-anton tracking-wide leading-tight">
            <span className="text-shimmer block">BASHIES</span>
            <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mt-1 sm:mt-2 text-foreground">
              BILTONG & DELI
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-raleway text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed px-2">
            Cape Town's premier destination for authentic South African biltong, droëwors, and premium game meats.
          </p>

          {/* CTA Button */}
          <div className="pt-4 sm:pt-8">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-raleway font-medium tracking-wide hover:scale-105 transition-transform duration-200 animate-pulse-cta"
            >
              View Products
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary rounded-t-lg"></div>
      </div>
    </section>
  );
};

export default Hero;