import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Traditional Biltong",
      description: "Classic South African beef biltong, perfectly seasoned and dried",
      image: "/images/products/beefBiltong.jpg"
    },
    {
      id: 2,
      name: "Chili Biltong",
      description: "Spiced with carefully selected chilies for the perfect kick",
      image: "/images/products/chillie.jpg"
    },
    {
      id: 3,
      name: "Droëwors",
      description: "Our traditional beef droëwors is made from premium cuts of lean beef, expertly spiced and naturally air-dried for the perfect flavour. Every bite delivers that classic South African taste — rich, savoury, and deliciously moreish.",
      image: "/images/products/droewors.jpg"
    },
    {
      id: 4,
      name: "Biltong Powder",
      description: "Ground biltong perfect for seasoning and cooking",
      image: "/images/products/biltongPowder.jpg"
    },
    {
      id: 5,
      name: "Picanha Beef Biltong",
      description: "Our Geelvet C-grade picanha beef biltong is crafted from the prized rump cap, known for its rich marbling and bold flavour. Naturally air-dried and seasoned with our signature spice blend, it offers a tender, juicy texture and that unmistakable, full-bodied biltong taste South Africans love.",
      image: "/images/products/premium-biltong.jpg"
    },
    {
      id: 6,
      name: "Variety Pack",
      description: "Sample our full range with this carefully curated selection",
      image: "/images/products/variety-pack.jpg"
    }
  ];

  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [showPopup, setShowPopup] = useState(false);

  const handleImageError = (productId: number) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleProductClick = () => {
    setShowPopup(true);
  };

  return (
    <section id="shop" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton text-primary mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-wide">
            OUR PRODUCTS
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-raleway text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Discover our carefully crafted selection of premium biltong and traditional South African delicacies
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {products.map((product) => (
            <Card key={product.id} onClick={handleProductClick} className="group cursor-pointer border-border hover:shadow-lg transition-all duration-300 bg-card h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Product Image */}
                <div className="aspect-square bg-muted overflow-hidden rounded-t-lg flex-shrink-0">
                  {!imageErrors[product.id] ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(product.id)}
                    />
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
            onClick={handleProductClick}
            className="px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-4 sm:py-5 md:py-6 text-sm xs:text-base sm:text-lg font-raleway font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Online Store Coming Soon
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