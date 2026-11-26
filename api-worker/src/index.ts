import { buildCheckout, handleNotify, payfastConfig } from '../../src/lib/payfast';

interface Env {
  APP_URL?: string;
  PAYFAST_MERCHANT_ID?: string;
  PAYFAST_MERCHANT_KEY?: string;
  PAYFAST_PASSPHRASE?: string;
  PAYFAST_SANDBOX?: string;
}

function methodNotAllowed() {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/payfast/checkout') {
      if (request.method !== 'POST') return methodNotAllowed();

      let body: Record<string, unknown> = {};
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        body = {};
      }

      const origin = (env.APP_URL || url.origin).replace(/\/+$/, '');
      const result = buildCheckout(body, origin, payfastConfig(env as Record<string, unknown>));
      return Response.json(result.body, { status: result.status });
    }

    if (url.pathname === '/api/payfast/notify') {
      if (request.method !== 'POST') return methodNotAllowed();

      const contentType = request.headers.get('content-type') ?? '';
      let body: Record<string, unknown> = {};
      if (contentType.includes('application/json')) {
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          body = {};
        }
      } else {
        body = Object.fromEntries(new URLSearchParams(await request.text()));
      }

      const result = await handleNotify(body, payfastConfig(env as Record<string, unknown>));
      return new Response(result.body, { status: result.status });
    }

    return new Response('Not Found', { status: 404 });
  },
};
