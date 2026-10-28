// Bashies on Google Maps. A Place ID is public, not a secret. It encodes the
// feature ID in the Contact map embed (0x1dcc4321ee3319dd:0xe73ebfc0cc42daf1).
// Shared by the reviews page and worker/index.ts.
export const GOOGLE_PLACE_ID = "ChIJ3Rkz7iFDzB0R8dpCzMC_Puc";

// Opens Google's "write a review" box for Bashies. Google asks the customer to
// sign in first; a review can only be written by the customer, on Google.
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

// Bashies' Google Maps listing, where all the reviews are.
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;
