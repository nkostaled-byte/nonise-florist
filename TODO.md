# Nonise Florist — Website TODO & Status

Last updated: 25 November 2026

Legend: `[x]` done · `[ ]` still open

## 1. Homepage & Website Gallery

- [x] Category photographs match their products (4 specialty cards: Box Arrangements, Rose Bouquets, Hampers, Funeral Flowers).
- [x] “Let Beauty Bloom” added above the logo on the homepage hero.
- [x] Gallery categories match the product groups: Rose Bouquets, Mixed Bouquets, Protea Bouquets, Vase Arrangements, Box Arrangements, Gift Hampers, Funeral & Sympathy, Weddings & Events.
- [x] Gallery now shows 108 photos, including the 83 new catalogue photos.
- [x] Gallery lightbox opens centred on screen with body scroll locked.
- [x] Homepage hero photograph — client-supplied `hero.jpg` converted to WebP (1312px + 640px) and used in the hero.
- [x] Removed the day/night cursor reveal, all mouse tracking and the floating rose petals from the hero; it is now a static photo hero.

## 2. Product Categories & Floral Portfolio

- [x] Product titles matched to their photographs (8 legacy titles corrected, 83 new products named from their photos).
- [x] Vase arrangements grouped in their own category (17 products, 19 gallery photos).
- [x] Box arrangements grouped in their own category (10 products, 18 gallery photos).
- [x] Funeral arrangements included in the floral portfolio (8 funeral flowers + 3 funeral packages + curated sympathy photos).
- [x] Gallery category renamed “Flower Boxes” → “Box Arrangements” to match the shop and client wording.
- [ ] Client sign-off on the 83 new product names and blurbs, especially the funeral package wording.

## 3. Custom Bouquets & Hampers

- [x] Dedicated custom bouquets page at `/custom-bouquets`, with design gallery, how-it-works copy and enquiry CTA.
- [x] Homepage “Custom Bouquets & Hampers” section linking to the custom page and the hamper collection.
- [x] Dedicated hampers collection at `/collections/hampers` (17 hamper products).
- [x] Customers can browse different bouquet and hamper designs (91 products + 108 gallery photos).
- [ ] Optional: send 3–6 custom-only photos or starting prices if the florist wants examples beyond the existing product photography.

## 4. Roses — Sizes & Prices

- [x] More rose photography (15 rose products, 12 new).
- [x] Rose size and price comparison table added to the Rose Bouquets shop view.
- [x] Sizes displayed: 10, 15, 20, 30, 40, 50 and 100 roses.
- [x] Two price rows from the client price list; the price is the same for every colour:
  - Roses: R250 / R400 / R500 / R750 / R1,000 / R1,250 / R2,500
  - Roses with Gyp: R350 / R500 / R600 / R900 / R1,200 / R1,500 / R3,000
- [x] Customer picks Red, White, Pink or Mixed at the same price; the colour travels through the cart, checkout, PayFast description and order confirmation.
- [x] “Also available” line: mixed bouquets from R200, flower boxes from R650, romantic hampers from R850, foil balloons R50.
- [x] Selecting a colour and price adds that exact rose size to the shopping bag, with checkout handled by the normal cart.
- [x] All 14 rose-size options are cart products driven by the table, so the rose grid does not repeat the same options twice.

## 5. Add-ons Before Checkout

- [x] Add-ons offered at checkout: Champagne (from R950), Chocolates (from R300), Wine (from R550), Balloons (R50), Dry flower petals (R35).
- [x] Each add-on is a toggle in the checkout order summary and updates the estimated total instantly.
- [x] Selected add-ons appear on the confirmation screen and in the WhatsApp/email order summary.
- [ ] Confirm final brands and sizes, and whether the “from” prices should remain as the base amounts.

## 6. Event Flowers & Centrepieces

- [x] Events page hero replaced with the real wedding tablescape photograph.
- [x] Event centrepieces included in a dedicated portfolio grid (6 photos).
- [x] Grouped vase arrangements included for event tables.
- [x] Special arrangements for weddings, ceremonies, receptions and corporate events.
- [x] Initially provided table-arrangement photos included (wedding tablescape + baby-shower centrepiece).
- [x] Events page related products now show event-appropriate vase arrangements.
- [ ] Confirm whether event packages should have published prices or remain quote-only.

