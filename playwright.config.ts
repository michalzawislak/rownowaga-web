import { defineConfig, devices } from '@playwright/test';

/*
 * Celowo inny port niż `npm run dev` (4321). Gdyby testy trafiły na serwer
 * deweloperski, sprawdzałyby inny kod niż ten, który trafia na hosting —
 * m.in. obrazy generowane na żądanie zamiast gotowych plików z builda.
 */
const PORT = 4329;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    /*
     * Domyślnie Playwright używa własnej przeglądarki (`npx playwright install
     * chromium`). W środowiskach, które mają już Chromium, można wskazać je
     * zmienną PLAYWRIGHT_CHROMIUM_PATH zamiast pobierać kolejną kopię.
     */
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {},
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  /**
   * Testujemy build produkcyjny, a nie serwer deweloperski — chcemy sprawdzać
   * dokładnie ten HTML i CSS, który trafia na hosting.
   */
  webServer: {
    command: 'npm run build && npm run preview -- --port ' + PORT,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
