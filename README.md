# Równowaga — Dietetyka i Psychodietetyka (Szczecin)

Strona wizytówkowa gabinetu dietetycznego: oferta, sekcja „O mnie”, FAQ, formularz kontaktowy
i (opcjonalnie) blog. Statyczna, budowana Astro.

## Technologie

- **Astro 6** — generowanie statyczne (SSG), zero JS tam, gdzie nie jest potrzebny
- **Tailwind CSS 4** — przez `@tailwindcss/vite`, tokeny w `src/styles/global.css`
- **React 19** — wyłącznie wyspy interaktywne (`client:load`): animacje hero, slider metamorfoz
- **Motion One** (`motion`) — animacje komponentów React
- **Astro Fonts API** — Cormorant Garamond i Montserrat pobierane przy buildzie i serwowane
  z własnej domeny (bez zapytań do Google Fonts u użytkownika)
- **Web3Forms** — obsługa formularza kontaktowego
- **Google Consent Mode v2 + GTM** — ładowane dopiero po decyzji w banerze cookies

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
npm run verify       # lint + format:check + check + build (to samo, co CI)
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
├── lib/                # helpery (withBase, tony sekcji, animacje)
├── pages/              # trasy: strona główna, polityka prywatności, 404, robots.txt
├── routes/blog/        # trasy bloga — wstrzykiwane tylko przy włączonej fladze
└── styles/global.css   # tokeny @theme + @layer base/components
```

### Ważne: warstwy CSS

Style globalne muszą siedzieć w `@layer base`, a własne klasy w `@layer components`.
CSS spoza warstw **wygrywa z każdą klasą Tailwinda** — wcześniej właśnie to unieważniało
warianty `md:`/`lg:` w komponentach. Nie dopisuj reguł globalnych poza warstwami.

## Flagi funkcji (`src/data/features.json`)

```json
{ "blog": false, "metamorphosis": false }
```

- `blog` — przy `false` trasy `/blog/` i wpisy **nie powstają** (patrz integracja
  `blogRoutes` w `astro.config.mjs`), znikają też z menu i sitemapy
- `metamorphosis` — pokazuje sekcję metamorfoz na stronie głównej

## Dane gabinetu

Wszystko w jednym miejscu: `src/data/business.json` (nazwa, adres, telefon, godziny,
`areaServed`, `hasMap`, profile społecznościowe). Stąd korzystają nagłówek, stopka,
kontakt, polityka prywatności i dane strukturalne Schema.org.

Do uzupełnienia prawdziwymi danymi: `specialist.credentials` — lista uprawnień
(`{ "category": "dyplom", "name": "...", "issuedBy": "..." }`). Pusta lista oznacza,
że pole `hasCredential` nie trafia do Schema.org.

## Środowisko i deploy

| Zmienna | Znaczenie |
| --- | --- |
| `PUBLIC_GTM_ID` | ID kontenera GTM. Bez niej baner i Consent Mode działają, GTM się nie ładuje. |
| `GITHUB_PAGES` | `true` w buildzie podglądowym na GitHub Pages. |

Build produkcyjny (domena docelowa): canonical, sitemapa i `robots.txt` z `Allow: /`.

Build z `GITHUB_PAGES=true`: prefiks `/rownowaga-web`, `<meta name="robots" content="noindex">`
na każdej stronie, brak canonicala i brak sitemapy — podgląd nie może trafić do Google
jako duplikat treści.

- `.github/workflows/ci.yml` — lint, Prettier, typy i build (push i PR)
- `.github/workflows/deploy.yml` — publikacja podglądu na GitHub Pages

## Formularz kontaktowy

Web3Forms, klucz publiczny w `src/components/ContactSection.astro`. Formularz celowo
nie zachęca do podawania danych o zdrowiu — zgoda obejmuje art. 9 RODO, a szczegóły
opisuje polityka prywatności.

## Znane zadania

- obraz hero (2,2 MB) do wymiany na `astro:assets` z AVIF/WebP
- brakujące zdjęcia: `about/profile.jpg`, `solution/mindful-eating.jpg`, obrazy bloga,
  `og:image` (domyślnie `/images/hero.jpg`)
- brak strony `/regulamin`, do której linkuje stopka
