// Injects the server-rendered home page into dist/index.html so the content
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

const appHtml = render("/");
// Function replacer so "$" sequences in the markup are inserted literally.
await fs.writeFile(indexPath, template.replace(marker, () => `<div id="root">${appHtml}</div>`));
await fs.rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: wrote / into dist/index.html (${(appHtml.length / 1024).toFixed(1)} KB of HTML)`);
