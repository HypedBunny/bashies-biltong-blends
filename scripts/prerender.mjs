// Injects the server-rendered pages into dist/ (index.html, reviews.html) so the content
// paints without waiting for the JavaScript bundle (better FCP/LCP), and so
// crawlers that don't run JavaScript still see the page. src/main.tsx then
// hydrates this markup instead of rendering from scratch.
//
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await fs.readFile(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`);
}

// Unprerendered shell for unknown URLs: Cloudflare serves it with a 404 status
// (wrangler.jsonc "not_found_handling") and the app renders its NotFound page.
await fs.writeFile(path.join(root, "dist", "404.html"), template);

// Each route gets its own HTML file. Cloudflare serves dist/reviews.html at /reviews.
// "/" keeps the <head> written in index.html; other routes replace its title,
// description and URLs (canonical, og:url, twitter:url) with their own.
const routes = [
  { url: "/", file: "index.html" },
  {
    url: "/reviews",
    file: "reviews.html",
    title: "Reviews | Bashies Biltong & Deli, Plumstead, Cape Town",
    description: "Read what customers say about Bashies Biltong & Deli on Google, and leave your own review.",
  },
];

for (const { url, file, title, description } of routes) {
  let html = template;
  if (title) {
    html = html
      .replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`)
      .replace(/(<meta (?:name|property)="(?:title|og:title|twitter:title)" content=")[^"]*/g, (_, attr) => attr + title)
      .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g, (_, attr) => attr + description)
      .replaceAll('"https://bashies.co.za/"', `"https://bashies.co.za${url}"`);
    if (!html.includes(`<link rel="canonical" href="https://bashies.co.za${url}" />`)) {
      throw new Error(`prerender: could not set the canonical URL for ${url}; check the <head> in index.html`);
    }
  }
  const appHtml = render(url);
  // Function replacer so "$" sequences in the markup are inserted literally.
  await fs.writeFile(path.join(root, "dist", file), html.replace(marker, () => `<div id="root">${appHtml}</div>`));
  console.log(`prerender: wrote ${url} into dist/${file} (${(appHtml.length / 1024).toFixed(1)} KB of HTML)`);
}
await fs.rm(ssrDir, { recursive: true, force: true });
