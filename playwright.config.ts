import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:5612',
    viewport: { width: 1500, height: 940 },
    trace: 'off',
    screenshot: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx vite --host 127.0.0.1 --port 5612 --strictPort',
    url: 'http://127.0.0.1:5612',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
