# Równowaga - Dietetyka i Psychodietetyka (Szczecin)

Strona wizytówkowa gabinetu dietetycznego: oferta, sekcja „O mnie”, FAQ, formularz kontaktowy
i (opcjonalnie) blog. Statyczna, budowana Astro.

## Technologie

- **Astro 6** - generowanie statyczne (SSG), zero JS tam, gdzie nie jest potrzebny
- **Tailwind CSS 4** - przez `@tailwindcss/vite`, tokeny w `src/styles/global.css`
- **React 19** - jedna wyspa: slider metamorfoz (`client:visible`). Reszta strony to HTML i CSS
- **Playwright + axe** - testy e2e i dostępności na buildzie produkcyjnym
- **Astro Fonts API** - Cormorant Garamond i Montserrat pobierane przy buildzie i serwowane
  z własnej domeny (bez zapytań do Google Fonts u użytkownika)
- **Web3Forms** - obsługa formularza kontaktowego
- **Google Consent Mode v2 + GTM** - tryb „basic”: kontener GTM wczytuje się dopiero po
  zgodzie na analitykę lub marketing (art. 399 Prawa komunikacji elektronicznej wymaga
  zgody uprzedniej). Odmowa oznacza zero żądań do Google.

## Wymagania

Node.js zgodny z `.nvmrc` (22.x). Przed pracą: `nvm use`.

## Uruchomienie

```bash
npm install
npm run dev          # serwer deweloperski
npm run build        # build produkcyjny do dist/
npm run preview      # podgląd builda
```

Jakość kodu:

```bash
npm run lint         # ESLint
npm run format       # Prettier (zapis)
npm run check        # astro check (typy)
npm run verify       # lint + format:check + check + build
npm run test:e2e     # Playwright: e2e + axe (buduje i podnosi preview sam)
npm run test:e2e:ui  # ten sam zestaw w trybie interaktywnym
```

> Build pobiera pliki fontów z sieci. Bez dostępu do internetu Astro wypisze ostrzeżenie
> „No data found for font family…”, a strona wyrenderuje się na fontach zapasowych.

## Struktura

```
src/
├── components/         # sekcje strony i komponenty UI
│   └── ui/             # Button, Card, wyspy React
├── content/blog/       # wpisy bloga (Markdown)
├── data/               # dane wejściowe: business, offers, faq, features, metamorphosis
├── layouts/Layout.astro# <head>, SEO, fonty, baner cookies, skip link
├── lib/                # helpery (withBase, obrazy, tony sekcji)
├── pages/              # trasy: strona główna, polityka, 404, robots.txt, site.webmanifest
├── routes/blog/        # trasy bloga - wstrzykiwane tylko przy włączonej fladze
└── styles/global.css   # tokeny @theme + @layer base/components
```

### Testy

`tests/e2e/` uruchamia się na buildzie produkcyjnym (Playwright sam robi `build` i `preview`),
w dwóch profilach: desktop i mobile.

- `accessibility.spec.ts` - axe na stronie głównej, polityce i 404 **po przewinięciu całej
  strony**. To istotne: sekcje z `animate-on-scroll` są przezroczyste, dopóki nie wejdą
  w widok, więc audyt bez przewijania (np. sam Lighthouse) po prostu ich nie sprawdza.
- `strona.spec.ts` - kotwice w nawigacji, FAQ, menu mobilne, baner cookies, przyklejone CTA,
  brak żądań do Google przed zgodą, obsługa błędu formularza, manifest.

Pierwsze uruchomienie wymaga przeglądarki: `npx playwright install chromium`.
Jeśli w środowisku jest już Chromium, można wskazać je przez `PLAYWRIGHT_CHROMIUM_PATH`.

### Ważne: warstwy CSS

