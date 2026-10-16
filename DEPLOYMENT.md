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

## Google reviews

Each build fetches the shop's Google reviews (`scripts/fetch-google-reviews.mjs`)
and the "What our customers say" section shows the 5-star ones, newest first.
Saved reviews in `src/data/reviews.ts` fill the remaining slots, and they're
also what the site shows when there's no API key or Google can't be reached.
Google's API only returns the 5 reviews it rates most relevant, so a brand-new
review may not appear straight away.

To switch it on:

1. In [Google Cloud](https://console.cloud.google.com/), create or pick a project
   with billing enabled, and enable **Places API (New)**.
2. Under **APIs & Services** → **Credentials**, create an API key and restrict it
   to **Places API (New)**. It's only used during Cloudflare builds, never in the
   browser.
3. In Cloudflare, go to the Worker → **Settings** → **Build** → **Variables and
   secrets** and add `GOOGLE_PLACES_API_KEY` (as a secret). Then trigger a build.
   The build log prints the matched business and its place ID. Add that as
   `GOOGLE_PLACE_ID` so later builds skip the lookup.
4. To refresh daily: under **Settings** → **Builds** → **Deploy Hooks**, create a
   hook for `main`. In GitHub, go to the repo → **Settings** → **Secrets and
   variables** → **Actions** and save the hook URL as `CLOUDFLARE_DEPLOY_HOOK_URL`.
   `.github/workflows/refresh-reviews.yml` then rebuilds every morning (it can
   also be run by hand from the **Actions** tab).

A daily refresh is one Place Details request per build (about 30 a month),
which should stay within Google's monthly free usage.

## What the config does

- `wrangler.jsonc`: serves `dist/`. Unknown URLs return `dist/404.html` with a real
  404 status, and the app shows its "Page not found" screen.
- `public/_headers`: security headers on every response. Hashed JS/CSS in
  `/assets/` is cached for a year, fonts and images for 30 days, and HTML is
  revalidated on every visit so new deploys show up immediately.
- `.node-version`: pins the build to Node 22.
- The contact form posts to the existing AWS API Gateway endpoint (see `infra/`),
  which accepts requests from any origin, so it works unchanged on Cloudflare.
  `server.ts` (Express) is not used on Cloudflare.
