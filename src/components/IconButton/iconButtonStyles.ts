import type { ViewStyle } from 'react-native';
import { purple, neutral } from '../../tokens/primitives/colors';
import { background, text } from '../../tokens/semantic/colors';
import { radius } from '../../tokens/radius';
import { motion } from '../../tokens/motion';

/** Pixel-perfect Icon-button specs from Figma component set (node 66:143). Ghost variant matches Bottomsheet close control. */
export const iconButtonSpecs = {
  iconSize: 16,
  borderRadius: radius.x,
  transitionDuration: motion.durationFast,
  containerSize: {
    normal: 40,
    small: 32,
  },
} as const;

export type IconButtonVariant = 'default' | 'ghost';
export type IconButtonSize = 'normal' | 'small';
export type IconButtonAppearanceValue = 'active' | 'hovered' | 'disabled';

export function getIconButtonFeedbackSize(size: IconButtonSize): number {
  return iconButtonSpecs.containerSize[size];
}

/** Centers press feedback on a smaller icon — layout hugs iconSize, feedback uses the standard hit target. */
export function getCompactIconButtonLayout(iconSize: number, feedbackSize: number) {
  const offset = (iconSize - feedbackSize) / 2;

  return {
    iconFrame: {
      alignItems: 'center',
      height: iconSize,
      justifyContent: 'center',
      overflow: 'visible',
      width: iconSize,
    } satisfies ViewStyle,
    feedback: {
      borderRadius: iconButtonSpecs.borderRadius,
      height: feedbackSize,
      left: offset,
      position: 'absolute',
      top: offset,
      width: feedbackSize,
    } satisfies ViewStyle,
  };
}

export function getIconButtonStyles(
  variant: IconButtonVariant,
  size: IconButtonSize,
  visualState: IconButtonAppearanceValue,
): { container: ViewStyle } {
  const dimension = iconButtonSpecs.containerSize[size];
  const baseContainer: ViewStyle = {
    alignItems: 'center',
    height: dimension,
    justifyContent: 'center',
    width: dimension,
    borderRadius: iconButtonSpecs.borderRadius,
  };

  if (visualState === 'disabled') {
    if (variant === 'ghost') {
      return {
        container: {
          ...baseContainer,
          backgroundColor: 'transparent',
        },
      };
    }

    return {
      container: {
        ...baseContainer,
        backgroundColor: neutral[30],
      },
    };
  }

  if (visualState === 'hovered') {
    if (variant === 'ghost') {
      return {
        container: {
          ...baseContainer,
          backgroundColor: background.background1,
        },
      };
    }

    return {
      container: {
        ...baseContainer,
        backgroundColor: purple[20],
      },
    };
  }

  if (variant === 'ghost') {
    return {
      container: {
        ...baseContainer,
        backgroundColor: 'transparent',
      },
    };
  }

  return {
    container: {
      ...baseContainer,
      backgroundColor: purple[10],
    },
  };
}

export function getIconButtonIconColor(
  variant: IconButtonVariant,
  visualState: IconButtonAppearanceValue,
): string {
  if (visualState === 'disabled') {
    return text.disabled;
  }

  if (variant === 'ghost') {
    return text.primary;
  }

  return purple[40];
}

export function getIconButtonBackgroundColors(
  variant: IconButtonVariant,
  visualState: IconButtonAppearanceValue,
): [string, string] {
  const activeStyles = getIconButtonStyles(variant, 'normal', 'active');
  const hoveredStyles = getIconButtonStyles(variant, 'normal', 'hovered');
  const disabledStyles = getIconButtonStyles(variant, 'normal', 'disabled');

  if (visualState === 'disabled') {
    const color = disabledStyles.container.backgroundColor as string;
    return [color, color];
  }

  return [
    activeStyles.container.backgroundColor as string,
    hoveredStyles.container.backgroundColor as string,
  ];
}

export function getIconButtonBackgroundColor(
  variant: IconButtonVariant,
  visualState: IconButtonAppearanceValue,
): string {
  return getIconButtonStyles(variant, 'normal', visualState).container.backgroundColor as string;
}
