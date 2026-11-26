# Nonise Florist PayFast API Worker

Cloudflare Worker for the two checkout endpoints that the static site cannot
serve:

- `POST /api/payfast/checkout` — builds the signed PayFast form.
- `POST /api/payfast/notify` — PayFast ITN webhook.

The routes in `wrangler.toml` attach it to `noniseflorist.com/api/*`, so the
storefront keeps using relative `/api/...` URLs and no CORS setup is needed.

## Deploy

```bash
npx wrangler login
cd api-worker
npx wrangler deploy
```

Set the PayFast security passphrase once, if the PayFast dashboard has one:

```bash
npx wrangler secret put PAYFAST_PASSPHRASE
```

Optional variables (set in the Cloudflare dashboard or with `wrangler secret`):

| Name | Purpose |
| --- | --- |
| `APP_URL` | Public site URL for PayFast return/cancel links. Defaults to the request origin. |
| `PAYFAST_MERCHANT_ID` | Defaults to `31790723`. |
| `PAYFAST_MERCHANT_KEY` | Defaults to the public merchant key. |
| `PAYFAST_SANDBOX` | `true` sends payments to the PayFast sandbox. |

After deploying, `POST https://noniseflorist.com/api/payfast/checkout` should
return JSON instead of the static host's `405 Method Not Allowed`.

## Order emails

When PayFast confirms a payment (`payment_status=COMPLETE`), the worker posts
the order to the shared My Grafix notification API, which emails the customer
and Nonise. Set the shared secret on this worker:

```bash
npx wrangler secret put ORDER_NOTIFY_SECRET
```

Use the same value on the `mygrafix-dashboard-worker` deployment, and make sure
the Nonise client row exists there (see `add_nonise_client.sql`). `EMAIL_API_URL`
and `EMAIL_CLIENT_ID` are configured in `wrangler.toml`.

Sandbox payments intentionally skip emails so test orders never reach real
customers.
