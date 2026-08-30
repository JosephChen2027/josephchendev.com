# SEO & GEO notes for josephchendev.com

## On-site (done)

- **SEO:** title, description, keywords, canonical, Open Graph, Twitter cards, geo meta (US remote)
- **Structured data:** Person, WebSite, WebPage, ProfilePage, ProfessionalService, FAQPage, ItemList (projects + OSS), education (`alumniOf`, `hasCredential`)
- **GEO:** `llms.txt` at `/llms.txt` — machine-readable summary for AI search (ChatGPT, Perplexity, Claude)
- **robots.txt:** allows Google/Bing + AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
- **sitemap.xml:** homepage, resume.pdf, llms.txt
- **Visible facts block:** About section `identity-facts` dl — name, role, education, location, GitHub, email
- **humans.txt**, **site.webmanifest** — updated to backend positioning

## One-time setup (manual)

1. **Google Search Console** — verify josephchendev.com → submit `https://josephchendev.com/sitemap.xml`
2. **Bing Webmaster Tools** — same sitemap (BingSiteAuth.xml already in repo)
3. **Rich Results Test** — https://search.google.com/test/rich-results?url=https://josephchendev.com
4. **Validate llms.txt** — https://josephchendev.com/llms.txt loads as plain text

## Backlinks (ongoing)

- GitHub profile + all repo READMEs → link josephchendev.com
- Job board profiles (Wellfound, web3.career, etc.) → link site + GitHub
- Each application email → portfolio URL in signature

## GEO tips

- Keep FAQ answers factual and citable (who, what, where, availability)
- When adding projects, update `llms.txt` + JSON-LD ItemList
- AI engines prefer consistent facts across site, GitHub, and resume
