import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Shield, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: values,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      form.reset();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const reviews = [
    {
      id: 1,
      name: "Lee-Ann Läufs",
      initials: "LL",
      rating: 5,
      date: "2 weeks ago",
      text: "The most delicious biltong we have ever had. We also bought yogurt covered dates, chocolate nuts, fruit cubes and more. We make a point to drive passed all other biltong shops just to go there. So impressed.",
      verified: true,
    },
    {
      id: 2,
      name: "Bevan Booysen",
      initials: "BB",
      rating: 5,
      date: "1 month ago",
      text: "The biltong is fantastic! Especially the Wagyu beef biltong. They have Wagyu burgers as well. Was told to braai the Wagyu burgers from frozen and I was skeptical. But WOW! Came out perfectly from frozen onto the braai. Try all the biltong and the nuts. Pricing is good and service is great.",
      verified: true,
    },
    {
      id: 3,
      name: "Nicole Solomon",
      initials: "NS",
      rating: 5,
      date: "3 weeks ago",
      text: "Great service. Best biltong. Lovely variety and the owner was so hands on. My new favourite biltong shop.",
      verified: true,
    },
    {
      id: 4,
      name: "Lindsay Lange",
      initials: "LL",
      rating: 5,
      date: "2 months ago",
      text: "OMW! Love their biltong! We've tried their chilli beef biltong, fatty beef biltong and droewors. All Deeee-licious!",
      verified: false,
    },
    {
      id: 5,
      name: "Yoke Saskia van der Merwe",
      initials: "YV",
      rating: 5,
      date: "1 month ago",
      text: "I just love Bashies Biltong. Their Pecanha Biltong is my favourite.",
      verified: true,
    },
    {
      id: 6,
      name: "Terri",
      initials: "T",
      rating: 5,
      date: "3 weeks ago",
      text: "Bashies has a wide variety of delicious biltong, and their service is always fantastic!",
      verified: false,
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
    <Card className="border-border w-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-3 xs:p-4 sm:p-5 lg:p-6 space-y-3 xs:space-y-4">
        {/* Header with rating and source */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 xs:w-4 xs:h-4 ${
                  i < review.rating 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300 fill-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center space-x-1 xs:space-x-2 text-xs text-muted-foreground">
            {review.verified && (
              <div className="flex items-center space-x-1 text-green-600">
                <Shield className="w-3 h-3" />
                <span className="font-medium hidden xs:inline">Verified</span>
              </div>
            )}
            <span className="text-xs">Google</span>
          </div>
        </div>

        {/* Review text */}
        <blockquote className="text-sm xs:text-sm sm:text-base font-raleway text-foreground leading-relaxed italic min-h-[3rem] xs:min-h-[4rem]">
          "{review.text}"
        </blockquote>

        {/* Reviewer info */}
        <div className="flex items-center justify-between pt-2 xs:pt-3 border-t border-border/50">
          <div className="flex items-center space-x-2 xs:space-x-3">
            <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs sm:text-sm font-raleway font-semibold text-primary">
                {review.initials}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs xs:text-sm font-raleway font-medium text-foreground truncate">
                {review.name}
              </p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-raleway flex-shrink-0">
            {review.date}
          </span>
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
                      <a href="tel:+27661209331" className="hover:text-primary transition-colors">
                        +27 66 120 9331
                      </a>
                      <br />
                      <a
                        href="https://wa.me/27661209331"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors font-medium"
                      >
                        WhatsApp Available
                      </a>
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
                      hello@bashies.co.za
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-raleway font-medium text-foreground">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your full name"
                            className="font-raleway"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-raleway font-medium text-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com"
                            className="font-raleway"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-raleway font-medium text-foreground">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+27 12 345 6789"
                            className="font-raleway"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-raleway font-medium text-foreground">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us how we can help you..."
                            rows={5}
                            className="font-raleway resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full py-4 sm:py-6 text-base sm:text-lg font-raleway font-medium tracking-wide"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
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
            {/* Mobile/Tablet Slider */}
            <div className="lg:hidden">
              <div className="relative overflow-hidden px-4 sm:px-6">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentReviewIndex * 100}%)`,
                    willChange: 'transform'
                  }}
                >
                  {reviews.map((review) => (
                    <div key={review.id} className="w-full flex-shrink-0 px-2">
                      <div className="max-w-full">
                        <ReviewCard review={review} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Touch/Swipe overlay */}
                <div 
                  className="absolute inset-0 flex z-10"
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
                    className="w-1/2 h-full opacity-0 hover:opacity-10 hover:bg-black/5 transition-opacity"
                    onClick={() => handleSlide('prev')}
                    aria-label="Previous review"
                  />
                  <button 
                    className="w-1/2 h-full opacity-0 hover:opacity-10 hover:bg-black/5 transition-opacity"
                    onClick={() => handleSlide('next')}
                    aria-label="Next review"
                  />
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      index === currentReviewIndex 
                        ? 'bg-primary scale-110' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
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
            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
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
