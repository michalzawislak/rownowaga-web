# Status projektu

Stan na 17 września 2026. Strona nie jest jeszcze opublikowana pod docelową domeną.

## Gotowe

### Strona i treści

- Strona główna: hero, „Czy to brzmi znajomo?”, „Dieta jest podstawą współpracy”, „Poznajmy się”,
  oferta z cennikiem, FAQ, kontakt
- Polityka prywatności (RODO, cookies, Consent Mode v2, art. 9 RODO, Web3Forms)
- Strona 404
- Sekcje metamorfoz i bloga gotowe, ale wyłączone flagami w `src/data/features.json`
- Dane gabinetu w jednym pliku (`src/data/business.json`)

### SEO

- Statyczny HTML, semantyczne sekcje, jeden `<h1>` na stronę
- Title strony głównej pod frazę: „Dietetyk i psychodietetyk Szczecin | Równowaga”
- Canonical, `og:*` (z `og:locale` i `og:site_name`), Twitter Card
- `robots.txt` generowany z `src/pages/robots.txt.ts` + sitemapa
- Schema.org: `LocalBusiness`/`Dietitian`, `Person`, `WebSite`, godziny otwarcia, `geo`,
  `hasMap`, `areaServed`, `hasOfferCatalog` z cennikiem
- Podgląd na GitHub Pages z `noindex` — bez ryzyka duplikatu treści

### Dostępność

- Kontrast zgodny z WCAG AA: osobny ciemny odcień zieleni do tekstu, przycisków i ikon
- Link „Przejdź do treści”, widoczny fokus klawiatury
- Menu mobilne: `aria-expanded`, `aria-controls`, zamykanie klawiszem Escape
- FAQ na natywnych `<details>` — działa bez JavaScriptu
- Baner cookies na końcu dokumentu, z przeniesieniem fokusu i `aria-expanded` na ustawieniach
- GTM w trybie „basic” — żadnego kontaktu z serwerami Google przed zgodą użytkownika
- Dekoracyjne ikony SVG ukryte przed czytnikami ekranu
- Treści z animacją wejścia widoczne także bez JavaScriptu (`<noscript>`)
- `prefers-reduced-motion` obsłużone w animacjach i efektach hover

### Wydajność

- Fonty self-hostowane przez Astro Fonts API (subset `latin-ext`, preload)
- CSS w warstwach: `@layer base` + `@layer components`, bez `!important` i stylów inline
- React tylko w wyspach; reszta strony to czysty HTML i CSS

### Jakość kodu

- ESLint (flat config) + Prettier + `astro check` — bez błędów
- `npm run verify` uruchamia komplet kontroli
- CI: `.github/workflows/ci.yml` (lint, format, typy, build)

## Do zrobienia

### Priorytet: wydajność

- [ ] Hero: obraz 2,2 MB (2048×2048) do wymiany na `astro:assets` (`<Picture>`, AVIF/WebP,
      `srcset`, `fetchpriority="high"`) i wyjęcie go z wyspy React — dziś LCP czeka na hydratację
- [ ] `hero-main.png` (1,2 MB) jest nieużywany — do usunięcia

### Brakujące pliki (404)

- [ ] `/images/about/profile.jpg` — dziś symlink do placeholdera SVG, trafia też do Schema.org
- [ ] `/images/solution/mindful-eating.jpg`
- [ ] `/images/hero.jpg` — domyślny `og:image`
- [ ] `/images/blog/psychodietician-signs.jpg` (przy włączaniu bloga)
- [ ] strona `/regulamin` albo usunięcie linku ze stopki

### Treści i dane

- [ ] `specialist.credentials` w `business.json` — prawdziwe uprawnienia do `hasCredential`
- [ ] Docelowe zdjęcia zamiast placeholderów
- [ ] Prawdziwe historie w `metamorphosis.json` przed włączeniem sekcji

### Pozostałe

- [ ] Podstrony usług pod frazy lokalne (dziś cała oferta jest na jednej stronie)
- [ ] Google Business Profile ze spójnym NAP
- [ ] Docelowy hosting z nagłówkami i długim cache (`/_astro/*`) — GitHub Pages tego nie potrafi
- [ ] `withBase` w linkach bloga (`/#kontakt`, obraz wpisu) przed włączeniem bloga
- [ ] `autocomplete` w polach formularza
- [ ] Lighthouse CI z progiem — sensowne dopiero po optymalizacji hero
- [ ] Testy e2e (Playwright + axe)

## Deployment

1. `npm run verify`
2. Uzupełnić `PUBLIC_GTM_ID`, jeśli GTM ma działać
3. Build produkcyjny (`npm run build`) → `dist/`
4. Po publikacji: Google Search Console, sitemapa, sprawdzenie danych strukturalnych
