# Nonise Florist

Pietermaritzburg's heartfelt floral boutique led by Mrs. Nokwanda Mthembu — fresh bouquets, rose arrangements, weddings, events, and floral gifting.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Express (production server)

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values you need.

3. Run the app:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production server
- `npm run preview` — preview the production build
- `npm run lint` — type-check the project

## Content Notes

- Product photos and product names are kept in sync: the primary image file is named after the product slug (e.g. `spring-garden-hatbox.webp` for "Spring Garden Hatbox").
- The gallery currently reuses every product photo. If the florist prefers those images to appear only on product pages, set `INCLUDE_CATALOGUE_IN_GALLERY = false` in `src/data/noniseData.ts`.

## Environment Variables

| Variable | Description |
| --- | --- |
| `APP_URL` | Public URL where the app is hosted. Used for self-referential links and callbacks. |
| `INSTAGRAM_ACCESS_TOKEN` | Server-side long-lived access token for the `@nonise.florist` Instagram Professional account. |
| `INSTAGRAM_USER_ID` | Optional Instagram User / Business Account ID. Defaults to `me`. |
| `INSTAGRAM_API_HOST` | `instagram` (default) for `graph.instagram.com`, or `facebook` for `graph.facebook.com`. |
| `PAYFAST_MERCHANT_ID` | PayFast merchant ID. Defaults to the Nonise Florist account. |
| `PAYFAST_MERCHANT_KEY` | PayFast merchant key (public, posted in the payment form). |
| `PAYFAST_PASSPHRASE` | Optional security passphrase from the PayFast dashboard. Set this if the account has one. |
| `PAYFAST_SANDBOX` | `true` sends payments to the PayFast sandbox instead of live. |

## Payments

Checkout redirects to PayFast with a signed payment request (`POST /api/payfast/checkout`). PayFast reports the result to `POST /api/payfast/notify`, which verifies the signature, re-validates the payload with PayFast, and writes the paid order to the server log. There is no order database yet, so reconcile paid orders from the log (or ask the customer to send the order summary via WhatsApp/email, as the confirmation page prompts).
