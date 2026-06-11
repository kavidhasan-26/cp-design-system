/** Spacing tokens from the Figma "Spacing" collection. */
export const space = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 14,
  8: 16,
  9: 20,
  10: 24,
  11: 32,
  12: 40,
  13: 48,
  14: 56,
} as const;

export type SpaceToken = keyof typeof space;

export const spaceTokens = [
  { name: 'Space-0', token: 'space-0', value: space[0] },
  { name: 'Space-1', token: 'space-1', value: space[1] },
  { name: 'Space-2', token: 'space-2', value: space[2] },
  { name: 'Space-3', token: 'space-3', value: space[3] },
  { name: 'Space-4', token: 'space-4', value: space[4] },
  { name: 'Space-5', token: 'space-5', value: space[5] },
  { name: 'Space-6', token: 'space-6', value: space[6] },
  { name: 'Space-7', token: 'space-7', value: space[7] },
  { name: 'Space-8', token: 'space-8', value: space[8] },
  { name: 'Space-9', token: 'space-9', value: space[9] },
  { name: 'Space-10', token: 'space-10', value: space[10] },
  { name: 'Space-11', token: 'space-11', value: space[11] },
  { name: 'Space-12', token: 'space-12', value: space[12] },
  { name: 'Space-13', token: 'space-13', value: space[13] },
  { name: 'Space-14', token: 'space-14', value: space[14] },
] as const;
