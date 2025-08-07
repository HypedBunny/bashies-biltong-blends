import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-muted/20">
        {/* This would be replaced with actual biltong/store interior image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-anton text-primary tracking-wide leading-tight">
            BASHIES
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-2 text-foreground">
              BEEF & BILTONG
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-raleway text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            Authentic taste, refined experience
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="px-12 py-6 text-lg font-raleway font-medium tracking-wide hover:scale-105 transition-transform duration-200"
            >
              Shop Now
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