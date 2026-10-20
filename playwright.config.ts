import { defineConfig } from '@playwright/test';

// Accessibility and keyboard tests against the built site (npm run build first).
export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  use: { channel: 'msedge', baseURL: 'http://localhost:4333' },
  webServer: { command: 'npx astro preview --port 4333', url: 'http://localhost:4333', reuseExistingServer: false },
});
