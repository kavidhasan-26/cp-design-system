import { radius } from './radius';
import { border, surface, text } from './semantic/colors';
import { space } from './spacing';

/** Developer-friendly spacing aliases mapped to Figma Space tokens. */
export const spacing = {
  none: space[0],
  xxs: space[1],
  xs: space[2],
  sm: space[3],
  md: space[4],
  lg: space[5],
  xl: space[6],
  '2xl': space[7],
  '3xl': space[8],
  '4xl': space[9],
  '5xl': space[10],
  '6xl': space[11],
  '7xl': space[12],
  '8xl': space[13],
  '9xl': space[14],
} as const;

/** Developer-friendly radius aliases mapped to Figma radius tokens. */
export const radii = {
  none: radius[0],
  sm: radius[1],
  md: radius[2],
  lg: radius[3],
  xl: radius[4],
  '2xl': radius[5],
  full: radius.x,
} as const;

/** Developer-friendly border color aliases mapped to semantic border tokens. */
export const borders = {
  subtle: border.border1,
  muted: border.border2,
  default: border.border3,
  focus: border.borderPurple,
} as const;

/** Developer-friendly text color aliases. */
export const textColors = {
  primary: text.primary,
  secondary: text.secondary,
  disabled: text.disabled,
  link: text.link,
  onPrimary: text.onPrimary,
  onSecondary: text.onSecondary,
} as const;

/** Developer-friendly surface color aliases. */
export const surfaces = {
  white: surface.white,
  tinted: surface.colored1,
} as const;

/** Maps readable typography aliases to Figma typography tokens. */
export const typographyAliases = {
  'heading-xl': 'heading-1',
  'heading-lg': 'heading-2',
  'heading-md': 'heading-3',
  'heading-sm': 'heading-5',
  'body-regular-lg': 'body-r1',
  'body-regular-md': 'body-r2',
  'body-regular-sm': 'body-r3',
  'body-regular-xs': 'body-r4',
  'body-medium-lg': 'body-m1',
  'body-medium-md': 'body-m2',
  'body-medium-sm': 'body-m3',
  'label-lg': 'label-1',
  'label-md': 'label-2',
  'label-sm': 'label-3',
  'numeral-lg': 'numeral-1',
  'numeral-md': 'numeral-2',
} as const;

export type TypographyAlias = keyof typeof typographyAliases;
