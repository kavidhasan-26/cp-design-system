import type { TextStyle, ViewStyle } from 'react-native';
import { neutral, red } from '../../tokens/primitives/colors';
import { border, text } from '../../tokens/semantic/colors';
import { motion } from '../../tokens/motion';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { getTypographyStyle } from '../../tokens/typography';

export type OtpInputAppearanceValue = 'enabled' | 'active' | 'filled' | 'disabled';
export type OtpInputHelper = 'none' | 'error' | 'success' | 'hint';

/** Pixel-perfect OTP specs extracted from Figma component set (node 70:114). */
export const otpInputSpecs = {
  length: 4,
  stackGap: space[3],
  cellGap: space[4],
  helperGap: space[2],
  successIconSize: 12,
  cellSize: 46,
  borderRadius: radius[2],
  borderWidth: 1,
  disabledOpacity: 0.7,
  transitionDuration: motion.durationFast,
  labelStyle: getTypographyStyle('label-3'),
  digitStyle: getTypographyStyle('body-r2'),
  helperStyle: getTypographyStyle('body-r5'),
  colors: {
    label: text.primary,
    digit: text.primary,
    cellBackground: 'transparent',
    disabledBackground: neutral[30],
    borderDefault: border.border3,
    borderActive: border.borderPurple,
    borderError: red[50],
    helperError: red[50],
    helperDefault: text.primary,
    helperHint: neutral[45],
    caret: border.borderPurple,
  },
} as const;

export function getCellBorderColor(
  helper: OtpInputHelper,
  isFocusedCell: boolean,
): string {
  if (helper === 'error') {
    return otpInputSpecs.colors.borderError;
  }

  if (isFocusedCell) {
    return otpInputSpecs.colors.borderActive;
  }

  return otpInputSpecs.colors.borderDefault;
}

export function getHelperTextColor(helper: OtpInputHelper): string {
  if (helper === 'error') {
    return otpInputSpecs.colors.helperError;
  }

  if (helper === 'hint') {
    return otpInputSpecs.colors.helperHint;
  }

  return otpInputSpecs.colors.helperDefault;
}

type OtpInputStyleConfig = {
  root: ViewStyle;
  label: TextStyle;
  cellRow: ViewStyle;
  cell: ViewStyle;
  cellText: TextStyle;
  hiddenInput: TextStyle;
  helperRow: ViewStyle;
  helperText: TextStyle;
};

export function getOtpInputStyles(
  visualState: OtpInputAppearanceValue,
  helper: OtpInputHelper,
  fullWidth: boolean,
): OtpInputStyleConfig {
  const isDisabled = visualState === 'disabled';

  return {
    root: {
      alignSelf: fullWidth ? 'stretch' : 'flex-start',
      gap: otpInputSpecs.stackGap,
      width: fullWidth ? '100%' : 347,
    },
    label: {
      ...otpInputSpecs.labelStyle,
      color: otpInputSpecs.colors.label,
    },
    cellRow: {
      flexDirection: 'row',
      gap: otpInputSpecs.cellGap,
      opacity: isDisabled ? otpInputSpecs.disabledOpacity : 1,
    },
    cell: {
      alignItems: 'center',
      backgroundColor: isDisabled
        ? otpInputSpecs.colors.disabledBackground
        : otpInputSpecs.colors.cellBackground,
      borderRadius: otpInputSpecs.borderRadius,
      borderWidth: otpInputSpecs.borderWidth,
      height: otpInputSpecs.cellSize,
      justifyContent: 'center',
      width: otpInputSpecs.cellSize,
    },
    cellText: {
      ...otpInputSpecs.digitStyle,
      color: otpInputSpecs.colors.digit,
      padding: 0,
      textAlign: 'center',
    },
    hiddenInput: {
      height: 1,
      opacity: 0,
      position: 'absolute',
      width: 1,
    },
    helperRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: otpInputSpecs.helperGap,
    },
    helperText: {
      ...otpInputSpecs.helperStyle,
      color: getHelperTextColor(helper),
      flex: 1,
    },
  };
}
