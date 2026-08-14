/**
 * Design tokens — "warm earthy" palette, mirrored for JS consumers.
 *
 * index.css is the SOURCE OF TRUTH: every value below is a copy of the
 * `@theme` block there. Change it there first, then update this file.
 */
export const theme = {
  colors: {
    base: '#0D0B0A',
    surface: '#14110F',
    surfaceElevated: '#1C1815',
    offWhite: '#F4EFE7',
    offWhiteMuted: '#C4BBAE',

    /* Warm neutral ramp: base → foreground.
       1 hairlines · 2 borders/numerals · 3 tertiary text · 4 labels */
    warm1: '#221E1A',
    warm2: '#38312A',
    warm3: '#6A6055',
    warm4: '#A79C8E',

    /* Antique brass accent — signature, active states, hairline details.
       Nothing else. */
    brass: '#A8854C',
    brassBright: '#C9A468',
    brassDeep: '#6E5732',

    terracotta: '#8C4A2F',
    terracottaLight: '#C1795C',
  },
  fonts: {
    display: "'Cormorant Garamond', serif",
    body: "'Inter', sans-serif",
  },
  transitions: {
    slow: '900ms cubic-bezier(0.16, 1, 0.3, 1)',
    medium: '600ms cubic-bezier(0.16, 1, 0.3, 1)',
    fast: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
}

/** Hard-coded categories — must match the Sanity schema exactly */
export const CATEGORIES = [
  { value: 'street', label: 'Street Photography' },
  { value: 'portraits', label: 'Portraits' },
  { value: 'travel', label: 'Travel' },
  { value: 'festivals', label: 'Festivals' },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
)
