// Serves a built dist/ over HTTP/2 + TLS with Brotli, close to how Cloudflare delivers the site, so Lighthouse's
// simulated load can be compared between builds without deploying (HTTP/1.1 previews overprice every request).
//   node scripts/h2-serve.mjs <dist-dir> <port>   (self-signed cert: run Lighthouse with --ignore-certificate-errors)
import http2 from 'node:http2';
import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';
import { tmpdir } from 'node:os';

const [dir = 'dist', port = '4443'] = process.argv.slice(2);
const root = resolve(dir);
const certDir = join(tmpdir(), 'auranova-h2-cert');
if (!existsSync(join(certDir, 'cert.pem'))) {
  mkdirSync(certDir, { recursive: true });
  execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '30', '-subj', '/CN=localhost',
    '-keyout', join(certDir, 'key.pem'), '-out', join(certDir, 'cert.pem')], { stdio: 'ignore' });
}
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain',
  '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4',
};
const compressible = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.webmanifest', '.txt']);
const cache = new Map();

const server = http2.createSecureServer({ key: await readFile(join(certDir, 'key.pem')), cert: await readFile(join(certDir, 'cert.pem')) });
server.on('sessionError', () => {});
server.on('stream', async (stream, headers) => {
  stream.on('error', () => {});
  let path = decodeURIComponent(new URL(headers[':path'], 'https://x').pathname);
  let file = join(root, path);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch {
    file = join(root, '404.html');
  }
  try {
    const ext = extname(file);
    const br = compressible.has(ext) && /\bbr\b/.test(headers['accept-encoding'] ?? '');
    const key = `${file}|${br}`;
    if (!cache.has(key)) {
      const raw = await readFile(file);
      cache.set(key, br ? brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }) : raw);
    }
    stream.respond({ ':status': 200, 'content-type': types[ext] ?? 'application/octet-stream', ...(br ? { 'content-encoding': 'br' } : {}) });
    stream.end(cache.get(key));
  } catch {
    stream.respond({ ':status': 404 });
    stream.end();
  }
});
server.listen(Number(port), () => console.log(`https://localhost:${port}/ → ${root}`));
