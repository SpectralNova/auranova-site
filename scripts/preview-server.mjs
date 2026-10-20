// Serves dist/ with `astro preview` for the audit scripts (Lighthouse, screenshots).
import { spawn, execSync } from 'node:child_process';

export async function startPreview(port) {
  const server = spawn(`npx astro preview --port ${Number(port)}`, { shell: true, stdio: 'ignore' });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`${base}/`)).ok) return { base, stop: () => stop(server) };
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  stop(server);
  throw new Error('astro preview did not start (run `npm run build` first)');
}

function stop(server) {
  try {
    execSync(process.platform === 'win32' ? `taskkill /pid ${server.pid} /T /F` : `kill ${server.pid}`, { stdio: 'ignore' });
  } catch {}
}
