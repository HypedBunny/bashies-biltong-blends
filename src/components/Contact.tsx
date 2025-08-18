import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const Contact = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Lee-Ann Läufs",
      initials: "LL",
      text: "The most delicious biltong we have ever had. We also bought yogurt covered dates, chocolate nuts, fruit cubes and more. We make a point to drive passed all other biltong shops just to go there. So impressed.",
    },
    {
      id: 2,
      name: "Bevan Booysen",
      initials: "BB",
      text: "The biltong is fantastic! Especially the Wagyu beef biltong. They have Wagyu burgers as well. Was told to braai the Wagyu burgers from frozen and I was skeptical. But WOW! Came out perfectly from frozen onto the braai. Try all the biltong and the nuts. Pricing is good and service is great.",
    },
    {
      id: 3,
      name: "Nicole Solomon",
      initials: "NS",
      text: "Great service. Best biltong. Lovely variety and the owner was so hands on. My new favourite biltong shop.",
    },
    {
      id: 4,
      name: "Lindsay Lange",
      initials: "LL",
      text: "OMW! Love their biltong! We've tried their chilli beef biltong, fatty beef biltong and droewors. All Deeee-licious!",
    },
    {
      id: 5,
      name: "Yoke Saskia van der Merwe",
      initials: "YV",
      text: "I just love Bashies Biltong. Their Pecanha Biltong is my favourite.",
    },
    {
      id: 6,
      name: "Terri",
      initials: "T",
      text: "Bashies has a wide variety of delicious biltong, and their service is always fantastic!",
    }
  ];

  // Auto-slide reviews every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length, isTransitioning]);

  const handleSlide = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (direction === 'next') {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    } else {
      setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    }
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <Card className="border-border flex-shrink-0 w-full">
      <CardContent className="p-3 sm:p-6 flex flex-col min-h-[200px]">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="flex text-yellow-400 mr-3">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs sm:text-sm font-raleway text-muted-foreground">Google</span>
        </div>
        <p className="text-sm sm:text-base font-raleway text-foreground mb-3 sm:mb-4 leading-relaxed flex-grow">
          "{review.text}"
        </p>
        <div className="flex items-center mt-auto">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <span className="text-xs sm:text-sm font-raleway font-semibold text-primary">{review.initials}</span>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-raleway font-medium text-foreground">{review.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-anton text-primary mb-4 sm:mb-6 tracking-wide">
            VISIT US
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-raleway text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Come experience our premium biltong and deli in person, or get in touch with us
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="border-border">
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2 text-sm sm:text-base">Location</h3>
                    <p className="text-muted-foreground text-sm">
                      Gabriel Road, Wicklow Rd<br />
                      Plumstead, Cape Town, 7800<br />
                      South Africa
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2 text-sm sm:text-base">Phone</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      +27 66 120 9331<br />
                      WhatsApp Available
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2 text-sm sm:text-base">Email</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      hello@bashies.co.za<br />
                      orders@bashies.co.za
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2 text-sm sm:text-base">Hours</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Mon-Fri: 9:00-18:00<br />
                      Sat: 9:00-17:00<br />
                      Sun: 9:00-14:00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.00739615189!2d18.464363900000002!3d-34.0180211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc4321ee3319dd%3A0xe73ebfc0cc42daf1!2sBashies%20Biltong!5e0!3m2!1sen!2sza!4v1754668721671!5m2!1sen!2sza" 
                    width="100%" 
                    height="100%" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bashies Biltong Location"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-anton text-primary mb-4 sm:mb-6 tracking-wide">
                GET IN TOUCH
              </h3>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-raleway font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="font-raleway"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-raleway font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="font-raleway"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-raleway font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com"
                    className="font-raleway"
                  />
                </div>

                <div>
                  <label className="block text-sm font-raleway font-medium text-foreground mb-2">
                    Phone (Optional)
                  </label>
                  <Input 
                    placeholder="+27 12 345 6789"
                    className="font-raleway"
                  />
                </div>

                <div>
                  <label className="block text-sm font-raleway font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="font-raleway resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-4 sm:py-6 text-base sm:text-lg font-raleway font-medium tracking-wide"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Google Reviews Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-anton text-primary mb-3 sm:mb-4 tracking-wide">
              WHAT OUR CUSTOMERS SAY
            </h3>
            <p className="text-sm sm:text-base lg:text-lg font-raleway text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              Real reviews from our valued customers
            </p>
          </div>

          {/* Reviews Slider */}
          <div className="relative">
            {/* Mobile Slider */}
            <div className="md:hidden">
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out px-4"
                  style={{ 
                    transform: `translateX(-${currentReviewIndex * 100}%)`
                  }}
                >
                  {reviews.map((review) => (
                    <div key={review.id} className="min-w-full shrink-0 px-2">
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
                
                {/* Touch/Swipe overlay */}
                <div 
                  className="absolute inset-0 flex px-4"
                  onTouchStart={(e) => {
                    const startX = e.touches[0].clientX;
                    const handleTouchEnd = (endEvent: TouchEvent) => {
                      const endX = endEvent.changedTouches[0].clientX;
                      const diff = startX - endX;
                      if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                          handleSlide('next');
                        } else {
                          handleSlide('prev');
                        }
                      }
                      document.removeEventListener('touchend', handleTouchEnd);
                    };
                    document.addEventListener('touchend', handleTouchEnd);
                  }}
                >
                  <button 
                    className="w-1/2 h-full"
                    onClick={() => handleSlide('prev')}
                    aria-label="Previous review"
                  />
                  <button 
                    className="w-1/2 h-full"
                    onClick={() => handleSlide('next')}
                    aria-label="Next review"
                  />
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentReviewIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentReviewIndex(index);
                        setTimeout(() => setIsTransitioning(false), 500);
                      }
                    }}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
