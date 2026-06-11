import type { TextStyle, ViewStyle } from 'react-native';
import { purple, neutral } from '../../tokens/primitives/colors';
import { actionPrimary, border, text } from '../../tokens/semantic/colors';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { motion } from '../../tokens/motion';
import { getTypographyStyle } from '../../tokens/typography';

/** Pixel-perfect button specs extracted from Figma component set (node 54:49). */
export const buttonSpecs = {
  gap: space[3],
  borderRadius: radius[2],
  borderWidth: 1,
  iconSize: 16,
  transitionDuration: motion.durationFast,
  labelStyle: getTypographyStyle('body-m3'),
  padding: {
    normal: {
      primary: { horizontal: space[8], vertical: space[7] },
      secondary: { horizontal: space[8], vertical: space[7] },
      tertiary: { horizontal: space[8], vertical: space[6] },
    },
    small: {
      primary: { horizontal: space[6], vertical: space[4] },
      secondary: { horizontal: space[6], vertical: space[4] },
      tertiary: { horizontal: space[6], vertical: space[4] },
    },
  },
} as const;

export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'normal' | 'small';
export type ButtonVisualState = 'active' | 'hovered' | 'disabled';

type ButtonStyleConfig = {
  container: ViewStyle;
  label: TextStyle;
};

function getPadding(hierarchy: ButtonHierarchy, size: ButtonSize) {
  return buttonSpecs.padding[size][hierarchy];
}

export function getButtonStyles(
  hierarchy: ButtonHierarchy,
  size: ButtonSize,
  visualState: ButtonVisualState,
): ButtonStyleConfig {
  const padding = getPadding(hierarchy, size);
  const baseContainer: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: buttonSpecs.gap,
    borderRadius: buttonSpecs.borderRadius,
    paddingHorizontal: padding.horizontal,
    paddingVertical: padding.vertical,
  };

  const baseLabel: TextStyle = {
    ...buttonSpecs.labelStyle,
    textAlign: 'center',
  };

  if (hierarchy === 'primary') {
    if (visualState === 'disabled') {
      return {
        container: {
          ...baseContainer,
          backgroundColor: actionPrimary.disabled,
        },
        label: {
          ...baseLabel,
          color: neutral[45],
        },
      };
    }

    if (visualState === 'hovered') {
      return {
        container: {
          ...baseContainer,
          backgroundColor: actionPrimary.hovered,
        },
        label: {
          ...baseLabel,
          color: text.onPrimary,
        },
      };
    }

    return {
      container: {
        ...baseContainer,
        backgroundColor: actionPrimary.default,
      },
      label: {
        ...baseLabel,
        color: text.onPrimary,
      },
    };
  }

  if (hierarchy === 'secondary') {
    if (visualState === 'disabled') {
      return {
        container: {
          ...baseContainer,
          backgroundColor: 'transparent',
          borderWidth: buttonSpecs.borderWidth,
          borderColor: border.border3,
        },
        label: {
          ...baseLabel,
          color: text.disabled,
        },
      };
    }

    if (visualState === 'hovered') {
      return {
        container: {
          ...baseContainer,
          backgroundColor: purple[10],
          borderWidth: buttonSpecs.borderWidth,
          borderColor: border.borderPurple,
        },
        label: {
          ...baseLabel,
          color: purple[40],
        },
      };
    }

    return {
      container: {
        ...baseContainer,
        backgroundColor: 'transparent',
        borderWidth: buttonSpecs.borderWidth,
        borderColor: border.borderPurple,
      },
      label: {
        ...baseLabel,
        color: purple[40],
      },
    };
  }

  if (visualState === 'disabled') {
    return {
      container: {
        ...baseContainer,
        backgroundColor: 'transparent',
      },
      label: {
        ...baseLabel,
        color: text.disabled,
      },
    };
  }

  if (visualState === 'hovered') {
    return {
      container: {
        ...baseContainer,
        backgroundColor: purple[10],
      },
      label: {
        ...baseLabel,
        color: purple[40],
      },
    };
  }

  return {
    container: {
      ...baseContainer,
      backgroundColor: 'transparent',
    },
    label: {
      ...baseLabel,
      color: purple[40],
    },
  };
}
