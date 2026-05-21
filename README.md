# Strona Gabinetu Dietetycznego

Nowoczesna strona internetowa dla gabinetu dietetycznego i psychodietetycznego zbudowana w Astro z Tailwind CSS.

## Technologie

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x
- **Interaktywność**: React 19.x (tylko gdzie potrzeba)
- **Fonty**: Google Fonts (Cormorant Garamond, Montserrat)
- **Animacje**: Tailwind transitions + AOS (do dodania)
- **Blog**: Astro Content Collections (Markdown)
- **Formularz**: Web3Forms (wymaga klucza API)

## Struktura projektu

```
diet-website/
├── src/
│   ├── components/         # Komponenty Astro i React
│   │   ├── Hero.astro
│   │   ├── ProblemSection.astro
│   │   ├── SolutionSection.astro
│   │   ├── AboutSection.astro
│   │   ├── OfferSection.astro
│   │   ├── MetamorphosisSection.astro
│   │   ├── FAQ.astro
│   │   ├── BlogPreview.astro
│   │   ├── ContactSection.astro
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── ui/              # Reusable UI components
│   ├── layouts/
│   │   └── Layout.astro     # Główny layout
│   ├── pages/
│   │   ├── index.astro      # Strona główna
│   │   └── blog/
│   │       ├── index.astro  # Lista postów
│   │       └── [slug].astro # Pojedynczy post
│   ├── content/
│   │   └── blog/            # Posty blogowe (Markdown)
│   ├── data/                # Dane JSON
│   │   ├── metamorphosis.json
│   │   ├── faq.json
│   │   └── offers.json
│   └── styles/
│       └── global.css       # Style globalne + design tokens
├── public/
│   └── images/              # Obrazy
└── astro.config.mjs
```

## Instalacja

```bash
npm install
```

## Uruchomienie

```bash
# Dev server
npm run dev

# Build produkcyjny
npm run build

# Preview buildu
npm run preview
```

## Konfiguracja

### 1. Web3Forms (Formularz kontaktowy)

Edytuj `src/components/ContactSection.astro`:
```html
<input type="hidden" name="access_key" value="TWOJ_KLUCZ_WEB3FORMS" />
```

Zarejestruj się na [web3forms.com](https://web3forms.com) aby otrzymać klucz API.

### 2. Site URL

Edytuj `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://twoja-domena.pl',
  // ...
})
```

### 3. Dane kontaktowe

Edytuj w plikach:
- `src/components/ContactSection.astro` - email, telefon, godziny
- `src/components/Footer.astro` - social media links, email, telefon

### 4. Zdjęcia

Wymień placeholder'y w `public/images/` na prawdziwe zdjęcia:
- `hero/hero-main.jpg` - zdjęcie hero
- `about/profile.jpg` - zdjęcie o mnie
- `solution/mindful-eating.jpg` - zdjęcie sekcji solution
- `metamorphosis/` - zdjęcia przed/po
- `blog/` - zdjęcia do artykułów

### 5. Treści

Edytuj treści w komponentach:
- `src/components/AboutSection.astro` - bio dietetyka
- `src/data/offers.json` - pakiety i ceny
- `src/data/faq.json` - pytania i odpowiedzi
- `src/data/metamorphosis.json` - historie metamorfoz

### 6. Blog

Dodaj nowe posty w `src/content/blog/` jako pliki `.md`:

```markdown
---
title: "Tytuł posta"
description: "Krótki opis"
publishDate: 2026-05-20
author: "Imię Nazwisko"
featured: false
image: "/images/blog/post-image.jpg"
imageAlt: "Opis obrazu"
category: "Psychodietetyka"
tags: ["tag1", "tag2"]
---

Treść artykułu w Markdown...
```

## Kolorystyka

Kolory można zmienić w `src/styles/global.css` w sekcji `@theme`:

```css
--color-primary: #E8D5C4;      /* Soft beige/nude */
--color-secondary: #7B9E89;    /* Sage green */
--color-accent: #D4A574;       /* Warm terracotta */
```

## Do zrobienia (TODO)

- [ ] Dodać animacje AOS dla sekcji (scroll-triggered fade-in)
- [ ] Dodać Motion One dla zaawansowanych animacji hero
- [ ] Integracja Calendly dla rezerwacji wizyt
- [ ] Dodać Google Analytics
- [ ] Optymalizacja obrazów (WebP, AVIF)
- [ ] Dodać robots.txt i sitemap (sitemap jest już generowany)
- [ ] Schema.org markup dla SEO
- [ ] Lighthouse testing i optymalizacja performance
- [ ] Prawdziwe zdjęcia zamiast placeholderów
- [ ] Prawdziwe treści we wszystkich sekcjach

## Deployment

Projekt jest gotowy do wdrożenia na:
- **Vercel** (rekomendowane)
- **Netlify**
- **Cloudflare Pages**

```bash
# Build
npm run build

# Folder dist/ zawiera statyczne pliki gotowe do hostowania
```

## Licencja

Projekt prywatny dla gabinetu dietetycznego.

---

**Kontakt:** kontakt@example.com
