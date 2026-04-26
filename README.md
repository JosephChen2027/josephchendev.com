# Joseph Chen — Portfolio Site

A single-page Web3-developer portfolio. Pure HTML / CSS / vanilla JS — zero build step.

## Files

```
portfolio-joseph-chen/
├── index.html          # main page (full SEO + JSON-LD)
├── 404.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── humans.txt
├── site.webmanifest
├── netlify.toml        # Netlify host config: headers, redirects, caching
├── resume.pdf          # mirror of joseph-job-hunt/resume/joseph_chen_resume.pdf
├── DEPLOY.md           # step-by-step Netlify deploy + DNS guide
├── SEO_NOTES.md
├── assets/
│   ├── avatar.webp     # 720×720 hero portrait (primary, ~30 KB)
│   ├── avatar.png      # 720×720 PNG fallback
│   ├── og-image.jpg    # 1200×1200 social preview
│   ├── favicon-32.png
│   ├── favicon-96.png
│   └── apple-touch-icon.png
└── README.md
```

## Featured projects

- **SecureFlow** — AI smart-contract scanner / B2B security questionnaire SaaS

## Contact

`Josephbbob@proton.me`

## Run locally

```bash
cd portfolio-joseph-chen
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

**Live target:** https://josephchendev.com — hosted on Netlify (free tier).

See `DEPLOY.md` for the full step-by-step guide (DNS, SSL, headers, search
console). The short version:

1. Drag the contents of this folder onto https://app.netlify.com/drop
2. Add `josephchendev.com` as a custom domain in Netlify's domain UI
3. Switch Namecheap nameservers to Netlify DNS (or add the CNAMEs Netlify shows)
4. Wait 5–30 min for SSL to provision

`netlify.toml` already defines security headers (HSTS, CSP, Permissions-Policy),
asset caching, and the `www → apex` 301 redirect — no manual config needed
in the Netlify UI.

If you ever change the canonical domain, search-replace `josephchendev.com`
across the entire workspace (it appears in `index.html`, `sitemap.xml`,
`robots.txt`, `humans.txt`, `netlify.toml`, plus the `joseph-job-hunt/`
outreach scripts and resume).

## SEO checklist already in place

- Canonical URL, robots meta, semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Open Graph + Twitter card with 1200×1200 image
- JSON-LD: `Person`, `WebSite`, `ProfessionalService`, `ItemList` with `SoftwareApplication` entry for SecureFlow
- `robots.txt` + `sitemap.xml` + PWA `site.webmanifest`
- `<picture>` with WebP + PNG fallback, `width`/`height`, `fetchpriority="high"`, image preload
- Font preconnect + preload, deferred JS, accessible focus rings, skip-link, reduced-motion support
