# Nonise Florist SEO Analysis

**Audit date:** 23 November 2026  
**Overall score:** **76/100**  
**Scope:** Source code, production build output in `dist/`, route metadata, sitemap, robots file, structured data, and page content. The public website could not be fetched by the audit browser, and no Google Search Console, analytics, backlink, or PageSpeed data was available. This is an on-site implementation score, not a ranking prediction.

## Score breakdown

| Area | Score | Assessment |
|---|---:|---|
| Technical SEO and crawlability | 20/25 | Route prerendering, canonicals, robots file, and sitemap are present. Checkout crawl directives conflict, sitemap dates are generated uniformly, and unknown paths fall back to the homepage. |
| Page titles, descriptions, headings, and URLs | 18/20 | Generated indexable routes have unique titles/descriptions, one H1 each, and descriptive paths. |
| Content and search intent | 13/20 | Product and local service pages target relevant florist searches and answer practical delivery questions. Editorial depth, original advice, and proof of experience can grow. |
| Local SEO | 11/15 | LocalBusiness/Florist data includes address, hours, contact details, service area, and coordinates. Listing accuracy and prominence cannot be verified from the repository. |
| Images and sharing | 8/10 | Descriptive image alt text and dedicated social images are implemented. Image delivery and real-world rendering were not measured. |
| Performance and accessibility signals | 4/5 | The site prerenders HTML and preloads its hero image. No field or lab performance measurement was available. |
| Authority and measurement | 2/5 | No Search Console, analytics, review, citation, or backlink evidence was available for this audit. |
| **Total** | **76/100** | **Strong technical baseline; improve crawl directives, local proof, and measurement.** |

## What is working well

- `scripts/prerender.ts` produces static HTML for each product, collection, landing, and information route, so the initial document contains page content and metadata.
- `src/lib/seo.ts` generates route-specific titles, descriptions, canonical URLs, Open Graph/Twitter metadata, and JSON-LD for local business, products, breadcrumbs, and service landing pages.
- The current production build contains 20 prerendered pages, including checkout. The XML sitemap lists the 19 indexable pages and omits checkout.
- The indexable generated pages inspected each contain one H1 and a unique title and description.
- Focused landing pages cover flower delivery, weddings/events, and funeral/sympathy flowers in Pietermaritzburg.
- Product pages include product name, description, ZAR offer price, availability, and product imagery in structured data.
- Product and gallery image components use descriptive alt-text fields, and social previews have dedicated JPEG images.
- The document uses `lang="en-ZA"`; important site images and fonts are configured with preload/preconnect hints.

## Findings and recommended actions

### High priority

1. **Resolve the checkout crawl/noindex conflict.** `public/robots.txt` disallows `/checkout`, while `seoFor()` sets the checkout page to `noindex, nofollow`. A crawler blocked by robots.txt cannot read the page-level noindex, so the URL could still appear as a bare result if discovered elsewhere. Permit crawling of the checkout route so the noindex can be read, or enforce a server-side `X-Robots-Tag` that is visible when crawled. Keep checkout out of the sitemap. See [Google’s robots meta tag guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

2. **Correct sitemap `lastmod` values.** `writeSitemap()` assigns the current build date to every URL. This signals that all pages changed on every build, even if their content did not. Use each page’s actual significant modification date or omit `lastmod` when that date is not tracked. See [Google’s sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps) and [Google’s explanation of meaningful `lastmod` dates](https://developers.google.com/search/help/office-hours/2023/january).

3. **Return a real 404 for unknown URLs.** `parseRoute()` maps unknown paths to the home route. If the server returns that page with HTTP 200 for arbitrary paths, search engines may treat those URLs as soft 404s and users receive a misleading homepage. Confirm hosting behavior; render a proper not-found page and HTTP 404 for unknown routes.

4. **Validate live indexing and structured data.** Submit the sitemap in Google Search Console, inspect representative product and landing URLs, and review Product/LocalBusiness enhancements. Source markup is promising, but it does not prove Google can fetch the deployed pages or that the data passes current rich-result checks. Google recommends product markup on single-product pages and notes that the initial HTML is preferable for merchant pages; this site already prerenders its markup. See [Product structured data guidance](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).

### Medium priority

5. **Verify business facts against real listings.** Confirm the address, phone, hours, coordinates, delivery area, and business name match the Google Business Profile and major local directories exactly. The repository contains a single `sameAs` profile (Instagram); add authoritative profiles only when they genuinely belong to the business. Local structured data helps describe a business but does not replace profile verification. See [Google LocalBusiness structured data guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).

6. **Substantiate reputation statements.** `BRAND_STORY.reputation` says the business has a five-star rating. Ensure this statement is accurate and supported by a real, current source before keeping it prominent. Do not add `AggregateRating` markup unless the ratings are genuine, visible on the site, and compliant with Google’s review guidelines.

7. **Expand useful, original content.** Consider practical, locally grounded guidance such as flower-care instructions, wedding consultation details, delivery cut-off guidance, and seasonal South African flower options. Build content from actual business expertise and link it to relevant services/products; avoid thin near-duplicate suburb pages. Google emphasizes useful, original, up-to-date content in its [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

### Follow-up measurement

8. **Measure live site speed and mobile experience.** Run PageSpeed Insights for the home, a product, and a service landing page; check field Core Web Vitals in Search Console where data exists. The source includes preloading and responsive image variants, but no measured Core Web Vitals are part of this score. A performance score alone does not guarantee ranking improvements; use it to identify user-facing problems. See [Google’s page experience overview](https://developers.google.com/search/docs/appearance/page-experience).

9. **Establish a baseline.** In Search Console, record indexed pages, sitemap status, queries, clicks, impressions, and enhancement errors. Track calls, WhatsApp clicks, and completed orders in analytics if consent and privacy setup allow. Review after changes rather than inferring impact from code alone.

## Audit limitations

- The public domain could not be accessed with the audit browser, so HTTP status codes, redirects, deployed `robots.txt`/sitemap, rendered mobile behavior, and deployed headers were not verified.
- No Google Search Console or analytics property was connected. Index coverage, rankings, clicks, conversions, and manual actions are unknown.
- No live backlink/citation review, PageSpeed Insights run, or Rich Results Test run was available.
- The score rates repository and generated-page SEO readiness only. It is not a guarantee of search visibility or traffic.
