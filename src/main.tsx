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

// `npm run build` prerenders "/" and "/reviews" (scripts/prerender.mjs), so the
// content is visible before this script loads. Hydrate that markup; on the 404
// page (or a build without prerendering) the root is empty, so render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
