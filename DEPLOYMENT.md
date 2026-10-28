# Deploying to Cloudflare

The site runs on **Cloudflare Workers** as a static site: Cloudflare serves the
`dist/` folder produced by `npm run build`, as configured in
[`wrangler.jsonc`](wrangler.jsonc). Cloudflare's GitHub integration
(Workers Builds) builds and deploys automatically on every push to `main`.

## One-time setup

> `wrangler.jsonc` must already be on `main` before you connect the repository.
> Without it, Cloudflare tries to auto-configure the project and opens its own PR.

1. In the Cloudflare dashboard, go to **Workers & Pages** → **Create application**.
2. Choose **GitHub**. If asked, install the Cloudflare GitHub app and give it
   access to `HypedBunny/bashies-biltong-blends`.
3. Select the `bashies-biltong-blends` repository and configure:

   | Setting | Value |
   |---|---|
   | Project / Worker name | `bashies-biltong-blends` (must match `name` in `wrangler.jsonc`, or the build fails) |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` (the default) |
   | Root directory | leave empty |
   | Build variables | none needed (Node 22 is read from `.node-version`) |

4. Select **Save and Deploy**. The first build takes a couple of minutes, then
   the site is live at `https://bashies-biltong-blends.<your-subdomain>.workers.dev`.
   That address sends `X-Robots-Tag: noindex` (see `public/_headers`) so
   only bashies.co.za shows up in search results.

## Point bashies.co.za at the Worker

1. The domain's DNS must be managed by Cloudflare. If it isn't yet: **Add a domain**
   → `bashies.co.za`, then change the nameservers at your domain registrar to the
   two Cloudflare gives you.
   **Before switching nameservers**, check that the imported DNS records include
   the email records for hello@bashies.co.za (MX, plus SPF/DKIM `TXT` records).
   If they're missing, email will stop arriving.
2. In the Worker: **Settings** → **Domains & Routes** → **Add** → **Custom domain**
   → `bashies.co.za`. Repeat for `www.bashies.co.za`.
3. Send `www` to the main domain: **Rules** → **Redirect Rules** → use the
   "Redirect from WWW to root" template, so search engines see one canonical address.
4. Once bashies.co.za loads from Cloudflare, retire the old hosting.

## Live Google reviews (`/reviews`)

The `/reviews` page shows the Google rating and up to 5 Google reviews. Google
chooses the 5 by relevance; it has no "newest first" option. `worker/index.ts`
gets them from the Google Places API (New) on every visit, because Google's
terms do not allow caching them. The "Write a Google review" button does not
use the API, so it works without a key. The Place ID is in `src/lib/google.ts`.

Cost: Google gives 1,000 free requests a month (Place Details Enterprise +
Atmosphere SKU), then charges US$25 for each 1,000. One visit to `/reviews`
is one request.

One-time setup:

1. Open the [Google Cloud console](https://console.cloud.google.com/). Create a
   project and attach a billing account. Google requires billing, even for the
   free requests.
2. Go to **APIs & Services** → **Library**. Enable **Places API (New)**.
3. Go to **APIs & Services** → **Credentials** → **Create credentials** → **API key**.
   Edit the key: under **API restrictions**, select **Restrict key** and allow
   only **Places API (New)**.
4. Go to **Billing** → **Budgets & alerts**. Create a budget of US$1 with an
   email alert. Places API (New) has no daily cap, so this alert is the guard.
5. In Cloudflare: the Worker → **Settings** → **Variables and Secrets** → **Add**.
   Set the type to **Secret**, the name to `GOOGLE_PLACES_API_KEY`, and paste the key.
   (Or run `npx wrangler secret put GOOGLE_PLACES_API_KEY`.) Use a secret, not
   a plain variable: each deploy replaces plain variables with `wrangler.jsonc`.
6. Open https://bashies.co.za/reviews and check that the reviews show.

If the key is missing or Google returns an error, the page shows a link to the
reviews on Google Maps, and the Worker logs the error (Worker → **Logs**).

To test locally: put `GOOGLE_PLACES_API_KEY=<key>` in `.dev.vars` (git ignores
it) and run `npm run preview:cf`. `npm run dev` has no Worker, so `/reviews`
shows the fallback link there.

## Day to day

- **Deploy:** merge or push to `main`. Watch progress under the Worker's
  **Deployments** tab (**View build history**).
- **Preview a branch:** with **Settings** → **Build** → **Branch control** →
  **Enable Preview Builds**, every push to another branch gets its own preview URL.
- **Roll back:** **Deployments** → pick an earlier version → **Deploy**.
- **Try the Cloudflare setup locally:** `npm run preview:cf` (builds, then serves
  `dist/` with Cloudflare's runtime on http://localhost:8787).
- **Deploy from your machine** (not needed with GitHub connected): `npx wrangler login`,
  then `npm run deploy`.

## What the config does

- `wrangler.jsonc`: serves `dist/`. Unknown URLs return `dist/404.html` with a real
  404 status, and the app shows its "Page not found" screen. Only `/api/*`
  requests run `worker/index.ts` (the live Google reviews).
- `public/_headers`: security headers on every response. Hashed JS/CSS in
  `/assets/` is cached for a year, fonts and images for 30 days, and HTML is
  revalidated on every visit so new deploys show up immediately.
- `.node-version`: pins the build to Node 22.
- The contact form posts to the existing AWS API Gateway endpoint (see `infra/`),
  which accepts requests from any origin, so it works unchanged on Cloudflare.
  `server.ts` (Express) is not used on Cloudflare.
