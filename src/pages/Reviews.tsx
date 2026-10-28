import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SavedReviewCards } from "@/components/Contact";
import { GOOGLE_MAPS_URL, GOOGLE_WRITE_REVIEW_URL } from "@/lib/google";

// The Places API (New) fields that worker/index.ts asks Google for.
type GoogleReview = {
  rating: number;
  relativePublishTimeDescription: string;
  text?: { text: string };
  googleMapsUri: string;
  authorAttribution: { displayName: string; uri: string; photoUri: string };
};

type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

const Stars = ({ rating, className }: { rating: number; className: string }) => (
  <div className="flex items-center space-x-1" role="img" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${className} ${i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
      />
    ))}
  </div>
);

const Reviews = () => {
  const [place, setPlace] = useState<GooglePlace | null>(null);

  // Fetched in the browser, never during render, so the prerendered HTML matches.
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then(setPlace)
      .catch((error) => console.error("Could not load Google reviews:", error));
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Call to action */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-anton text-primary mb-4 sm:mb-6 tracking-wide">
              REVIEW US
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-raleway text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Enjoyed your biltong? A Google review takes a minute and helps other biltong lovers find us.
            </p>
            <Button asChild size="lg" className="py-6 px-8 text-base sm:text-lg font-raleway font-medium tracking-wide">
              <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                <Star className="h-5 w-5 fill-current" />
                Write a Google review
              </a>
            </Button>
            <p className="mt-3 text-xs font-raleway text-muted-foreground">
              Google asks you to sign in to your Google account first.
            </p>
          </div>

          {/* Live reviews from Google */}
          <section aria-labelledby="google-reviews" className="rounded-lg border border-border p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 id="google-reviews" className="text-xl xs:text-2xl sm:text-3xl font-anton text-primary tracking-wide">
                  WHAT OUR CUSTOMERS SAY
                </h2>
                {place?.rating !== undefined && (
                  <div className="mt-2 flex flex-wrap items-center gap-2 font-raleway text-sm text-muted-foreground">
                    <span className="text-lg font-semibold text-foreground">{place.rating.toFixed(1)}</span>
                    <Stars rating={place.rating} className="w-4 h-4" />
                    <span>from {place.userRatingCount} Google reviews</span>
                  </div>
                )}
              </div>
              {/* Google requires its logo next to Places content shown without a map. */}
              <img src="/images/google-maps-logo.svg" width={98} height={18} alt="Google Maps" className="h-[18px] w-auto" />
            </div>

            {/* The saved reviews from the home page show until live ones load, and
                stay if the GOOGLE_PLACES_API_KEY secret is not set or Google fails. */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {place?.reviews ? (
                place.reviews.map((review) => (
                  <Card key={review.googleMapsUri} className="border-border shadow-sm">
                    <CardContent className="p-4 sm:p-5 lg:p-6 space-y-3">
                      {/* Google requires the author's photo, name and a link to their profile. */}
                      <a
                        href={review.authorAttribution.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 group"
                      >
                        <img
                          src={review.authorAttribution.photoUri}
                          alt=""
                          width={40}
                          height={40}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <span className="font-raleway font-medium text-sm text-foreground group-hover:text-primary group-hover:underline">
                          {review.authorAttribution.displayName}
                        </span>
                      </a>
                      <div className="flex items-center justify-between gap-2">
                        <Stars rating={review.rating} className="w-4 h-4" />
                        <span className="text-xs font-raleway text-muted-foreground">
                          {review.relativePublishTimeDescription}
                        </span>
                      </div>
                      {review.text && (
                        <blockquote className="text-sm sm:text-base font-raleway text-foreground leading-relaxed whitespace-pre-line">
                          {review.text.text}
                        </blockquote>
                      )}
                      <a
                        href={review.googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-raleway text-muted-foreground underline hover:text-primary"
                      >
                        View on Google Maps
                      </a>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <SavedReviewCards />
              )}
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <a
                href={place?.googleMapsUri ?? GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-raleway text-sm font-medium text-primary underline hover:no-underline"
              >
                Read all our reviews on Google Maps
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Reviews;
