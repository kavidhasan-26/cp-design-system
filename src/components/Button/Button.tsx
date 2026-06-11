import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { purple } from '../../tokens/primitives/colors';
import { border } from '../../tokens/semantic/colors';
import { getButtonIconColor, renderIconSlot } from '../icons/iconUtils';
import {
  buttonSpecs,
  getButtonStyles,
  type ButtonHierarchy,
  type ButtonSize,
  type ButtonAppearanceValue,
} from './buttonStyles';

/** Matches Figma property: Appearance */
export type ButtonAppearance = ButtonAppearanceValue;

export type ButtonProps = {
  /** Figma property: Label */
  label?: string;
  /** Figma property: Hierarchy */
  hierarchy?: ButtonHierarchy;
  /** Figma property: Size */
  size?: ButtonSize;
  /** Figma property: Appearance — locks appearance only for Hovered/Pressed or Disabled. Active allows live press feedback. */
  appearance?: ButtonAppearance;
  /** Stretches the button to fill the width of its parent container. */
  fullWidth?: boolean;
  /** Convenience alias for appearance="disabled" in app code. */
  disabled?: boolean;
  onPress?: () => void;
  /** Figma property: Icon leading */
  iconLeading?: boolean | ReactNode;
  /** Figma property: Icon trailing */
  iconTrailing?: boolean | ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function resolveVisualState(
  appearance: ButtonAppearance | undefined,
  disabled: boolean,
  pressed: boolean,
): ButtonAppearanceValue {
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

function getInteractionValue(visualState: ButtonAppearanceValue): number {
  return visualState === 'hovered' ? 1 : 0;
}

function getAnimatedContainerStyle(
  hierarchy: ButtonHierarchy,
  size: ButtonSize,
  visualState: ButtonAppearanceValue,
  interactionAnim: Animated.Value,
) {
  const styles = getButtonStyles(hierarchy, size, 'active');
  const hoveredStyles = getButtonStyles(hierarchy, size, 'hovered');
  const disabledStyles = getButtonStyles(hierarchy, size, 'disabled');

  if (visualState === 'disabled') {
    return disabledStyles.container;
  }

  if (hierarchy === 'primary') {
    return {
      ...styles.container,
      backgroundColor: interactionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          styles.container.backgroundColor as string,
          hoveredStyles.container.backgroundColor as string,
        ],
      }),
    };
  }

  if (hierarchy === 'secondary') {
    return {
      ...styles.container,
      backgroundColor: interactionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0,0,0,0)', purple[10]],
      }),
      borderColor: border.borderPurple,
      borderWidth: buttonSpecs.borderWidth,
    };
  }

  return {
    ...styles.container,
    backgroundColor: interactionAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0)', purple[10]],
    }),
  };
}

export function Button({
  label = 'Button',
  hierarchy = 'primary',
  size = 'normal',
  appearance,
  fullWidth = false,
  disabled = false,
  onPress,
  iconLeading,
  iconTrailing,
  style,
  testID,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const interactionAnim = useRef(new Animated.Value(0)).current;
  const isDisabled = disabled || appearance === 'disabled';
  const visualState = resolveVisualState(appearance, disabled, pressed);
  const styles = getButtonStyles(hierarchy, size, visualState);
  const animatedContainerStyle = getAnimatedContainerStyle(
    hierarchy,
    size,
    visualState,
    interactionAnim,
  );

  useEffect(() => {
    Animated.timing(interactionAnim, {
      toValue: getInteractionValue(visualState),
      duration: buttonSpecs.transitionDuration,
      useNativeDriver: false,
    }).start();
  }, [interactionAnim, visualState]);

  const iconColor = getButtonIconColor(hierarchy, visualState);
  const leadingIcon = renderIconSlot(iconLeading, iconColor);
  const trailingIcon = renderIconSlot(iconTrailing, iconColor);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      testID={testID}
      style={[fullWidth && componentStyles.fullWidth, style]}
    >
      <Animated.View style={animatedContainerStyle}>
        {leadingIcon ? <View style={componentStyles.iconSlot}>{leadingIcon}</View> : null}
        <Text style={styles.label}>{label}</Text>
        {trailingIcon ? <View style={componentStyles.iconSlot}>{trailingIcon}</View> : null}
      </Animated.View>
    </Pressable>
  );
}

const componentStyles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  iconSlot: {
    alignItems: 'center',
    height: buttonSpecs.iconSize,
    justifyContent: 'center',
    width: buttonSpecs.iconSize,
  },
});

export { buttonSpecs, getButtonStyles };
export type { ButtonHierarchy, ButtonSize, ButtonAppearanceValue };
