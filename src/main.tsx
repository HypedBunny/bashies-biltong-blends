import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// `npm run build` prerenders the home page into index.html (scripts/prerender.mjs),
// so the content is visible before this script loads. Hydrate that markup on "/";
// on any other path (or a build without prerendering) render from scratch.
if (container.hasChildNodes() && window.location.pathname === "/") {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
