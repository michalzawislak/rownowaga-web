/**
 * Staż liczony z roku rozpoczęcia praktyki, żeby liczba na stronie nie
 * wymagała corocznej ręcznej poprawki w kilku miejscach.
 *
 * Wartość powstaje w czasie builda (strona jest statyczna), więc odświeża się
 * przy każdym wdrożeniu. Jeśli strona nie jest przebudowywana przez cały rok,
 * liczba zostaje nieaktualna — dlatego w CI warto trzymać cykliczny build.
 */

/**
 * Przypadek gramatyczny, w jakim liczebnik stoi w zdaniu. Różnica jest realna:
 * mówimy „przez 22 lata”, ale „od 22 lat” — po „od” rzeczownik idzie w
 * dopełniaczu i wtedy zawsze jest „lat”.
 */
export type YearsCase = 'accusative' | 'genitive';

/** Liczba pełnych lat od `startYear` do roku bieżącego. */
export function yearsSince(startYear: number, now: Date = new Date()): number {
  return Math.max(0, now.getFullYear() - startYear);
}

/**
 * Polska odmiana rzeczownika „rok”.
 *
 * Biernik (po „przez”): 1 rok, 2–4 lata, 5–21 lat, 22–24 lata… Wyjątkiem są
 * nastki (12, 13, 14), które mimo końcówki 2–4 biorą „lat”.
 *
 * Dopełniacz (po „od”): „roku” dla jedynki, „lat” dla każdej innej liczby.
 */
export function polishYearsNoun(
  count: number,
  grammaticalCase: YearsCase = 'accusative',
): 'rok' | 'roku' | 'lata' | 'lat' {
  if (grammaticalCase === 'genitive') {
    return count === 1 ? 'roku' : 'lat';
  }

  if (count === 1) return 'rok';

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  const isTeen = lastTwoDigits >= 12 && lastTwoDigits <= 14;

  return lastDigit >= 2 && lastDigit <= 4 && !isTeen ? 'lata' : 'lat';
}

/**
 * Gotowa fraza do wstawienia w zdanie: `experienceLabel(2013)` da „13 lat”,
 * a po 2035 roku „22 lata” w bierniku i „22 lat” w dopełniaczu.
 */
export function experienceLabel(
  startYear: number,
  grammaticalCase: YearsCase = 'accusative',
  now: Date = new Date(),
): string {
  const years = yearsSince(startYear, now);
  return `${years} ${polishYearsNoun(years, grammaticalCase)}`;
}
