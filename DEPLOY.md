# Deploy josephchendev.com — Joseph Chen Portfolio

**Domain:** `josephchendev.com` (registered at Namecheap)
**Host:**   Netlify (free tier)
**Status:** All site files + `netlify.toml` are ready. Follow the steps below in order.

> Net result: a pristine portfolio domain with A+ SSL, strict security headers,
> and zero email-sending risk (mass-mail traffic lives on a separate throwaway
> domain — see `joseph-job-hunt/mass_campaign/CONTABO_SETUP.md`).

---

## Step 1 · Deploy the site to Netlify (5 min)

You're logged into Netlify on Chrome — good. Two upload paths; pick one.

### Path A · Drag-and-drop (fastest, no Git needed)

1. In Finder, select the **contents of** `portfolio-joseph-chen/` (open the
   folder and ⌘-A → don't drag the folder itself, drag the files inside).
   - You should be selecting `index.html`, `styles.css`, `script.js`,
     `assets/`, `404.html`, `robots.txt`, `sitemap.xml`, `humans.txt`,
     `site.webmanifest`, `resume.pdf`, **and `netlify.toml`**.
2. Open https://app.netlify.com/drop  in Chrome.
3. Drop the selection onto the upload zone.
4. Netlify gives you a random `*.netlify.app` URL — verify the page renders:
   click around, confirm the avatar loads, confirm `/resume.pdf` opens.

### Path B · Connect a Git repo (recommended long-term)

1. Push `portfolio-joseph-chen/` to a private GitHub repo under your
   Joseph-Chen GitHub account (NOT your real account).
2. Netlify dashboard → **Add new site** → **Import an existing project** →
   GitHub → pick the repo.
3. Build settings (Netlify auto-detects from `netlify.toml`, but verify):
   - Base directory: *(leave empty — repo root is the site root)*
   - Build command: *(empty — pure static)*
   - Publish directory: `.`
4. Click **Deploy site**.

**Privacy note:** before pushing, run inside `portfolio-joseph-chen/`:
```bash
git ls-files | xargs grep -iE "$USER|$(whoami)" 2>/dev/null   # should be empty
```

---

## Step 2 · Wire the custom domain (10 min)

### 2a · Tell Netlify the domain

1. In Netlify → your new site → **Domain management** → **Add a domain**.
2. Enter `josephchendev.com` → Netlify will say *"Check DNS configuration"*.
3. Also add `www.josephchendev.com` as a domain alias.
4. Set **Primary domain** = `josephchendev.com` (apex). Netlify will then
   auto-301 `www → apex` (your `netlify.toml` belt-and-suspenders this too).

### 2b · Tell Namecheap to point at Netlify

You have two choices. **Use Netlify DNS (Option A) — it's simpler and faster.**

#### Option A · Hand DNS over to Netlify (recommended)

1. In Netlify → **Domain management** → click the domain → **Set up Netlify DNS**.
2. Netlify gives you 4 nameservers like:
   ```
   dns1.p07.nsone.net
   dns2.p07.nsone.net
   dns3.p07.nsone.net
   dns4.p07.nsone.net
   ```
3. Log in to Namecheap → Domain List → `josephchendev.com` → **Manage**
   → **Nameservers** → switch to **Custom DNS** → paste the 4 Netlify NS records
   → save.
4. DNS propagation: usually 5–30 min. Check with:
   ```bash
   dig +short NS josephchendev.com
   dig +short josephchendev.com
   ```

#### Option B · Stay on Namecheap BasicDNS

Only do this if you want to keep email/MX records on Namecheap. Otherwise
Option A wins. In Namecheap → Domain List → `josephchendev.com`
→ **Advanced DNS** → add the records Netlify shows under
*"DNS configuration"*. Typically:

| Type     | Host  | Value                                  |
|----------|-------|----------------------------------------|
| ALIAS / CNAME | @ | apex-loadbalancer.netlify.com  *(or the IP Netlify lists)* |
| CNAME    | www   | `<your-site-name>.netlify.app`         |

### 2c · Lock down email on this domain (do this NOW)

Add these in **whichever DNS provider you ended up using**. They tell the
world that **nothing** sends mail from `josephchendev.com`, which protects
the portfolio's domain reputation forever:

| Type | Host                    | Value                                                                    |
|------|-------------------------|--------------------------------------------------------------------------|
| TXT  | `@`                     | `v=spf1 -all`                                                            |
| TXT  | `_dmarc`                | `v=DMARC1; p=reject; rua=mailto:Josephbbob@proton.me; adkim=s; aspf=s`   |
| TXT  | `*._domainkey`          | `v=DKIM1; p=`                                                            |

Mass mailing happens from a *separate* throwaway domain. Never break this
rule, or one bad campaign will tank `josephchendev.com`'s deliverability
reputation for any future use.

---

## Step 3 · Confirm SSL + Headers (5 min)

Once DNS resolves to Netlify, SSL provisions automatically (Let's Encrypt).

In Netlify → **Domain management** → **HTTPS**:

1. Wait until **"HTTPS"** shows a green check (1–10 min after DNS propagates).
2. Click **Verify DNS configuration** if it doesn't auto-detect.
3. Click **Force HTTPS** (toggle on).

Then verify everything from your laptop:

```bash
# 1. Page loads, follows HTTPS, returns 200
curl -ILs https://josephchendev.com | head -1

# 2. www → apex redirect is 301
curl -ILs https://www.josephchendev.com | grep -iE 'location|HTTP/'

# 3. Security headers are present
curl -ILs https://josephchendev.com \
  | grep -iE 'strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy'

# 4. SEO endpoints
curl -s https://josephchendev.com/sitemap.xml | head -3
curl -s https://josephchendev.com/robots.txt
curl -ILs https://josephchendev.com/resume.pdf | head -3

# 5. Netlify-specific debug
curl -ILs https://josephchendev.com | grep -i 'x-nf-request\|server'
```

Expected: every header from `netlify.toml` appears in the live response.
If any are missing, your `netlify.toml` didn't deploy — re-upload.

---

## Step 4 · Submit to search + monitoring (10 min)

### Google Search Console
1. https://search.google.com/search-console → Add property → URL prefix
   → `https://josephchendev.com/`.
2. Verify with **HTML tag** method: copy the `<meta name="google-site-verification" ...>`
   tag, paste it into `index.html` `<head>` (right after `<meta name="referrer">`),
   redeploy, click Verify.
3. Once verified, **Sitemaps** → submit `https://josephchendev.com/sitemap.xml`.
4. **URL Inspection** → enter the homepage URL → **Request indexing**.

### Bing Webmaster Tools
1. https://www.bing.com/webmasters → Add site → import from Search Console
   (one click; reuses Google's verification).
2. Submit the same sitemap.

### Uptime monitoring (free)
- **UptimeRobot** (https://uptimerobot.com) → free tier monitors every 5 min.
  Add: `https://josephchendev.com/` and `https://josephchendev.com/resume.pdf`.
  Notify Joseph proton email.

### Optional: privacy-respecting analytics
Two cookieless options that don't trigger consent banners:
- **Plausible** (paid, $9/mo): uncomment the `<script>` in `index.html` line 473.
- **Cloudflare Web Analytics** (free): uncomment the `<script>` line 475
  after creating a token at https://dash.cloudflare.com/?to=/:account/web-analytics.

If you enable either, also update `connect-src` in `netlify.toml`'s CSP to
allow the analytics endpoint.

---

## Step 5 · Lighthouse + final checks (10 min)

Run from Chrome DevTools → **Lighthouse** tab → **Mobile + Desktop**.

Target scores (this site should easily hit them):

| Category         | Target | Notes |
|------------------|--------|-------|
| Performance      | 95+    | LCP < 2.0 s, CLS < 0.05, INP < 200 ms |
| Accessibility    | 100    | Already audited |
| Best Practices   | 100    | HTTPS, no console errors, no mixed content |
| SEO              | 100    | Title, description, canonical, robots all set |

External tests (do these too):
- https://pagespeed.web.dev/?url=josephchendev.com
- https://www.ssllabs.com/ssltest/?d=josephchendev.com  → target **A+**
- https://securityheaders.com/?q=josephchendev.com    → target **A** (B+ acceptable)
- https://www.opengraph.xyz/url/https%3A%2F%2Fjosephchendev.com
- https://search.google.com/test/rich-results?url=josephchendev.com  → confirm Person + WebSite + ProfessionalService schemas
- https://search.google.com/test/mobile-friendly?url=josephchendev.com

---

## Step 6 · Final pre-flight checklist

- [ ] Site deployed to Netlify, custom domain attached
- [ ] Namecheap NS records updated (or DNS records added)
- [ ] DNS propagated: `dig +short josephchendev.com` returns Netlify IPs
- [ ] HTTPS works on **both** `josephchendev.com` and `www.josephchendev.com`
- [ ] `www → apex` returns **301** (not 302, not 200)
- [ ] HTTP → HTTPS auto-upgrade works (`curl -I http://josephchendev.com`)
- [ ] Security headers present (HSTS, CSP, X-Frame-Options, etc.)
- [ ] SPF `v=spf1 -all` published — confirms NO mail sends from this domain
- [ ] DMARC `p=reject` published
- [ ] `https://josephchendev.com/sitemap.xml` returns 200, valid XML
- [ ] `https://josephchendev.com/robots.txt` returns 200
- [ ] `https://josephchendev.com/resume.pdf` opens inline (not download)
- [ ] OG image preview works on Twitter/LinkedIn (use opengraph.xyz)
- [ ] Lighthouse: 95+ across the board
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] UptimeRobot configured

---

## What `netlify.toml` already does for you

You don't need to add `_headers` or `_redirects` files separately — `netlify.toml`
covers everything. Specifically:

- **HSTS preload-eligible** — 2 years, includeSubDomains.
- **CSP** — `default-src 'self'`, no inline JS, only Google Fonts allowed externally.
- **Permissions-Policy** — disables FLoC/cohorts, camera, mic, geolocation, etc.
- **Cross-Origin-{Opener,Resource}-Policy** — defence in depth.
- **Asset caching** — `/assets/*` cached 1 year (immutable), HTML never cached.
- **`/cv` → `/resume.pdf`** — friendly redirect for sharing.
- **www → apex** — explicit 301 even if Netlify domain UI changes.
- **404** — custom branded page in `404.html`.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` | Netlify SSL not provisioned yet | Wait 5–10 min after DNS resolves. |
| Headers missing in `curl -I` | `netlify.toml` didn't upload | Re-deploy; confirm file is in repo root or upload bundle. |
| `www.josephchendev.com` returns 404 | Domain alias not added | Netlify → Domain management → add `www.` alias. |
| OG image broken on Twitter | Cache | Use Twitter Card Validator to force re-scrape. |
| Search Console says "Couldn't fetch" | DNS not yet visible to Google | Wait an hour; retry. |
| CSP blocks Plausible/CF analytics | `connect-src` too tight | Add the analytics origin to `connect-src` in `netlify.toml`. |

---

## Alternative deployment paths (kept for reference)

### Cloudflare Pages
If Netlify ever bills you or rate-limits, Cloudflare Pages is a drop-in
replacement (free, faster CDN). Same files; create a Pages project,
upload, point DNS, done. The `netlify.toml` translates roughly 1:1 to a
`_headers` + `_redirects` pair if you migrate.

### Self-host on Contabo VPS
Only if you want one box for everything (NOT recommended — couples portfolio
uptime to mail-server reputation). Outline:

```bash
apt update && apt install -y nginx certbot python3-certbot-nginx
mkdir -p /var/www/josephchendev.com
rsync -avz portfolio-joseph-chen/ root@<vps-ip>:/var/www/josephchendev.com/
# Nginx config + certbot — see git history of this file for the full snippet.
certbot --nginx -d josephchendev.com -d www.josephchendev.com --redirect --hsts
```

DNS would then be `A` + `AAAA` records pointing at the Contabo IPs instead
of Netlify CNAMEs.
