# SEO notes for josephchendev.com

## What's already strong

- JSON-LD: `Person`, `WebSite`, `WebPage`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`, `ItemList`
- Open Graph + Twitter Card with 1200×1200 OG image
- Canonical URL, `author`, `keywords`, `robots`, `googlebot` meta tags
- Semantic landmarks, skip-link, focus rings, `prefers-reduced-motion`
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `humans.txt`
- **No GitHub link in schema** — intentional until new Joseph Chen GitHub account is live

## What you still need to do (one-time)

### 1. Add GitHub to JSON-LD (AFTER new account is public)

When you have a new GitHub username (not `SelfLearnedDev2027` — that account is blocked),
add a `sameAs` entry to `index.html`:

```json
"sameAs": [
  "https://github.com/YOUR_NEW_HANDLE"
]
```

Verify the profile loads in incognito before deploying. Broken `sameAs` URLs hurt SEO.

### 2. Search Console + Bing Webmaster

After deployment:

1. **Google Search Console** (https://search.google.com/search-console):
   - Add `https://josephchendev.com/` as a property
   - Verify via DNS TXT record (Cloudflare)
   - Submit `/sitemap.xml`

2. **Bing Webmaster Tools** (https://www.bing.com/webmasters):
   - Same setup, submit sitemap

### 3. Verify rich-result eligibility

- https://search.google.com/test/rich-results?url=josephchendev.com
- https://validator.schema.org/

### 4. Backlinks

- **SecureFlow GitHub README** → link `josephchendev.com`
- **Wellfound, Contra, web3.career** profiles → link your site
- **HN profile** → put `josephchendev.com` in about

Do not pay for backlinks or use spam services.
