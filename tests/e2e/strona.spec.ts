import { test, expect } from '@playwright/test';
import { acceptCookiesUpfront, revealAllSections, waitForImages } from './helpers';

test('kotwice w nawigacji prowadzą na stronę główną także z podstron', async ({ page }) => {
  await acceptCookiesUpfront(page);
  await page.goto('/polityka-prywatnosci');

  const ctaLinks = page.locator('nav a', { hasText: 'Umów konsultację' });
  const count = await ctaLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i += 1) {
    const href = await ctaLinks.nth(i).getAttribute('href');
    expect(href, 'CTA nie może wskazywać kotwicy, której nie ma na tej stronie').not.toBe(
      '#kontakt',
    );
    expect(href).toMatch(/\/#kontakt$/);
  }
});

test('wszystkie kotwice na stronie głównej mają swój cel', async ({ page }) => {
  await acceptCookiesUpfront(page);
  await page.goto('/');

  const missing = await page.evaluate(() =>
    [...document.querySelectorAll('a[href*="#"]')]
      .map((a) => new URL((a as HTMLAnchorElement).href))
      .filter((url) => url.origin === location.origin && url.pathname === location.pathname)
      .map((url) => url.hash.slice(1))
      .filter((id) => id && !document.getElementById(id)),
  );

  expect(missing).toEqual([]);
});

test('obrazy się ładują i mają tekst alternatywny', async ({ page }) => {
  await acceptCookiesUpfront(page);
  await page.goto('/');
  await revealAllSections(page);
  await waitForImages(page);

  const problems = await page.evaluate(() =>
    [...document.images]
      .filter((img) => !(img.complete && img.naturalWidth > 0) || img.alt === null)
      .map((img) => img.currentSrc || img.src),
  );

  expect(problems).toEqual([]);
});

test('FAQ rozwija się i trzyma otwarte jedno pytanie', async ({ page }) => {
  await acceptCookiesUpfront(page);
  await page.goto('/');

  const items = page.locator('#faq details');
  await items.first().locator('summary').click();
  await expect(items.first()).toHaveAttribute('open', '');

  await items.nth(1).locator('summary').click();
  await expect(items.nth(1)).toHaveAttribute('open', '');
  await expect(items.first()).not.toHaveAttribute('open', '');
});

test('menu mobilne otwiera się, zamyka Escape i oddaje fokus', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'dotyczy tylko widoku mobilnego');
  await acceptCookiesUpfront(page);
  await page.goto('/');

  const button = page.locator('#mobile-menu-button');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(button).toBeFocused();
});

test('menu mobilne niesie kontakt i blokuje przewijanie tła', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'dotyczy tylko widoku mobilnego');
  await acceptCookiesUpfront(page);
  await page.goto('/');
  /*
   * `behavior: 'instant'` omija `scroll-behavior: smooth` ze stylów — inaczej
   * przewijanie trwa jeszcze w chwili kliknięcia i test mierzy ruchomy cel.
   */
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await page.waitForFunction(() => window.scrollY === 600);

  await page.locator('#mobile-menu-button').click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();

  // Numer i status otwarcia to powód, dla którego panel w ogóle powstał.
  await expect(menu.locator('a[href^="tel:"]')).toBeVisible();
  await expect(page.locator('#menu-opening-status')).toHaveText(
    /Teraz otwarte|Dziś otwarte od|Zamknięte/,
  );

  // Panel zasłania stronę, więc pasek telefoniczny nie ma się z czym licytować.
  await expect(page.locator('.sticky-call-cta')).toBeHidden();

  // Tło stoi w miejscu, a po zamknięciu wraca tam, gdzie było.
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(200);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  expect(await page.evaluate(() => window.scrollY)).toBe(600);
});

test('przyklejone CTA telefoniczne jest widoczne także przy banerze cookies', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'pasek pokazuje się tylko na mobile');
  await page.goto('/');

  await expect(page.locator('#cookie-consent')).toBeVisible();
  const cta = page.locator('.sticky-call-cta');
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', /^tel:/);
});

test('baner cookies zapamiętuje decyzję', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Tylko niezbędne' }).click();
  await expect(page.locator('#cookie-consent')).toBeHidden();

  await page.reload();
  await expect(page.locator('#cookie-consent')).toBeHidden();
});

test('bez zgody nie leci żadne żądanie do Google', async ({ page }) => {
  const googleRequests: string[] = [];
  page.on('request', (request) => {
    if (/google|gtm|doubleclick/i.test(request.url())) googleRequests.push(request.url());
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Tylko niezbędne' }).click();
  await page.waitForTimeout(1000);

  expect(googleRequests).toEqual([]);
});

test('formularz kontaktowy pokazuje błąd, gdy wysyłka się nie powiedzie', async ({ page }) => {
  await acceptCookiesUpfront(page);
  await page.route('**api.web3forms.com/**', (route) => route.abort());
  await page.goto('/');

  await page.fill('#name', 'Test');
  await page.fill('#email', 'test@example.com');
  await page.fill('#message', 'Wiadomość testowa');
  await page.check('#consent');
  await page.locator('#contact-form button[type="submit"]').click();

  const result = page.locator('#form-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Wystąpił błąd');
});

test('pola formularza mają autouzupełnianie i etykiety', async ({ page }) => {
  await acceptCookiesUpfront(page);
  await page.goto('/');

  for (const [id, value] of [
    ['#name', 'given-name'],
    ['#email', 'email'],
    ['#phone', 'tel'],
  ] as const) {
    await expect(page.locator(id)).toHaveAttribute('autocomplete', value);
  }
});

test('podstrony mają poprawne meta i manifest', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'pl_PL');

  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  const manifest = await page.request.get(manifestHref!);
  expect(manifest.ok()).toBeTruthy();

  const body = await manifest.json();
  expect(body.start_url).toBeTruthy();
  expect(body.scope).toBeTruthy();
});
