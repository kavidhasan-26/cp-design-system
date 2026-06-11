export * from './primitives/colors';
export * from './semantic/colors';
export * from './radius';
export * from './spacing';
export * from './typography';
export * from './motion';

import { semantic } from './semantic/colors';
import { primitives } from './primitives/colors';
import { radius } from './radius';
import { space } from './spacing';
import { fontFamily, typography } from './typography';
import { motion } from './motion';

/** Unified token object for convenient imports. */
export const tokens = {
  colors: {
    primitives,
    semantic,
  },
  radius,
  space,
  typography,
  fontFamily,
  motion,
} as const;

export type Tokens = typeof tokens;