Style globalne muszą siedzieć w `@layer base`, a własne klasy w `@layer components`.
CSS spoza warstw **wygrywa z każdą klasą Tailwinda** - wcześniej właśnie to unieważniało
warianty `md:`/`lg:` w komponentach. Nie dopisuj reguł globalnych poza warstwami.

## Flagi funkcji (`src/data/features.json`)

```json
{ "blog": false, "metamorphosis": false }
```

- `blog` - przy `false` trasy `/blog/` i wpisy **nie powstają** (patrz integracja
  `blogRoutes` w `astro.config.mjs`), znikają też z menu i sitemapy
- `metamorphosis` - pokazuje sekcję metamorfoz na stronie głównej

## Dane gabinetu

Wszystko w jednym miejscu: `src/data/business.json` (nazwa, adres, telefon, godziny,
`areaServed`, `hasMap`, profile społecznościowe). Stąd korzystają nagłówek, stopka,
kontakt, polityka prywatności i dane strukturalne Schema.org.

Do uzupełnienia prawdziwymi danymi: `specialist.credentials` - lista uprawnień
(`{ "category": "dyplom", "name": "...", "issuedBy": "..." }`). Pusta lista oznacza,
że pole `hasCredential` nie trafia do Schema.org.

## Środowisko i deploy

| Zmienna | Znaczenie |
| --- | --- |
| `PUBLIC_GTM_ID` | ID kontenera GTM. Bez niej baner i Consent Mode działają, GTM się nie ładuje. GTM startuje wyłącznie po zgodzie użytkownika. |
| `GITHUB_PAGES` | `true` tylko w buildzie podglądowym (prefiks `/rownowaga-web`). Produkcja jej nie ustawia. |

Build produkcyjny (domena docelowa): canonical, sitemapa, `robots.txt` blokujący boty
treningowe AI (wyszukiwarki i asystenci AI mają pełny dostęp) oraz `.htaccess` dla Apache.

Build z `GITHUB_PAGES=true`: `<meta name="robots" content="noindex">` na każdej stronie,
brak canonicala i sitemapy - podgląd nie może trafić do Google jako duplikat treści.

### Publikacja (hosting OVH)

`.github/workflows/deploy.yml` przy każdym pushu na `main`:

1. `npm run verify` (lint, Prettier, typy, build) i testy e2e - równolegle,
2. jeśli oba przejdą: build produkcyjny i synchronizacja `dist/` z katalogiem `www/`
   na hostingu OVH przez SFTP (`lftp mirror --delete`),
3. kontrola, czy `https://rownowaga-dietetyka.pl/` odpowiada.

Pull requesty przechodzą tylko kroki 1. Wdrożenie można też uruchomić ręcznie
(Actions → Deploy → Run workflow).

Sekrety repozytorium (Settings → Secrets and variables → Actions):

| Sekret | Wartość |
| --- | --- |
| `SFTP_HOST` | serwer FTP z panelu OVH, np. `ftp.cluster0XX.hosting.ovh.net` |
| `SFTP_USERNAME` | login FTP (katalog domowy `.`, czyli główny katalog hostingu) |
| `SFTP_PASSWORD` | hasło FTP |

Deploy dotyka wyłącznie `www/` - plik `.ovhconfig` w katalogu wyżej zostaje nietknięty.
Przekierowania (`http` i `www` → `https://rownowaga-dietetyka.pl`), cache `/_astro/*`
na rok, strona 404 i nagłówki bezpieczeństwa są w `public/.htaccess`.

## Formularz kontaktowy

Web3Forms, klucz publiczny w `src/components/ContactSection.astro`. Formularz celowo
nie zachęca do podawania danych o zdrowiu - zgoda obejmuje art. 9 RODO, a szczegóły
opisuje polityka prywatności.

## Znane zadania

- wpisy bloga bez zdjęć mają `og:image` w SVG, którego nie renderują serwisy społecznościowe
- brakujące zdjęcia: wpisy bloga
- `specialist.credentials` w `business.json` do uzupełnienia
