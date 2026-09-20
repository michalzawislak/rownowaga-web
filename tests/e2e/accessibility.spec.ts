import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { acceptCookiesUpfront, revealAllSections } from './helpers';

const pages = [
  { name: 'strona główna', path: '/' },
  { name: 'polityka prywatności', path: '/polityka-prywatnosci' },
  { name: 'strona 404', path: '/404' },
];

for (const { name, path } of pages) {
  test(`${name}: brak naruszeń dostępności po przewinięciu`, async ({ page }) => {
    await acceptCookiesUpfront(page);
    await page.goto(path);
    await revealAllSections(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join(' | ')}`),
      'axe zgłosił naruszenia',
    ).toEqual([]);
  });
}

test('baner cookies: brak naruszeń, gdy jest widoczny', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#cookie-consent')).toBeVisible();

  const { violations } = await new AxeBuilder({ page })
    .include('#cookie-consent')
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(violations.map((v) => v.id)).toEqual([]);
});
