import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
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
      </div>
    </section>
  );
};

export default Contact;