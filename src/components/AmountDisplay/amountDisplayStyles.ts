import type { TextStyle } from 'react-native';
import { border, text } from '../../tokens/semantic/colors';
import { motion } from '../../tokens/motion';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { getTypographyStyle } from '../../tokens/typography';

export type AmountDisplaySize = 'normal' | 'large';

type AmountDisplaySizeSpecs = {
  amountStyle: TextStyle;
  rollDigitSlotWidth: number;
  settledDigitSlotWidth: number;
  rollSeparatorWidth: number;
  settledSeparatorWidth: number;
  rollLetterSpacing: number;
  settledLetterSpacing: number;
  maskWidth: number;
  maskHeight: number;
};

/** Pixel-perfect Amount-display specs from Figma component set (node 141:89). */
export const amountDisplaySpecsBySize = {
  normal: {
    amountStyle: {
      ...getTypographyStyle('numeral-2'),
      color: text.primary,
      fontVariant: ['tabular-nums'],
    } satisfies TextStyle,
    rollDigitSlotWidth: 21,
    settledDigitSlotWidth: 19,
    rollSeparatorWidth: 9,
    settledSeparatorWidth: 6,
    rollLetterSpacing: -0.5,
    settledLetterSpacing: -1.5,
    maskWidth: 14,
    maskHeight: 24,
  },
  large: {
    amountStyle: {
      ...getTypographyStyle('numeral-1'),
      color: text.primary,
      fontVariant: ['tabular-nums'],
    } satisfies TextStyle,
    rollDigitSlotWidth: 26,
    settledDigitSlotWidth: 24,
    rollSeparatorWidth: 11,
    settledSeparatorWidth: 8,
    rollLetterSpacing: -0.6,
    settledLetterSpacing: -1.9,
    maskWidth: 18,
    maskHeight: 30,
  },
} satisfies Record<AmountDisplaySize, AmountDisplaySizeSpecs>;

/** Default specs — normal size (Numeral 2 / 32px). */
export const amountDisplaySpecs = {
  rowGap: space[6],
  currencyGap: space[4],
  rollDigitGap: space[1],
  settledDigitGap: 0,
  maskGap: space[1],
  toggleSize: 24,
  iconSize: 16,
  rollDuration: motion.durationRoll,
  rollStagger: 45,
  settleDuration: motion.durationSettle,
  colors: {
    amount: text.primary,
    toggleBackground: border.border1,
    toggleBorder: border.border3,
    toggleIcon: text.primary,
    mask: border.border2,
  },
  radius: {
    mask: radius[1],
    toggle: radius.x,
  },
  ...amountDisplaySpecsBySize.normal,
} as const;

export function getAmountDisplaySpecs(size: AmountDisplaySize = 'normal') {
  return {
    ...amountDisplaySpecs,
    ...amountDisplaySpecsBySize[size],
  };
}

export function getAmountDisplayStyles(size: AmountDisplaySize = 'normal') {
  const specs = getAmountDisplaySpecs(size);

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
      ...specs.amountStyle,
      letterSpacing: specs.settledLetterSpacing,
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
      height: specs.maskHeight,
      width: specs.maskWidth,
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
    replayButton: {
      alignItems: 'center' as const,
      backgroundColor: amountDisplaySpecs.colors.toggleBackground,
      borderColor: amountDisplaySpecs.colors.toggleBorder,
      borderRadius: amountDisplaySpecs.radius.toggle,
      borderWidth: 1,
      height: amountDisplaySpecs.toggleSize,
      justifyContent: 'center' as const,
      paddingHorizontal: space[4],
    },
    replayLabel: {
      ...getTypographyStyle('label-5'),
      color: amountDisplaySpecs.colors.toggleIcon,
    },
    digitSlot: {
      overflow: 'hidden' as const,
    },
    digit: {
      ...specs.amountStyle,
      textAlign: 'center' as const,
    },
    separator: {
      ...specs.amountStyle,
      textAlign: 'center' as const,
    },
  };
}
