import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Traditional Biltong",
      description: "Classic South African beef biltong, perfectly seasoned and dried",
      image: "traditional-biltong"
    },
    {
      id: 2,
      name: "Chili Biltong",
      description: "Spiced with carefully selected chilies for the perfect kick",
      image: "chili-biltong"
    },
    {
      id: 3,
      name: "Droëwors",
      description: "Traditional dried sausage, a South African favorite",
      image: "droewors"
    },
    {
      id: 4,
      name: "Biltong Powder",
      description: "Ground biltong perfect for seasoning and cooking",
      image: "biltong-powder"
    },
    {
      id: 5,
      name: "Premium Cut Biltong",
      description: "Our finest cut, tender and full of flavor",
      image: "premium-biltong"
    },
    {
      id: 6,
      name: "Variety Pack",
      description: "Sample our full range with this carefully curated selection",
      image: "variety-pack"
    }
  ];

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
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group cursor-pointer border-border hover:shadow-lg transition-all duration-300 bg-card h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Product Image */}
                <div className="aspect-square bg-muted overflow-hidden rounded-t-lg flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <p className="text-muted-foreground font-raleway text-center px-2 xs:px-3 sm:px-4 text-xs xs:text-sm">
                      {product.name}<br />Product Image
                    </p>
                  </div>
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
            className="px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-4 sm:py-5 md:py-6 text-sm xs:text-base sm:text-lg font-raleway font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;