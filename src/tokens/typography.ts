import type { TextStyle } from 'react-native';
import { Platform } from 'react-native';
import { getInterFontFamily } from '../fonts/interFontFamily';
import { typographyAliases, type TypographyAlias } from './aliases';

export type TypographyStyleDefinition = {
  name: string;
  token: string;
  category: 'heading' | 'numeral' | 'label' | 'body';
  fontFamily: string;
  fontWeight: '400' | '500' | '700';
  fontSize: number;
  letterSpacing: number;
};

const FONT_FAMILY = 'Inter';

function parseLetterSpacing(value: string, fontSize: number): number {
  if (value.endsWith('%')) {
    const percent = Number.parseFloat(value.replace('%', ''));
    return (percent / 100) * fontSize;
  }

  return Number.parseFloat(value) || 0;
}

function createStyle(def: Omit<TypographyStyleDefinition, 'name' | 'token' | 'category'>): TextStyle {
  const fontFamily = getInterFontFamily(def.fontWeight);

  return {
    fontFamily,
    ...(Platform.OS === 'web' ? { fontWeight: def.fontWeight } : null),
    fontSize: def.fontSize,
    letterSpacing: def.letterSpacing,
    lineHeight: def.fontSize,
  };
}

/** Text styles exported from Figma. */
export const typographyDefinitions: TypographyStyleDefinition[] = [
  { name: 'Heading 1', token: 'heading-1', category: 'heading', fontFamily: FONT_FAMILY, fontWeight: '700', fontSize: 40, letterSpacing: 0 },
  { name: 'Heading 2', token: 'heading-2', category: 'heading', fontFamily: FONT_FAMILY, fontWeight: '700', fontSize: 32, letterSpacing: 0 },
  { name: 'Heading 3', token: 'heading-3', category: 'heading', fontFamily: FONT_FAMILY, fontWeight: '700', fontSize: 24, letterSpacing: 0 },
  { name: 'Heading 5', token: 'heading-5', category: 'heading', fontFamily: FONT_FAMILY, fontWeight: '700', fontSize: 18, letterSpacing: parseLetterSpacing('-1%', 18) },
  { name: 'Numeral 1', token: 'numeral-1', category: 'numeral', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 40, letterSpacing: 0 },
  { name: 'Numeral 2', token: 'numeral-2', category: 'numeral', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 32, letterSpacing: 0 },
  { name: 'Numeral 3', token: 'numeral-3', category: 'numeral', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 24, letterSpacing: 0 },
  { name: 'Label 1', token: 'label-1', category: 'label', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 16, letterSpacing: 0 },
  { name: 'Label 2', token: 'label-2', category: 'label', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 15, letterSpacing: 0 },
  { name: 'Label 3', token: 'label-3', category: 'label', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 14, letterSpacing: 0 },
  { name: 'Label 4', token: 'label-4', category: 'label', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 13, letterSpacing: 0 },
  { name: 'Label 5', token: 'label-5', category: 'label', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 12, letterSpacing: 0 },
  { name: 'Body m1', token: 'body-m1', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 16, letterSpacing: 0 },
  { name: 'Body m2', token: 'body-m2', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 15, letterSpacing: 0 },
  { name: 'Body m3', token: 'body-m3', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 14, letterSpacing: 0 },
  { name: 'Body m4', token: 'body-m4', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '500', fontSize: 13, letterSpacing: 0 },
  { name: 'Body r1', token: 'body-r1', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 16, letterSpacing: 0 },
  { name: 'Body r2', token: 'body-r2', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 15, letterSpacing: 0 },
  { name: 'Body r3', token: 'body-r3', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 14, letterSpacing: 0 },
  { name: 'Body r4', token: 'body-r4', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 13, letterSpacing: 0 },
  { name: 'Body r5', token: 'body-r5', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 12, letterSpacing: 0 },
  { name: 'body r6', token: 'body-r6', category: 'body', fontFamily: FONT_FAMILY, fontWeight: '400', fontSize: 10, letterSpacing: 0 },
];

export const typography = Object.fromEntries(
  typographyDefinitions.map((def) => [
    def.token.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase()),
    createStyle(def),
  ]),
) as Record<string, TextStyle>;

export const typographyByCategory = {
  heading: typographyDefinitions.filter((def) => def.category === 'heading'),
  numeral: typographyDefinitions.filter((def) => def.category === 'numeral'),
  label: typographyDefinitions.filter((def) => def.category === 'label'),
  body: typographyDefinitions.filter((def) => def.category === 'body'),
} as const;

export function getTypographyStyle(token: string): TextStyle {
  const resolvedToken =
    token in typographyAliases
      ? typographyAliases[token as TypographyAlias]
      : token;
  const def = typographyDefinitions.find((item) => item.token === resolvedToken);

  if (!def) {
    throw new Error(`Unknown typography token: ${token}`);
  }

  return createStyle(def);
}

export const fontFamily = FONT_FAMILY;
