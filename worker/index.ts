// Cloudflare Worker. Only /api/* reaches this code (wrangler.jsonc
// "run_worker_first"); every other request is a static file from dist/.
import { GOOGLE_PLACE_ID } from "../src/lib/google";

interface Env {
  ASSETS: { fetch: typeof fetch };
  GOOGLE_PLACES_API_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== "/api/reviews") {
      return env.ASSETS.fetch(request);
    }
    if (!env.GOOGLE_PLACES_API_KEY) {
      return Response.json({ error: "GOOGLE_PLACES_API_KEY is not set" }, { status: 503 });
    }

    // Places API (New) Place Details: the rating, the review count and at most
    // 5 reviews, which Google picks by relevance (there is no "newest" option).
    // Google's terms forbid caching this content, so every call goes to Google.
    // ponytail: no hard cost cap. Places API (New) only has a per-minute quota,
    // so a budget alert in Google Cloud is the guard (DEPLOYMENT.md). If traffic
    // grows, count calls per day in Workers KV and send the fallback when over.
    const res = await fetch(`https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
    });
    if (!res.ok) {
      console.error("Places API error", res.status, await res.text());
      return Response.json({ error: `Google returned ${res.status}` }, { status: 502 });
    }
    return new Response(res.body, {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  },
};
