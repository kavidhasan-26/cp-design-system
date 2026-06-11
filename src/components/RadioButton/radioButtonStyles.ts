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
  /** Space-6 — vertical padding on all variants. */
  paddingVertical: space[6],
  /** Space-5 — horizontal padding on bordered variants. */
  paddingHorizontal: space[5],
  /** Space-0 — horizontal padding on no-borders variants. */
  paddingHorizontalNoBorders: space[0],
  disabledOpacity: 0.6,
  labelStyle: getTypographyStyle('body-r2'),
} as const;

export type RadioButtonType =
  | 'unselected'
  | 'active'
  | 'disabled'
  | 'unselected-no-borders'
  | 'active-no-borders';

type RadioButtonStyleConfig = {
  container: ViewStyle;
  label: TextStyle;
  indicator: ViewStyle;
  indicatorDot: ViewStyle | null;
};

function hasContainerBorder(type: RadioButtonType): boolean {
  return type === 'unselected' || type === 'active' || type === 'disabled';
}

function isSelected(type: RadioButtonType): boolean {
  return type === 'active' || type === 'active-no-borders';
}

export function getRadioButtonStyles(type: RadioButtonType): RadioButtonStyleConfig {
  const baseContainer: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: radioButtonSpecs.paddingVertical,
    borderRadius: radioButtonSpecs.borderRadius,
  };

  if (hasContainerBorder(type)) {
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

  if (type === 'disabled') {
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

  if (type === 'active') {
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

  if (type === 'active-no-borders') {
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
      ...(hasContainerBorder(type) ? { borderColor: border.border3 } : {}),
    },
    label: baseLabel,
    indicator: {
      ...baseIndicator,
      borderColor: border.border3,
    },
    indicatorDot: null,
  };
}

export function resolveRadioButtonType(
  type: RadioButtonType | undefined,
  disabled: boolean,
  selected: boolean,
  borders: boolean,
): RadioButtonType {
  if (type) {
    return type;
  }

  if (disabled) {
    return 'disabled';
  }

  if (selected) {
    return borders ? 'active' : 'active-no-borders';
  }

  return borders ? 'unselected' : 'unselected-no-borders';
}

export function isRadioButtonSelected(type: RadioButtonType): boolean {
  return isSelected(type);
}
