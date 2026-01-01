# Proton Radiation Centre — Wireframe Prototype

This workspace contains a simple, brandless wireframe prototype for the Beacon Proton Therapy.

Files added/changed:

-   `index.html` — Refactored main page (open this in your browser)
-   `css/styles.css` — Extracted stylesheet from original file
-   `js/scripts.js` — Extracted JavaScript helpers
-   `Website Skeleton V001.html` — Original backup (unchanged)

How to run (very simple):

1. In Finder or your file browser, double-click `index.html` to open it in your default browser.
2. Alternatively, in a terminal run `open index.html`.

Notes about page fragments and running locally:

-   The site now uses completely separate pages in the project root (e.g. `about.html`, `partners.html`) — each page is a standalone HTML file you can edit independently.
-   Shared navigation and footer are provided by simple web components (`components/nav.js` and `components/footer.js`). Add `<nav-bar></nav-bar>` at the top of a page and `<site-footer></site-footer>` at the bottom; the components use root-level links so no path handling is required.
-   No server is required — open `index.html` directly. Links navigate between actual pages (no iframe).
-   If you prefer a dev server for cleaner URLs, running `python3 -m http.server` is an optional fallback (`http://localhost:8000`).

Notes:

-   No server is required — this is plain HTML/CSS/JS and will work locally.
-   If you want sections split into separate HTML fragments later, I can add a simple client-side include pattern or keep everything in `index.html` for simplicity.

Design tokens & visual guidance:

-   The stylesheet (`css/styles.css`) includes a small set of design tokens at the top (`--color-black`, `--color-white`, `--color-muted`, `--border-color`, `--radius`, `--radius-sm`, `--radius-pill`). Please use those variables for colors, border radii and borders so the site keeps a consistent black-and-white wireframe look across pages.
