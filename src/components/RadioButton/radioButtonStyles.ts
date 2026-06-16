import type { TextStyle, ViewStyle } from 'react-native';
import { neutral, purple } from '../../tokens/primitives/colors';
import { border, text } from '../../tokens/semantic/colors';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { getTypographyStyle } from '../../tokens/typography';

/** Pixel-perfect radio-button specs extracted from Figma component set (node 75:206). */
export const radioButtonSpecs = {
  fixedWidth: 276,
  borderRadius: radius[2],
  borderWidth: 1,
  indicatorBorderWidth: 0.875,
  indicatorSize: space[7],
  indicatorDotSize: 9,
  /** Space-6 — vertical padding on normal size. */
  paddingVertical: {
    normal: space[6],
    large: space[8],
  },
  /** Space-5 — horizontal padding on bordered variants. */
  paddingHorizontal: space[5],
  /** Space-0 — horizontal padding on no-borders variants. */
  paddingHorizontalNoBorders: space[0],
  disabledOpacity: 0.6,
  labelStyle: getTypographyStyle('body-r2'),
} as const;

export type RadioButtonVariant =
  | 'unselected'
  | 'selected'
  | 'disabled'
  | 'unselected-plain'
  | 'selected-plain';

export type RadioButtonSize = 'normal' | 'large';

type RadioButtonStyleConfig = {
  container: ViewStyle;
  label: TextStyle;
  indicator: ViewStyle;
  indicatorDot: ViewStyle | null;
};

function hasContainerBorder(variant: RadioButtonVariant): boolean {
  return variant === 'unselected' || variant === 'selected' || variant === 'disabled';
}

function isSelected(variant: RadioButtonVariant): boolean {
  return variant === 'selected' || variant === 'selected-plain';
}

export function getRadioButtonStyles(
  variant: RadioButtonVariant,
  size: RadioButtonSize = 'normal',
): RadioButtonStyleConfig {
  const baseContainer: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: radioButtonSpecs.paddingVertical[size],
    borderRadius: radioButtonSpecs.borderRadius,
  };

  if (hasContainerBorder(variant)) {
    baseContainer.paddingHorizontal = radioButtonSpecs.paddingHorizontal;
    baseContainer.borderWidth = radioButtonSpecs.borderWidth;
  } else {
    baseContainer.paddingHorizontal = radioButtonSpecs.paddingHorizontalNoBorders;
  }

  const baseLabel: TextStyle = {
    ...radioButtonSpecs.labelStyle,
    color: text.primary,
  };

  const baseIndicator: ViewStyle = {
    width: radioButtonSpecs.indicatorSize,
    height: radioButtonSpecs.indicatorSize,
    borderRadius: radioButtonSpecs.indicatorSize / 2,
    borderWidth: radioButtonSpecs.indicatorBorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (variant === 'disabled') {
    return {
      container: {
        ...baseContainer,
        borderColor: border.border3,
        opacity: radioButtonSpecs.disabledOpacity,
      },
      label: {
        ...baseLabel,
        color: neutral[40],
      },
      indicator: {
        ...baseIndicator,
        borderColor: border.border3,
      },
      indicatorDot: null,
    };
  }

  if (variant === 'selected') {
    return {
      container: {
        ...baseContainer,
        backgroundColor: purple[10],
        borderColor: border.borderPurple,
      },
      label: baseLabel,
      indicator: {
        ...baseIndicator,
        borderColor: border.borderPurple,
      },
      indicatorDot: {
        width: radioButtonSpecs.indicatorDotSize,
        height: radioButtonSpecs.indicatorDotSize,
        borderRadius: radioButtonSpecs.indicatorDotSize / 2,
        backgroundColor: purple[40],
      },
    };
  }

  if (variant === 'selected-plain') {
    return {
      container: baseContainer,
      label: baseLabel,
      indicator: {
        ...baseIndicator,
        borderColor: border.borderPurple,
      },
      indicatorDot: {
        width: radioButtonSpecs.indicatorDotSize,
        height: radioButtonSpecs.indicatorDotSize,
        borderRadius: radioButtonSpecs.indicatorDotSize / 2,
        backgroundColor: purple[40],
      },
    };
  }

  return {
    container: {
      ...baseContainer,
      ...(hasContainerBorder(variant) ? { borderColor: border.border3 } : {}),
    },
    label: baseLabel,
    indicator: {
      ...baseIndicator,
      borderColor: border.border3,
    },
    indicatorDot: null,
  };
}

export function resolveRadioButtonVariant(variant: RadioButtonVariant | undefined,
  disabled: boolean,
  selected: boolean,
  bordered: boolean,
): RadioButtonVariant {
  if (variant) {
    return variant;
  }

  if (disabled) {
    return 'disabled';
  }

  if (selected) {
    return bordered ? 'selected' : 'selected-plain';
  }

  return bordered ? 'unselected' : 'unselected-plain';
}

export function isRadioButtonSelected(variant: RadioButtonVariant): boolean {
  return isSelected(variant);
}
