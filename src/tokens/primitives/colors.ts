/** Primitive color scales from the Figma "Primitives" collection. */
export const purple = {
  10: '#dcdbeb',
  20: '#b9b7d8',
  30: '#736fb2',
  40: '#514c9f',
  50: '#403c7f',
  60: '#302d5f',
  70: '#201e3f',
  80: '#100f1f',
} as const;

export const neutral = {
  10: '#ffffff',
  15: '#f3f3f3',
  20: '#f4f4f4',
  25: '#c5c5c5',
  30: '#c9c9c9',
  35: '#acacac',
  40: '#6c6c6c',
  45: '#666666',
  50: '#303030',
  60: '#262626',
  70: '#1c1c1c',
  80: '#090909',
} as const;

export const green = {
  10: '#d6ecd7',
  20: '#aedab0',
  30: '#86c888',
  40: '#5eb661',
  50: '#36a43a',
  60: '#2b832e',
  70: '#206222',
  80: '#154117',
} as const;

export const red = {
  10: '#fad4d4',
  20: '#f6aaaa',
  30: '#f18080',
  40: '#ed5656',
  50: '#e92c2c',
  60: '#ba2323',
  70: '#8b1a1a',
  80: '#5d1111',
} as const;

export const yellow = {
  10: '#fbf6cc',
  20: '#f8ed99',
  30: '#f5e466',
  40: '#f2db33',
  50: '#efd200',
  60: '#bfa800',
  70: '#8f7e00',
  80: '#5f5400',
} as const;

export const orange = {
  10: '#ffe5d6',
  20: '#ffccad',
  30: '#ffb384',
  40: '#ff9a5b',
  50: '#ff8132',
  60: '#cc6728',
  70: '#994d1e',
  80: '#663314',
} as const;

export const blue = {
  10: '#d5e2f6',
  20: '#abc6ed',
  30: '#81aae4',
  40: '#578edb',
  50: '#2e72d2',
  60: '#245ba8',
  70: '#1b447e',
  80: '#122d54',
} as const;

export const primitives = {
  purple,
  neutral,
  green,
  red,
  yellow,
  orange,
  blue,
} as const;

export type PrimitiveColorScale = keyof typeof primitives;
export type PrimitiveColorShade = keyof typeof purple;

export type ColorToken = {
  name: string;
  token: string;
  value: string;
};

export const primitiveColorTokens: Record<PrimitiveColorScale, ColorToken[]> = {
  purple: Object.entries(purple).map(([shade, value]) => ({
    name: `Purple/Purple ${shade}`,
    token: `purple-purple-${shade}`,
    value,
  })),
  neutral: Object.entries(neutral).map(([shade, value]) => ({
    name: `Neutral/Neutral ${shade}`,
    token: `neutral-neutral-${shade}`,
    value,
  })),
  green: Object.entries(green).map(([shade, value]) => ({
    name: `Green/Green ${shade}`,
    token: `green-green-${shade}`,
    value,
  })),
  red: Object.entries(red).map(([shade, value]) => ({
    name: `Red/Red ${shade}`,
    token: `red-red-${shade}`,
    value,
  })),
  yellow: Object.entries(yellow).map(([shade, value]) => ({
    name: `Yellow/Yellow ${shade}`,
    token: `yellow-yellow-${shade}`,
    value,
  })),
  orange: Object.entries(orange).map(([shade, value]) => ({
    name: `Orange/Orange ${shade}`,
    token: `orange-orange-${shade}`,
    value,
  })),
  blue: Object.entries(blue).map(([shade, value]) => ({
    name: `Blue/Blue ${shade}`,
    token: `blue-blue-${shade}`,
    value,
  })),
};
