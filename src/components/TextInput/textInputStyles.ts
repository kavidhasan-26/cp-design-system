import type { TextStyle, ViewStyle } from 'react-native';
import { neutral, red } from '../../tokens/primitives/colors';
import { border, text } from '../../tokens/semantic/colors';
import { motion } from '../../tokens/motion';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { getTypographyStyle } from '../../tokens/typography';

export type TextInputVisualState = 'enabled' | 'active' | 'filled' | 'loading' | 'disabled';
export type TextInputHelper = 'none' | 'error' | 'success' | 'hint';

/** Pixel-perfect text-input specs extracted from Figma component set (node 65:27). */
export const textInputSpecs = {
  stackGap: space[3],
  fieldGap: space[5],
  helperGap: space[2],
  fieldPadding: {
    horizontal: space[5],
    vertical: space[7],
  },
  borderRadius: radius[2],
  borderWidth: 1,
  iconSize: 16,
  successIconSize: 12,
  disabledOpacity: 0.7,
  transitionDuration: motion.durationFast,
  labelStyle: getTypographyStyle('label-3'),
  inputStyle: getTypographyStyle('body-r2'),
  helperStyle: getTypographyStyle('body-r5'),
  colors: {
    label: text.primary,
    placeholder: text.secondary,
    value: text.primary,
    fieldBackground: 'transparent',
    loadingBackground: neutral[15],
    disabledBackground: neutral[30],
    borderDefault: border.border3,
    borderActive: border.borderPurple,
    borderError: red[50],
    helperError: red[50],
    helperDefault: text.primary,
    helperHint: neutral[45],
  },
} as const;

export function getFieldBorderColor(visualState: TextInputVisualState, helper: TextInputHelper): string {
  if (helper === 'error') {
    return textInputSpecs.colors.borderError;
  }

  if (visualState === 'active') {
    return textInputSpecs.colors.borderActive;
  }

  return textInputSpecs.colors.borderDefault;
}

export function getFieldBackgroundColor(visualState: TextInputVisualState): string {
  if (visualState === 'loading') {
    return textInputSpecs.colors.loadingBackground;
  }

  if (visualState === 'disabled') {
    return textInputSpecs.colors.disabledBackground;
  }

  return textInputSpecs.colors.fieldBackground;
}

export function getInputTextColor(visualState: TextInputVisualState, hasValue: boolean): TextStyle['color'] {
  if (visualState === 'disabled') {
    return textInputSpecs.colors.placeholder;
  }

  if (hasValue && visualState !== 'active') {
    return textInputSpecs.colors.value;
  }

  if (visualState === 'active' && hasValue) {
    return textInputSpecs.colors.value;
  }

  return textInputSpecs.colors.placeholder;
}

export function getHelperTextColor(helper: TextInputHelper): string {
  if (helper === 'error') {
    return textInputSpecs.colors.helperError;
  }

  if (helper === 'hint') {
    return textInputSpecs.colors.helperHint;
  }

  return textInputSpecs.colors.helperDefault;
}

type TextInputStyleConfig = {
  root: ViewStyle;
  label: TextStyle;
  field: ViewStyle;
  input: TextStyle;
  helperRow: ViewStyle;
  helperText: TextStyle;
};

export function getTextInputStyles(
  visualState: TextInputVisualState,
  helper: TextInputHelper,
  hasValue: boolean,
  fullWidth: boolean,
): TextInputStyleConfig {
  const fieldBorderColor = getFieldBorderColor(visualState, helper);

  return {
    root: {
      alignSelf: fullWidth ? 'stretch' : 'flex-start',
      gap: textInputSpecs.stackGap,
      width: fullWidth ? '100%' : 347,
    },
    label: {
      ...textInputSpecs.labelStyle,
      color: textInputSpecs.colors.label,
    },
    field: {
      alignItems: 'center',
      backgroundColor: getFieldBackgroundColor(visualState),
      borderColor: fieldBorderColor,
      borderRadius: textInputSpecs.borderRadius,
      borderWidth: textInputSpecs.borderWidth,
      flexDirection: 'row',
      gap: textInputSpecs.fieldGap,
      opacity: visualState === 'disabled' ? textInputSpecs.disabledOpacity : 1,
      paddingHorizontal: textInputSpecs.fieldPadding.horizontal,
      paddingVertical: textInputSpecs.fieldPadding.vertical,
    },
    input: {
      ...textInputSpecs.inputStyle,
      color: getInputTextColor(visualState, hasValue),
      flex: 1,
      minHeight: textInputSpecs.inputStyle.lineHeight,
      padding: 0,
      width: '100%',
    },
    helperRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: textInputSpecs.helperGap,
    },
    helperText: {
      ...textInputSpecs.helperStyle,
      color: getHelperTextColor(helper),
      flex: 1,
    },
  };
}
