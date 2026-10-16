const About = () => {
  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-32 bg-background overflow-hidden">
      {/* Subtle diagonal lines pattern */}
      <div className="absolute inset-0 pattern-diagonal-lines opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-anton text-primary mb-4 sm:mb-6 tracking-wide">
                OUR STORY
              </h2>
              <div className="space-y-4 sm:space-y-6 font-raleway text-foreground leading-relaxed">
                <p className="text-base sm:text-lg lg:text-xl font-semibold">
                  Inspired by our children, Ashleigh and Sebastian, the name Bashies blends their names and their spirit—because family has always been at the heart of our story
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  What began as a simple family idea quickly grew into a shared dream, driven by passion, perseverance, and the belief that good food brings people together.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  In 2020, while the world slowed down during lockdown, Tina and Rowan picked up the pace. From their garage, they started experimenting with high-protein lifestyle products and premium meats, laying the groundwork for a brand built on quality and connection.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  By July 2022, the Bashies spirit had moved beyond the garage and into local markets. Week after week, they met new faces, welcomed familiar ones, and shared stories over sizzling samples and warm conversations. The markets became the launchpad — the place where the brand's energy, character, and purpose truly came alive.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Behind the scenes, the next step was already taking shape: a storefront. Tina and Rowan envisioned a space that felt like home, where every customer could be greeted by name and experience Bashies in person. That dream came to life in July 2023, when the first Bashies store opened its doors.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Today, many who walk through those doors have been part of the journey from day one. Their loyalty reflects something bigger than business; it's a story of community, family, and heart.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  And as Bashies continues to grow, one thing remains constant: it's still all about the people — the ones who believed, supported, and savoured every step of the journey.
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-semibold text-primary">
                  Because Bashies isn't just a brand. It's a family story — and it's only just getting started.
                </p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            {/* Main image container */}
            <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/optimized/about-871.webp"
                srcSet="/images/optimized/about-480.webp 480w, /images/optimized/about-871.webp 871w"
                sizes="(min-width: 1024px) 560px, 100vw"
                width={871}
                height={569}
                loading="lazy"
                decoding="async"
                alt="Bashies Biltong premium products"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Outer decorative frame */}
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-xl -z-10"></div>
            <div className="absolute -inset-3 border border-primary/10 rounded-lg -z-10"></div>

            {/* Corner decorative elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 border-t-4 border-l-4 border-primary/30 rounded-tl-xl"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 border-t-4 border-r-4 border-primary/30 rounded-tr-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 border-b-4 border-l-4 border-primary/30 rounded-bl-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-4 border-r-4 border-primary/30 rounded-br-xl"></div>

            {/* Background accent */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-lg -z-10"></div>
          </div>

          {/* Store Front Image */}
          {/* <div className="relative">
            <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
              <img
                src="/images/store/storeFront.jpeg"
                alt="Bashies Biltong storefront - premium South African deli"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-lg -z-10"></div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;