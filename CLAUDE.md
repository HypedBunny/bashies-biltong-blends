# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with auto-reloading (runs on port 8080)
- `npm run build` - Production build: client bundle, then an SSR build of `src/entry-server.tsx` that `scripts/prerender.mjs` uses to prerender `/` into `dist/index.html` and `/reviews` into `dist/reviews.html` (`src/main.tsx` hydrates them)
- `npm run build:dev` - Development build  
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview production build
- `npm run preview:cf` - Build, then serve `dist/` locally with Cloudflare's runtime (`wrangler dev`, port 8787)
- `npm run deploy` - Build and deploy to Cloudflare from your machine (normally Workers Builds deploys on push to `main`)
- `python3 scripts/optimize-images.py` - Regenerate the resized WebP images, favicons and social card in `public/images/optimized/` (needs Pillow); run after adding or replacing a photo

## Project Architecture

This is a **Bashies Biltong & Deli** business website built with:
- **Vite** + **React 18** + **TypeScript**
- **shadcn/ui** component library with **Radix UI** primitives
- **Tailwind CSS** for styling with custom fonts (Anton, Raleway)
- **React Router** for client-side routing
- **TanStack Query** for data fetching
- **React Hook Form** + **Zod** for form handling

### Application Structure

**Single Page Layout**: The main page (`src/pages/Index.tsx`) renders all sections as a cohesive landing page:
- Header (navigation)
- Hero (brand showcase)
- About (company story)
- Products (biltong catalog)
- Contact (contact form)
- Footer

**Reviews page** (`src/pages/Reviews.tsx`, `/reviews`): a "Write a Google review" button and the live Google rating and reviews from `/api/reviews`. That route is the only server code: `worker/index.ts` calls the Google Places API (New) with the `GOOGLE_PLACES_API_KEY` secret (setup in `DEPLOYMENT.md`). The Place ID and review links are in `src/lib/google.ts`. A new route must also be added to the `routes` list in `scripts/prerender.mjs`, or it serves a 404 status.

**Component Organization**:
- `src/components/` - Page section components (Header, Hero, About, Products, Contact, Footer)
- `src/components/ui/` - Reusable shadcn/ui components
- `src/pages/` - Route-level page components (Index, Reviews, NotFound)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities (mainly `utils.ts` for class merging)

### Styling Approach

- **Design System**: Uses CSS custom properties for theming (defined in `src/index.css`)
- **Typography**: Anton for headings, Raleway for body text
- **Responsive**: Mobile-first with custom breakpoints including `xs: 475px`
- **Component Styling**: Tailwind utility classes with shadcn/ui component variants

### Key Technical Details

- **Path Aliases**: `@/*` maps to `src/*` for clean imports
- **Prerendering**: Components must render identically on the server and in the browser (no `window`/`document` access during render, only in effects/handlers)
- **Images**: Pages reference the optimized variants in `public/images/optimized/`, not the full-size originals
- **Fonts**: Anton and Raleway are self-hosted in `public/fonts/` (declared in `src/index.css`, preloaded in `index.html`)
- **SEO files**: `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`
- **TypeScript**: Lenient configuration (allows implicit any, unused vars disabled)
- **ESLint**: React-specific rules with TypeScript support
- **No Testing Framework**: Currently no test setup configured
- **Deployment**: Cloudflare Workers static assets, built from GitHub by Workers Builds on push to `main` (`wrangler.jsonc`, `public/_headers`, setup steps in `DEPLOYMENT.md`). Unknown URLs serve `dist/404.html` with a 404 status. Only `/api/*` runs `worker/index.ts`
- **Package manager**: npm (`package-lock.json`); don't add other lockfiles, as Cloudflare's build picks its installer from the lockfile

### Business Context

Bashies Biltong & Deli specializes in authentic South African biltong and dried meats. The website showcases their products (Traditional Biltong, Chili Biltong, Droëwors, etc.) with an "Online Store Coming Soon" message, indicating this is a business in development phase.