## 7. Social Media Integration

- [x] Instagram feed removed from the homepage.
- [x] Homepage replaced with a socials section for Instagram, TikTok and Facebook.
- [x] Instagram, TikTok and Facebook icons added to the footer.
- [x] Links added:
  - Instagram: https://www.instagram.com/nonise.florist/
  - TikTok: https://www.tiktok.com/@nonise.florist
  - Facebook: https://www.facebook.com/p/Nonise-Florist-61584167942723/
- [x] Unused Instagram feed API endpoint removed from the server.

## 8. About Us

- [x] Nokwanda’s approved photograph added to the founder/profile section.
- [x] Photograph converted to WebP with a 640px responsive version.
- [x] Existing mission, vision and brand-story copy retained.

## 9. Dashboard-Managed Products (in progress)

- [x] Products save straight to Supabase from the business dashboard (`PUT /api/dashboard/products/:id`); saving never triggers a site build.
- [x] One "Publish changes" button starts a single build for all pending edits, with a 2-minute debounce (`POST /api/publish`, `client_sites` table).
- [x] Inventory-only accounts are gated by `clients.website_url` and never see the publish control.
- [x] Storefront columns added to `products`: `slug`, `description`, `whats_included` (`add_product_storefront_columns.sql`).
- [x] Dashboard product form can set slug, description and what's included.
- [ ] **Seed the catalogue.** Insert the 91 products into Supabase with their existing slugs copied verbatim from `src/data/noniseData.ts`. Do not derive slugs from names — that breaks every indexed URL.
- [ ] **Seed script: photo upload + `image_url` in one pass.** For each product, upload `public/assets/nonise/<slug>.webp` to R2 at `clients/nonise-florist/products/<slug>.webp` and set `image_url = <R2_PUBLIC_URL>/clients/nonise-florist/products/<slug>.webp` on the inserted row. Use the R2 S3 API (`@aws-sdk/client-s3`) with R2 credentials rather than `/api/upload`, because that endpoint needs a Supabase login and the Nonise client row has `auth_user_id = NULL`. Deterministic keys (`<slug>.webp`, not a UUID) keep the script re-runnable.
- [ ] **Storefront reads the API.** `scripts/prerender.ts` should fetch `/api/public/site?clientId=nonise-florist` at build time and generate product pages and `sitemap.xml` from it, falling back to the hardcoded `PRODUCTS` list if the API is empty or unreachable. Product URLs stay `/product/<slug>`.
- [ ] Replace `select=*` in `GET /api/public/site` with a column allowlist so `cost_price`, `stock_qty`, `low_stock_warning` and `barcode` stop being public.
- [ ] Serve product images through Cloudflare image transforms (`/cdn-cgi/image/width=640,format=webp/...`) so R2 originals are not shipped at full size; use a 1200x630 JPEG transform for the OG image.
- [ ] Add a `_headers` file (or Worker rule) giving `/assets/*` a real `Cache-Control`, instead of the default `max-age=0, must-revalidate`.

## What Is Still Needed From the Client

1. **Add-ons** — confirm brands/sizes and whether the “from” prices should remain the base amounts charged.
2. **Event packages** — published pricing or quote-only confirmation.
3. **Product sign-off** — approve the 83 new product names and blurbs, especially the funeral packages.
4. **Gallery scope** — confirm the 83 product photos should stay in the gallery. They can be hidden with `INCLUDE_CATALOGUE_IN_GALLERY = false` in `src/data/noniseData.ts`.
5. **Custom bouquet examples** — optional custom-only photos or starting prices if the current product photography is not enough.

## Implementation Notes

- 91 products and 108 gallery photos in total.
- 14 rose-size cart options are generated from the studio price list and are bought from the comparison table.
- `npm run lint` and `npm run build` pass.
- Product image filenames match product slugs.
- Legacy collection URLs redirect to the renamed categories.
