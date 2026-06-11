import type { TextStyle } from 'react-native';
import { neutral } from '../../tokens/primitives/colors';
import { text } from '../../tokens/semantic/colors';
import { motion } from '../../tokens/motion';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { getTypographyStyle } from '../../tokens/typography';

/** Pixel-perfect Amount-display specs from Figma component set (node 141:89). */
export const amountDisplaySpecs = {
  rowGap: space[6],
  currencyGap: space[4],
  rollDigitGap: space[1],
  settledDigitGap: 0,
  maskGap: space[1],
  rollDigitSlotWidth: 21,
  settledDigitSlotWidth: 19,
  rollSeparatorWidth: 9,
  settledSeparatorWidth: 6,
  rollLetterSpacing: -0.5,
  settledLetterSpacing: -1.5,
  toggleSize: 24,
  iconSize: 16,
  maskWidth: 14,
  maskHeight: 24,
  rollDuration: motion.durationRoll,
  rollStagger: 45,
  settleDuration: motion.durationSettle,
  amountStyle: {
    ...getTypographyStyle('numeral-2'),
    color: text.primary,
    fontVariant: ['tabular-nums'],
  } satisfies TextStyle,
  colors: {
    amount: text.primary,
    toggleBackground: neutral[20],
    toggleBorder: neutral[30],
    toggleIcon: neutral[50],
    mask: neutral[25],
  },
  radius: {
    mask: radius[1],
    toggle: radius.x,
  },
} as const;

export function getAmountDisplayStyles() {
  return {
    root: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      gap: amountDisplaySpecs.rowGap,
    },
    amountGroup: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      gap: amountDisplaySpecs.currencyGap,
    },
    currency: {
      ...amountDisplaySpecs.amountStyle,
      letterSpacing: amountDisplaySpecs.settledLetterSpacing,
    },
    amountRow: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
    },
    maskRow: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      gap: amountDisplaySpecs.maskGap,
    },
    mask: {
      backgroundColor: amountDisplaySpecs.colors.mask,
      borderRadius: amountDisplaySpecs.radius.mask,
      height: amountDisplaySpecs.maskHeight,
      width: amountDisplaySpecs.maskWidth,
    },
    toggle: {
      alignItems: 'center' as const,
      backgroundColor: amountDisplaySpecs.colors.toggleBackground,
      borderColor: amountDisplaySpecs.colors.toggleBorder,
      borderRadius: amountDisplaySpecs.radius.toggle,
      borderWidth: 1,
      height: amountDisplaySpecs.toggleSize,
      justifyContent: 'center' as const,
      width: amountDisplaySpecs.toggleSize,
    },
    digitSlot: {
      overflow: 'hidden' as const,
    },
    digit: {
      ...amountDisplaySpecs.amountStyle,
      textAlign: 'center' as const,
    },
    separator: {
      ...amountDisplaySpecs.amountStyle,
      textAlign: 'center' as const,
    },
  };
}
