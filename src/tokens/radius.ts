/** Border radius tokens from the Figma "Radius" collection. */
export const radius = {
  0: 0,
  1: 2,
  2: 4,
  3: 8,
  4: 12,
  5: 16,
  x: 999,
} as const;

export type RadiusToken = keyof typeof radius;

export const radiusTokens = [
  { name: 'radius-0', token: 'radius-0', value: radius[0] },
  { name: 'radius-1', token: 'radius-1', value: radius[1] },
  { name: 'radius-2', token: 'radius-2', value: radius[2] },
  { name: 'radius-3', token: 'radius-3', value: radius[3] },
  { name: 'radius-4', token: 'radius-4', value: radius[4] },
  { name: 'radius-5', token: 'radius-5', value: radius[5] },
  { name: 'radius-x', token: 'radius-x', value: radius.x },
] as const;
