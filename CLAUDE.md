# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with auto-reloading (runs on port 8080)
- `npm run build` - Production build: client bundle, then an SSR build of `src/entry-server.tsx` that `scripts/prerender.mjs` uses to prerender `/` into `dist/index.html` (`src/main.tsx` hydrates it)
- `npm run build:dev` - Development build  
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview production build
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

**Component Organization**:
- `src/components/` - Page section components (Header, Hero, About, Products, Contact, Footer)
- `src/components/ui/` - Reusable shadcn/ui components
- `src/pages/` - Route-level page components (Index, NotFound)
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
- **Deployment**: Designed for Lovable platform integration

### Business Context

Bashies Biltong & Deli specializes in authentic South African biltong and dried meats. The website showcases their products (Traditional Biltong, Chili Biltong, Droëwors, etc.) with an "Online Store Coming Soon" message, indicating this is a business in development phase.