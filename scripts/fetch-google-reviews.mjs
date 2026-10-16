// Fetches the business's Google reviews at build time (runs before `vite build`),
// so the page ships with them in its HTML and makes no API calls in the browser.
//
// Needs the GOOGLE_PLACES_API_KEY build variable (a Google Maps Platform key
// with Places API (New) enabled) and ideally GOOGLE_PLACE_ID - see
// DEPLOYMENT.md. Without the key, or if anything goes wrong, it writes nothing
// and the site shows the saved reviews in src/data/reviews.ts. It never fails
// the build.
//
// Google returns at most 5 reviews, picked by relevance (the API has no
// "newest" option), so this keeps the 5-star ones and sorts them newest first.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "src", "data", "google-reviews.generated.json");
const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const PLACES_API = "https://places.googleapis.com/v1";

async function places(urlPath, fieldMask, init = {}) {
  const res = await fetch(`${PLACES_API}${urlPath}`, {
    ...init,
    headers: { "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": fieldMask, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`${urlPath} returned HTTP ${res.status}: ${(await res.text()).replace(/\s+/g, " ").slice(0, 300)}`);
  return res.json();
}

// Fallback when GOOGLE_PLACE_ID isn't set: look the shop up by name near its location.
async function findPlaceId() {
  const { places: found } = await places("/places:searchText", "places.id,places.displayName,places.formattedAddress", {
    method: "POST",
    body: JSON.stringify({
      textQuery: "Bashies Biltong & Deli, Plumstead, Cape Town",
      locationBias: { circle: { center: { latitude: -34.0180211, longitude: 18.4643639 }, radius: 2000 } },
    }),
  });
  const place = found?.[0];
  if (!place) throw new Error("no matching place found by text search");
  console.log(
    `google-reviews: matched "${place.displayName?.text}" (${place.formattedAddress}). ` +
      `Set GOOGLE_PLACE_ID=${place.id} to skip this lookup.`
  );
  return place.id;
}

const initialsOf = (name) => {
  const words = name.trim().split(/\s+/);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
};

const monthYear = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-ZA", { month: "long", year: "numeric", timeZone: "Africa/Johannesburg" }).format(new Date(iso))
    : undefined;

async function main() {
  // Start clean so a failed or keyless build never shows an old snapshot.
  await fs.rm(outPath, { force: true });

  if (!apiKey) {
    console.log("google-reviews: GOOGLE_PLACES_API_KEY not set; using the saved reviews.");
    return;
  }

  const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId());
  const place = await places(`/places/${encodeURIComponent(placeId)}?languageCode=en`, "reviews,googleMapsUri");

  const reviews = (place.reviews ?? [])
    .filter((review) => review.rating === 5 && review.text?.text?.trim())
    .sort((a, b) => Date.parse(b.publishTime) - Date.parse(a.publishTime))
    .map((review) => {
      const name = review.authorAttribution?.displayName?.trim() || "Google user";
      return {
        id: review.name,
        name,
        initials: initialsOf(name),
        rating: 5,
        text: review.text.text.trim(),
        date: monthYear(review.publishTime),
        profileUrl: review.authorAttribution?.uri,
      };
    });

  await fs.writeFile(
    outPath,
    JSON.stringify({ fetchedAt: new Date().toISOString(), googleMapsUri: place.googleMapsUri, reviews }, null, 2) + "\n"
  );
  console.log(
    `google-reviews: ${reviews.length} five-star review(s) out of ${place.reviews?.length ?? 0} returned by Google.`
  );
}

try {
  await main();
} catch (error) {
  console.warn(`google-reviews: could not fetch reviews, using the saved ones instead. ${error.message}`);
}
