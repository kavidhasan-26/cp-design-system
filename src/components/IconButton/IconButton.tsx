import { cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react';
import {
  Animated,
  Pressable,
  View,
  type Insets,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  getCompactIconButtonLayout,
  getIconButtonBackgroundColor,
  getIconButtonBackgroundColors,
  getIconButtonFeedbackSize,
  getIconButtonIconColor,
  getIconButtonStyles,
  iconButtonSpecs,
  type IconButtonAppearanceValue,
  type IconButtonSize,
  type IconButtonVariant,
} from './iconButtonStyles';

/** Matches Figma property: State */
export type IconButtonAppearance = IconButtonAppearanceValue;

export type IconButtonProps = {
  /** Icon rendered inside the circular hit target. */
  icon: ReactNode;
  /** Figma property: Variant — default uses purple surfaces; ghost is transparent until pressed. */
  variant?: IconButtonVariant;
  /** Figma property: Size */
  size?: IconButtonSize;
  /**
   * Hugs the icon in layout and centers press feedback on it.
   * Use when the icon is smaller than the hit target and should align with adjacent text (e.g. Bottomsheet close).
   */
  compact?: boolean;
  /** Rendered icon size in px — required when compact is true. */
  iconSize?: number;
  /** Figma property: State — locks appearance for Hovered/Pressed or Disabled. Active allows live press feedback. */
  appearance?: IconButtonAppearance;
  /** Convenience alias for appearance="disabled" in app code. */
  disabled?: boolean;
  /** Required for icon-only controls. */
  accessibilityLabel: string;
  onPress?: () => void;
  hitSlop?: number | Insets;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function resolveVisualState(
  appearance: IconButtonAppearance | undefined,
  disabled: boolean,
  pressed: boolean,
): IconButtonAppearanceValue {
  if (disabled || appearance === 'disabled') {
    return 'disabled';
  }

  if (appearance === 'hovered') {
    return 'hovered';
  }

  if (pressed) {
    return 'hovered';
  }

  return 'active';
}

function getInteractionValue(visualState: IconButtonAppearanceValue): number {
  return visualState === 'hovered' ? 1 : 0;
}

function renderIcon(icon: ReactNode, color: string): ReactNode {
  if (isValidElement(icon)) {
    const iconElement = icon as ReactElement<{ color?: string }>;

    if ('color' in iconElement.props) {
      return cloneElement(iconElement, { color });
    }
  }

  return icon;
}

function useAnimatedBackground(
  variant: IconButtonVariant,
  visualState: IconButtonAppearanceValue,
) {
  const interactionAnim = useRef(new Animated.Value(0)).current;
  const [activeBackground, hoveredBackground] = getIconButtonBackgroundColors(variant, visualState);

  useEffect(() => {
    Animated.timing(interactionAnim, {
      toValue: getInteractionValue(visualState),
      duration: iconButtonSpecs.transitionDuration,
      useNativeDriver: false,
    }).start();
  }, [interactionAnim, visualState]);

  if (visualState === 'disabled') {
    return {
      style: {
        backgroundColor: getIconButtonBackgroundColor(variant, visualState),
      },
    };
  }

  return {
    style: {
      backgroundColor: interactionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [activeBackground, hoveredBackground],
      }),
    },
  };
}

export function IconButton({
  icon,
  variant = 'default',
  size = 'normal',
  compact = false,
  iconSize,
  appearance,
  disabled = false,
  accessibilityLabel,
  onPress,
  hitSlop,
  style,
  testID,
}: IconButtonProps) {
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || appearance === 'disabled';
  const visualState = resolveVisualState(appearance, disabled, pressed);
  const iconColor = getIconButtonIconColor(variant, visualState);
  const renderedIcon = renderIcon(icon, iconColor);
  const animatedBackground = useAnimatedBackground(variant, visualState);

  if (compact) {
    if (iconSize === undefined) {
      throw new Error('IconButton: iconSize is required when compact is true.');
    }

    const feedbackSize = getIconButtonFeedbackSize(size);
    const layout = getCompactIconButtonLayout(iconSize, feedbackSize);

    return (
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled }}
        disabled={isDisabled}
        hitSlop={hitSlop}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[componentStyles.compactPressable, style]}
        testID={testID}
      >
        <View style={layout.iconFrame}>
          <Animated.View style={[layout.feedback, animatedBackground.style]} />
          {renderedIcon}
        </View>
      </Pressable>
    );
  }

  const styles = getIconButtonStyles(variant, size, visualState);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      hitSlop={hitSlop}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={style}
      testID={testID}
    >
      <Animated.View style={[styles.container, animatedBackground.style]}>{renderedIcon}</Animated.View>
    </Pressable>
  );
}

const componentStyles = {
  compactPressable: {
    alignSelf: 'flex-start',
  } satisfies ViewStyle,
};

export { iconButtonSpecs, getIconButtonStyles, getIconButtonIconColor };
export type { IconButtonVariant, IconButtonSize, IconButtonAppearanceValue };
