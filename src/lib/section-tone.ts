import features from '../data/features.json';

export type SectionTone = 'default' | 'alt';

const SECTION_IDS = [
  'problem',
  'solution',
  'about',
  'offer',
  'metamorphosis',
  'faq',
  'blog',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function getSectionTones(): Record<SectionId, SectionTone> {
  const tones = {} as Record<SectionId, SectionTone>;
  let index = 0;

  for (const id of SECTION_IDS) {
    if (id === 'metamorphosis' && !features.metamorphosis) continue;
    if (id === 'blog' && !features.blog) continue;

    tones[id] = index % 2 === 0 ? 'default' : 'alt';
    index += 1;
  }

  return tones;
}

export function sectionBackground(tone: SectionTone): string {
  return tone === 'alt'
    ? 'bg-[var(--color-background-alt)]'
    : 'bg-[var(--color-background)]';
}
