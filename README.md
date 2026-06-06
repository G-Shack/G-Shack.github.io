# www.kanch.app — Kanch marketing site

Static landing + legal pages for **Kanch — Glass Invoice Maker**, served via
GitHub Pages at https://www.kanch.app/. The web app itself lives at
https://app.kanch.app.

## Structure
- `index.html` — landing page (built on the Kanch design system).
- `privacy.html`, `terms.html`, `support.html` — legal / support pages.
- `kanch-shared.css` — shared styles for the legal/support pages.
- `design-system/` — brand tokens (`colors_and_type.css`) + logo assets.
- `site.webmanifest`, `CNAME`, `.nojekyll` — Pages / PWA config.

## Deploy
Push to `main` — GitHub Pages builds and publishes automatically. `CNAME` pins
the `www.kanch.app` custom domain; `.nojekyll` disables Jekyll processing.
