import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Traditional Biltong",
      description: "Authentic South African beef biltong, expertly seasoned and naturally air-dried to tender perfection.",
      image: "/images/products/beefnew.jpeg",
      shopUrl: "https://shop.bashies.co.za/products/beef-biltong-1"
    },
    {
      id: 2,
      name: "Chili Biltong",
      description: "Bold, fiery flavour with every bite. Perfectly spiced for those who crave the heat!",
      image: "/images/products/chillie.jpg",
      shopUrl: "https://shop.bashies.co.za/products/chilli-biltong"
    },
    {
      id: 3,
      name: "Droëwors",
      description: "Premium lean beef, expertly spiced and air-dried. Rich, savoury, and utterly moreish!",
      image: "/images/products/droewors.jpg",
      shopUrl: "https://shop.bashies.co.za/products/beef-droewors"
    },
    {
      id: 4,
      name: "Cherry Chilli Droëwors",
      description: "Sweet meets heat! Fruity cherry sweetness with a spicy kick in every delicious bite.",
      image: "/images/products/ccdw.jpeg",
      shopUrl: "https://shop.bashies.co.za/products/cherry-droewors"
    },
    {
      id: 5,
      name: "Geelvet Picanha Beef",
      description: "Premium picanha rump cap with rich marbling. Air-dried to tender, juicy perfection.",
      image: "/images/products/PNew.jpeg",
      shopUrl: "https://shop.bashies.co.za/products/geelvet-picanha-beef"
    },
    {
      id: 6,
      name: "Game Biltong",
      description: "Exotic game biltong — lean, intensely flavourful, and a true taste of the wild!",
      image: "/images/products/Kudu.jpeg",
      shopUrl: "https://shop.bashies.co.za/collections/all"
    }
  ];

  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [showPopup, setShowPopup] = useState(false);

  const handleImageError = (productId: number) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleProductClick = (shopUrl: string) => {
    window.location.href = shopUrl;
  };

  return (
    <section id="shop" className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-muted/20 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 pattern-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton text-primary mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-wide">
            OUR PRODUCTS
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-raleway text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Discover our carefully crafted selection of premium biltong, droëwors, and traditional South African dried meats. Each product is naturally air-dried using authentic methods for superior flavour and tenderness.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {products.map((product) => (
            <Card key={product.id} onClick={() => handleProductClick(product.shopUrl)} className="group cursor-pointer border-border hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20 transition-all duration-500 bg-card h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Product Image */}
                <div className="aspect-square bg-muted overflow-hidden rounded-t-lg flex-shrink-0 relative">
                  {!imageErrors[product.id] ? (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-500 ${product.id === 1 ? 'rotate-180' : ''}`}
                        onError={() => handleImageError(product.id)}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <p className="text-muted-foreground font-raleway text-center px-2 xs:px-3 sm:px-4 text-xs xs:text-sm">
                        {product.name}<br />Image Coming Soon
                      </p>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 xs:p-4 sm:p-5 md:p-6 space-y-2 xs:space-y-3 sm:space-y-4 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-xl font-raleway font-semibold text-primary mb-1 xs:mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground font-raleway text-xs xs:text-sm sm:text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleProductClick('https://shop.bashies.co.za/collections/all')}
            className="px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-4 sm:py-5 md:py-6 text-sm xs:text-base sm:text-lg font-raleway font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors animate-pulse-cta"
          >
            Visit Our Shop
          </Button>
        </div>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="bg-muted/90 backdrop-blur-sm rounded-lg p-6 max-w-sm w-full text-center shadow-lg border border-border/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-raleway font-semibold text-foreground mb-3">
              Sorry, Online Store Coming Soon
            </h3>
            <p className="text-muted-foreground font-raleway text-sm leading-relaxed">
              For enquiries, please use our contact form
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;