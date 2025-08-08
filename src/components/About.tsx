const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-anton text-primary mb-4 sm:mb-6 tracking-wide">
                OUR STORY
              </h2>
              <div className="space-y-4 sm:space-y-6 font-raleway text-foreground leading-relaxed">
                <p className="text-base sm:text-lg lg:text-xl">
                  At Bashies, we're passionate about bringing you the finest South African biltong and premium deli experience. Our commitment to quality and authenticity sets us apart.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Every piece of biltong is carefully crafted using traditional methods and the highest quality beef. We believe in preserving the authentic taste that has been passed down through generations while maintaining the refined experience our customers expect.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  From our modern deli counter to our carefully curated selection of premium products, Bashies represents the perfect blend of tradition and contemporary South African cuisine.
                </p>
              </div>
            </div>

            {/* Quality Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="space-y-2">
                <h3 className="font-raleway font-semibold text-primary text-base sm:text-lg">Premium Quality</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Only the finest cuts of beef, sourced from trusted suppliers
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-raleway font-semibold text-primary text-lg">Traditional Methods</h3>
                <p className="text-muted-foreground text-sm">
                  Time-honored techniques passed down through generations
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-raleway font-semibold text-primary text-lg">Fresh Daily</h3>
                <p className="text-muted-foreground text-sm">
                  Made fresh in our modern facility with careful attention to detail
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-raleway font-semibold text-primary text-lg">Authentic Taste</h3>
                <p className="text-muted-foreground text-sm">
                  True South African flavors that transport you home
                </p>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
              {/* This would be replaced with actual store interior or biltong preparation image */}
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                <p className="text-muted-foreground font-raleway text-center px-6">
                  Premium biltong preparation<br />or store interior image
                </p>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;