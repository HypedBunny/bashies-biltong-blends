// Customer reviews shown in the "What our customers say" section.
//
// `npm run build` first runs scripts/fetch-google-reviews.mjs. When the
// GOOGLE_PLACES_API_KEY build variable is set, it saves the business's 5-star
// Google reviews (newest first) to google-reviews.generated.json, which is
// gitignored, and those are shown first. Without the key, or if Google can't
// be reached, only the saved reviews below are shown.

export type Review = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  /** Month and year the review was posted, e.g. "March 2026". */
  date?: string;
  /** The reviewer's Google Maps profile. */
  profileUrl?: string;
  verified?: boolean;
};

type GeneratedReviews = { reviews: Review[]; googleMapsUri?: string };

// import.meta.glob returns nothing when the generated file doesn't exist, so the
// site still builds and runs without it.
const generated = Object.values(
  import.meta.glob<GeneratedReviews>("./google-reviews.generated.json", { eager: true, import: "default" })
)[0];

// Fills the grid (2 rows of 3 on desktop).
const MAX_REVIEWS = 6;

// Google reviews copied in by hand. Shown after any freshly fetched ones.
const savedReviews: Review[] = [
  {
    id: "saved-1",
    name: "Lee-Ann Läufs",
    initials: "LL",
    rating: 5,
    text: "The most delicious biltong we have ever had. We also bought yogurt covered dates, chocolate nuts, fruit cubes and more. We make a point to drive passed all other biltong shops just to go there. So impressed.",
    verified: true,
  },
  {
    id: "saved-2",
    name: "Bevan Booysen",
    initials: "BB",
    rating: 5,
    text: "The biltong is fantastic! Especially the Wagyu beef biltong. They have Wagyu burgers as well. Was told to braai the Wagyu burgers from frozen and I was skeptical. But WOW! Came out perfectly from frozen onto the braai. Try all the biltong and the nuts. Pricing is good and service is great.",
    verified: true,
  },
  {
    id: "saved-3",
    name: "Nicole Solomon",
    initials: "NS",
    rating: 5,
    text: "Great service. Best biltong. Lovely variety and the owner was so hands on. My new favourite biltong shop.",
    verified: true,
  },
  {
    id: "saved-4",
    name: "Lindsay Lange",
    initials: "LL",
    rating: 5,
    text: "OMW! Love their biltong! We've tried their chilli beef biltong, fatty beef biltong and droewors. All Deeee-licious!",
    verified: false,
  },
  {
    id: "saved-5",
    name: "Yoke Saskia van der Merwe",
    initials: "YV",
    rating: 5,
    text: "I just love Bashies Biltong. Their Pecanha Biltong is my favourite.",
    verified: true,
  },
  {
    id: "saved-6",
    name: "Terri",
    initials: "T",
    rating: 5,
    text: "Bashies has a wide variety of delicious biltong, and their service is always fantastic!",
    verified: false,
  },
];

const seen = new Set<string>();

// Fetched reviews first, then saved ones, with one review per person.
export const reviews: Review[] = [...(generated?.reviews ?? []), ...savedReviews]
  .filter((review) => {
    const person = review.name.trim().toLowerCase();
    if (seen.has(person)) return false;
    seen.add(person);
    return true;
  })
  .slice(0, MAX_REVIEWS);

/** The business's Google Maps page, known once reviews have been fetched. */
export const googleReviewsUrl = generated?.googleMapsUri;
