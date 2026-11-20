import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/nonise.florist/';
const INSTAGRAM_HANDLE = '@nonise.florist';
const DEFAULT_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface RawInstagramMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
}

interface InstagramMediaItem {
  id: string;
  imageUrl: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  alt: string;
  timestamp?: string;
}

interface InstagramCacheEntry {
  fetchedAt: number;
  posts: InstagramMediaItem[];
}

let instagramCache: InstagramCacheEntry | null = null;

function sanitizeAlt(caption?: string): string {
  if (!caption) return 'Floral arrangement shared on Nonise Florist Instagram';
  const singleLine = caption.replace(/\s+/g, ' ').trim();
  return singleLine.length > 140 ? `${singleLine.slice(0, 137)}...` : singleLine;
}

function mapMediaItems(rawItems: RawInstagramMedia[]): InstagramMediaItem[] {
  const mapped: InstagramMediaItem[] = [];
  for (const item of rawItems) {
    const isVideo = item.media_type === 'VIDEO';
    const imageUrl = isVideo ? item.thumbnail_url || item.media_url : item.media_url;
    if (!imageUrl || !item.permalink) continue;

    const normalizedType: InstagramMediaItem['mediaType'] =
      item.media_type === 'VIDEO'
        ? 'VIDEO'
        : item.media_type === 'CAROUSEL_ALBUM'
        ? 'CAROUSEL_ALBUM'
        : 'IMAGE';

    mapped.push({
      id: item.id,
      imageUrl,
      permalink: item.permalink,
      mediaType: normalizedType,
      alt: sanitizeAlt(item.caption),
      timestamp: item.timestamp,
    });
  }
  return mapped.slice(0, 6);
}

async function fetchOfficialInstagramMedia(): Promise<
  | { status: 'connected'; posts: InstagramMediaItem[]; cached: boolean }
  | { status: 'unconfigured'; posts: [] }
  | { status: 'error'; reason: 'token_expired' | 'unavailable'; posts: [] }
> {
  const accessToken = (process.env.INSTAGRAM_ACCESS_TOKEN || '').trim();
  if (!accessToken) {
    return { status: 'unconfigured', posts: [] };
  }

  const cacheTtlMs = Number(process.env.INSTAGRAM_CACHE_TTL_MS || DEFAULT_CACHE_TTL_MS);
  if (instagramCache && Date.now() - instagramCache.fetchedAt < cacheTtlMs) {
    return { status: 'connected', posts: instagramCache.posts, cached: true };
  }

  const userId = (process.env.INSTAGRAM_USER_ID || 'me').trim();
  const apiHost =
    (process.env.INSTAGRAM_API_HOST || '').trim().toLowerCase() === 'facebook'
      ? 'https://graph.facebook.com'
      : 'https://graph.instagram.com';

  const endpoint = new URL(`${apiHost}/v21.0/${encodeURIComponent(userId)}/media`);
  endpoint.searchParams.set(
    'fields',
    'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
  );
  endpoint.searchParams.set('limit', '12');
  endpoint.searchParams.set('access_token', accessToken);

  try {
    const response = await fetch(endpoint.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    const payload = (await response.json()) as {
      data?: RawInstagramMedia[];
      error?: { code?: number; message?: string; type?: string };
    };

    if (!response.ok || payload.error) {
      const errorCode = payload.error?.code;
      const isTokenExpired = errorCode === 190 || response.status === 401;

      if (!isTokenExpired && instagramCache && instagramCache.posts.length > 0) {
        return { status: 'connected', posts: instagramCache.posts, cached: true };
      }

      return {
        status: 'error',
        reason: isTokenExpired ? 'token_expired' : 'unavailable',
        posts: [],
      };
    }

    const posts = mapMediaItems(Array.isArray(payload.data) ? payload.data : []);
    instagramCache = {
      fetchedAt: Date.now(),
      posts,
    };

    return { status: 'connected', posts, cached: false };
  } catch {
    if (instagramCache && instagramCache.posts.length > 0) {
      return { status: 'connected', posts: instagramCache.posts, cached: true };
    }
    return { status: 'error', reason: 'unavailable', posts: [] };
  }
}

async function startServer() {
  const app = express();

  app.get('/api/instagram/media', async (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    const result = await fetchOfficialInstagramMedia();
    res.json({
      ...result,
      profileUrl: INSTAGRAM_PROFILE_URL,
      handle: INSTAGRAM_HANDLE,
    });
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*splat', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nonise Florist server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
