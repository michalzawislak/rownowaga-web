/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_ID?: string;
  /** `true` tylko dla buildu produkcyjnego; ustawiane w astro.config.mjs. */
  readonly SITE_INDEXABLE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
  openCookieSettings?: () => void;
  __gtmLoaded?: boolean;
}
