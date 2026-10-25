// Byte ranges for the self-hosted «Aprende» videos (ADR-021). Cloudflare's static assets answer every request
// with 200 and the whole file, and no Accept-Ranges; Safari on iPhone won't play an MP4 without 206 responses.
// wrangler.jsonc routes only /aprende/*.mp4 here; pages never pass through this code.
import type { Env } from './index.ts';

const RANGE = /^bytes=(\d*)-(\d*)$/;

export async function serveVideo(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  // Ask the assets layer for the whole file (it ignores Range anyway), then cut the slice here.
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: 'GET' }));
  if (!asset.ok) return asset;
  const headers = new Headers(asset.headers);
  headers.set('Accept-Ranges', 'bytes');

  const range = request.headers.get('Range')?.trim();
  const m = range ? RANGE.exec(range) : null;
  // No Range, or one we don't serve (several ranges at once): the whole file, as the HTTP spec allows.
  if (!m || (m[1] === '' && m[2] === '')) {
    return new Response(request.method === 'HEAD' ? null : asset.body, { status: 200, headers });
  }

  const body = await asset.arrayBuffer();
  const size = body.byteLength;
  const start = m[1] === '' ? Math.max(0, size - Number(m[2])) : Number(m[1]);
  const end = m[1] === '' || m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}`, 'Accept-Ranges': 'bytes' } });
  }
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(request.method === 'HEAD' ? null : body.slice(start, end + 1), { status: 206, headers });
}
