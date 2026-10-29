# Status projektu

Stan na 29 października 2026. Publikacja na `https://rownowaga-dietetyka.pl` (hosting OVH)
przygotowana - rusza z pierwszym pushem na `main`.

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
- Build podglądowy (`GITHUB_PAGES=true`) z `noindex` - bez ryzyka duplikatu treści
- `og:image` 1200×630 (kadr od góry z `ekz-hero.jpg`) z `og:image:width/height`
- `robots.txt`: boty treningowe AI zablokowane, wyszukiwarki i asystenci AI wpuszczeni,
  `Content-Signal: search=yes, ai-input=yes, ai-train=no`

### Dostępność

- Kontrast zgodny z WCAG AA: osobny ciemny odcień zieleni do tekstu, przycisków i ikon
- Link „Przejdź do treści”, widoczny fokus klawiatury
- Menu mobilne: `aria-expanded`, `aria-controls`, zamykanie klawiszem Escape
- FAQ na natywnych `<details>` - działa bez JavaScriptu
- Baner cookies na końcu dokumentu, z przeniesieniem fokusu i `aria-expanded` na ustawieniach
- GTM w trybie „basic” - żadnego kontaktu z serwerami Google przed zgodą użytkownika
- Dekoracyjne ikony SVG ukryte przed czytnikami ekranu
- Treści z animacją wejścia widoczne także bez JavaScriptu (`<noscript>`)
- `prefers-reduced-motion` obsłużone w animacjach i efektach hover

### Wydajność

- Fonty self-hostowane przez Astro Fonts API (subset `latin-ext`, preload)
- CSS w warstwach: `@layer base` + `@layer components`, bez `!important` i stylów inline
- React tylko w wyspach; reszta strony to czysty HTML i CSS
- Hosting OVH (Apache): `.htaccess` z przekierowaniami 301 na `https://` bez `www`,
  rocznym cache dla `/_astro/*`, kompresją, stroną 404 i nagłówkami bezpieczeństwa

### Jakość kodu

- ESLint (flat config) + Prettier + `astro check` - bez błędów
- `npm run verify` uruchamia komplet kontroli
- Testy e2e i dostępności (Playwright + axe) na buildzie produkcyjnym, desktop i mobile
- CI/CD: `.github/workflows/deploy.yml` - lint, format, typy, build i testy e2e; po ich
  przejściu deploy przez SFTP na hosting OVH (tylko `main`)

## Do zrobienia

### Porządki

- [ ] `src/assets/images/hero/hero-main.jpeg` (2 MB, zdjęcie wagi) jest nieużywany po wymianie hero - do usunięcia

### Brakujące pliki

- [ ] `/images/blog/psychodietician-signs.jpg` (przy włączaniu bloga)

### Treści i dane

- [ ] `specialist.credentials` w `business.json` - prawdziwe uprawnienia do `hasCredential`
- [ ] Docelowe zdjęcia zamiast placeholderów (hero i „Poznajmy się” już są: `ekz-hero.jpg`, `ekz.jpg`)
- [ ] Prawdziwe historie w `metamorphosis.json` przed włączeniem sekcji

### Pozostałe

- [ ] Podstrony usług pod frazy lokalne (dziś cała oferta jest na jednej stronie)
- [ ] Google Business Profile ze spójnym NAP
- [ ] Rastrowy `og:image` dla wpisów bloga bez zdjęcia (dziś placeholder SVG)
- [ ] Lighthouse CI z progiem

## Deployment

Automatycznie: push na `main` → weryfikacja i testy → SFTP do `www/` na OVH (szczegóły
w README, sekcja „Publikacja”).

Po pierwszej publikacji:

- [ ] W panelu OVH: certyfikat SSL obejmuje `rownowaga-dietetyka.pl` i `www`
- [ ] Sprawdzić przekierowania (`http://`, `www.`), stronę 404 i nagłówki cache na żywo
- [ ] Wyłączyć GitHub Pages w ustawieniach repozytorium
- [ ] Google Search Console i Bing Webmaster Tools: weryfikacja domeny, zgłoszenie sitemapy
- [ ] Test danych strukturalnych (Rich Results Test) i podglądu linku (Facebook Sharing Debugger)
- [ ] Wiadomość testowa z formularza kontaktowego
