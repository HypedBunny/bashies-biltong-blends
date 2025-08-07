import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Traditional Biltong",
      description: "Classic South African beef biltong, perfectly seasoned and dried",
      price: "R120",
      image: "traditional-biltong"
    },
    {
      id: 2,
      name: "Chili Biltong",
      description: "Spiced with carefully selected chilies for the perfect kick",
      price: "R130",
      image: "chili-biltong"
    },
    {
      id: 3,
      name: "Droëwors",
      description: "Traditional dried sausage, a South African favorite",
      price: "R95",
      image: "droewors"
    },
    {
      id: 4,
      name: "Biltong Powder",
      description: "Ground biltong perfect for seasoning and cooking",
      price: "R85",
      image: "biltong-powder"
    },
    {
      id: 5,
      name: "Premium Cut Biltong",
      description: "Our finest cut, tender and full of flavor",
      price: "R180",
      image: "premium-biltong"
    },
    {
      id: 6,
      name: "Variety Pack",
      description: "Sample our full range with this carefully curated selection",
      price: "R250",
      image: "variety-pack"
    }
  ];

  return (
    <section id="shop" className="py-20 lg:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-anton text-primary mb-6 tracking-wide">
            OUR PRODUCTS
          </h2>
          <p className="text-lg lg:text-xl font-raleway text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of premium biltong and traditional South African delicacies
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <Card key={product.id} className="group cursor-pointer border-border hover:shadow-lg transition-all duration-300 bg-card">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <p className="text-muted-foreground font-raleway text-center px-4 text-sm">
                      {product.name}<br />Product Image
                    </p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-raleway font-semibold text-primary mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground font-raleway text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-raleway font-bold text-primary">
                      {product.price}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="font-raleway font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline"
            className="px-12 py-6 text-lg font-raleway font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;