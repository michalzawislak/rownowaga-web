import type { Page } from '@playwright/test';

/** Zgoda zapisana z góry — baner nie zasłania treści w testach. */
export async function acceptCookiesUpfront(page: Page): Promise<void> {
  await page.addInitScript(() => {
    localStorage.setItem(
      'rownowaga-cookie-consent',
      JSON.stringify({ version: 1, analytics: false, marketing: false, updatedAt: 'test' }),
    );
  });
}

/**
 * Przewija stronę do końca i z powrotem, żeby sekcje z `animate-on-scroll`
 * zdążyły się pokazać. Bez tego są przezroczyste, a audyt dostępności
 * pomija je jako niewidoczne — dokładnie tak umykały błędy kontrastu.
 */
export async function revealAllSections(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 600));
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 400));
  });
  // Animacje wejścia trwają 0,6 s — czekamy, aż kolory się ustabilizują.
  await page.waitForTimeout(800);
}

/** Czeka, aż przeglądarka skończy wczytywać wszystkie obrazy na stronie. */
export async function waitForImages(page: Page): Promise<void> {
  await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, {
    timeout: 15_000,
  });
}
