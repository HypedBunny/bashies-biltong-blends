import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-anton text-primary mb-6 tracking-wide">
            VISIT US
          </h2>
          <p className="text-lg lg:text-xl font-raleway text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Come experience our premium biltong and deli in person, or get in touch with us
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2">Location</h3>
                    <p className="text-muted-foreground text-sm">
                      123 Deli Street<br />
                      Cape Town, 8001<br />
                      South Africa
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">
                      +27 21 123 4567<br />
                      WhatsApp Available
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      hello@bashies.co.za<br />
                      orders@bashies.co.za
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-semibold text-primary mb-2">Hours</h3>
                    <p className="text-muted-foreground text-sm">
                      Mon-Fri: 9:00-18:00<br />
                      Sat: 9:00-16:00<br />
                      Sun: 10:00-15:00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                    <p className="text-muted-foreground font-raleway text-center px-6">
                      Google Maps Integration<br />
                      <span className="text-sm">Interactive map showing store location</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-anton text-primary mb-6 tracking-wide">
                GET IN TOUCH
              </h3>
              <form className="space-y-6">
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
                  className="w-full py-6 text-lg font-raleway font-medium tracking-wide"
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