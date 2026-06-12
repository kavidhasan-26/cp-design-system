import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
  type StyleProp,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';
import { EyeClosedIcon, EyeOpenIcon } from '../icons/EyeIcons';
import { CircleTickIcon } from '../icons/CircleTickIcon';
import { WarningIcon } from '../icons/WarningIcon';
import { getWebTextInputStyle } from '../shared/webTextInputStyle';
import {
  getPasswordInputStyles,
  passwordInputSpecs,
  textInputSpecs,
  type PasswordInputAppearanceValue,
  type PasswordInputHelper,
} from './passwordInputStyles';

/** Matches Figma property: Appearance */
export type PasswordInputAppearance = PasswordInputAppearanceValue;

/** Matches Figma property: Visibility — locks password visibility for Storybook/docs. */
export type PasswordInputVisibility = 'hidden' | 'visible';

export type PasswordInputProps = {
  /** Figma property: Label — when true, renders the default "Label" copy. Pass a string to customize. */
  label?: boolean | string;
  /** Figma property: Helper */
  helper?: PasswordInputHelper;
  /** Figma property: Helper text */
  helperText?: string;
  /** Figma property: Placeholder */
  placeholder?: string;
  /** Figma property: Value */
  value?: string;
  /** Figma property: Appearance — locks appearance for Storybook/docs. Omit in app code for live focus/value behavior. */
  appearance?: PasswordInputAppearance;
  /** Figma property: Visibility — locks visibility for Storybook/docs. Omit in app code for live toggle behavior. */
  visibility?: PasswordInputVisibility;
  /** Controlled password visibility. */
  visible?: boolean;
  /** Initial visibility when uncontrolled. Defaults to hidden. */
  defaultVisible?: boolean;
  /** Stretches the input to fill the width of its parent container. */
  fullWidth?: boolean;
  /** Convenience alias for appearance="disabled" in app code. */
  disabled?: boolean;
  onChangeText?: (value: string) => void;
  onVisibilityChange?: (visible: boolean) => void;
  onFocus?: RNTextInputProps['onFocus'];
  onBlur?: RNTextInputProps['onBlur'];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function normalizeHelper(helper: PasswordInputHelper | undefined): PasswordInputHelper {
  return helper ?? 'none';
}

function resolveVisualState(
  appearance: PasswordInputAppearance | undefined,
  disabled: boolean,
  focused: boolean,
  hasValue: boolean,
): PasswordInputAppearanceValue {
  if (disabled || appearance === 'disabled') {
    return 'disabled';
  }

  if (focused) {
    return 'active';
  }

  if (appearance === 'active') {
    return 'active';
  }

  if (appearance === 'filled') {
    return 'filled';
  }

  if (appearance === 'enabled') {
    return 'enabled';
  }

  if (hasValue) {
    return 'filled';
  }

  return 'enabled';
}

function resolveVisible(
  visibility: PasswordInputVisibility | undefined,
  visible: boolean | undefined,
  internalVisible: boolean,
): boolean {
  if (visibility === 'visible') {
    return true;
  }

  if (visibility === 'hidden') {
    return false;
  }

  return visible ?? internalVisible;
}

function getBorderAnimationValue(
  visualState: PasswordInputAppearanceValue,
  helper: PasswordInputHelper,
): number {
  if (helper === 'error') {
    return 2;
  }

  if (visualState === 'active') {
    return 1;
  }

  return 0;
}

export function PasswordInput({
  label = true,
  helper = 'none',
  helperText = 'Helper message',
  placeholder = passwordInputSpecs.defaultPlaceholder,
  value,
  appearance,
  visibility,
  visible,
  defaultVisible = false,
  fullWidth = false,
  disabled = false,
  onChangeText,
  onVisibilityChange,
  onFocus,
  onBlur,
  style,
  testID,
}: PasswordInputProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [internalVisible, setInternalVisible] = useState(defaultVisible);

  const resolvedValue = value !== undefined ? value : internalValue;
  const hasValue = resolvedValue.length > 0;
  const normalizedHelper = normalizeHelper(helper);
  const visualState = resolveVisualState(appearance, disabled, focused, hasValue);
  const resolvedVisible = resolveVisible(visibility, visible, internalVisible);
  const isEditable = visualState !== 'disabled';
  const isToggleInteractive = isEditable && visibility === undefined;
  const borderAnim = useRef(
    new Animated.Value(getBorderAnimationValue(visualState, normalizedHelper)),
  ).current;
  const styles = getPasswordInputStyles(visualState, normalizedHelper, hasValue, fullWidth);
  const labelText = typeof label === 'string' ? label : 'Label';
  const iconColor = textInputSpecs.colors.placeholder;

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      textInputSpecs.colors.borderDefault,
      textInputSpecs.colors.borderActive,
      textInputSpecs.colors.borderError,
    ],
  });

  const targetBorderValue = useMemo(
    () => getBorderAnimationValue(visualState, normalizedHelper),
    [normalizedHelper, visualState],
  );

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: targetBorderValue,
      duration: textInputSpecs.transitionDuration,
      useNativeDriver: false,
    }).start();
  }, [borderAnim, targetBorderValue]);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  function handleChangeText(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChangeText?.(nextValue);
  }

  function handleFocus(event: Parameters<NonNullable<RNTextInputProps['onFocus']>>[0]) {
    setFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: Parameters<NonNullable<RNTextInputProps['onBlur']>>[0]) {
    setFocused(false);
    onBlur?.(event);
  }

  function handleToggleVisibility() {
    if (!isToggleInteractive) {
      return;
    }

    const nextVisible = !resolvedVisible;

    if (visible === undefined) {
      setInternalVisible(nextVisible);
    }

    onVisibilityChange?.(nextVisible);
  }

  return (
    <View style={[styles.root, style]} testID={testID}>
      {label ? <Text style={styles.label}>{labelText}</Text> : null}

      <Animated.View style={[styles.field, { borderColor }]}>
        <RNTextInput
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          caretHidden={false}
          cursorColor={textInputSpecs.colors.borderActive}
          editable={isEditable}
          key={Platform.OS === 'web' ? (resolvedVisible ? 'visible' : 'hidden') : undefined}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={textInputSpecs.colors.placeholder}
          secureTextEntry={!resolvedVisible}
          selectionColor={textInputSpecs.colors.borderActive}
          style={[
            styles.input,
            componentStyles.inputWithToggle,
            getWebTextInputStyle({
              caretColor: textInputSpecs.colors.borderActive,
              ...(Platform.OS === 'web'
                ? { type: resolvedVisible ? 'text' : 'password' }
                : null),
            }),
          ]}
          textContentType="password"
          underlineColorAndroid="transparent"
          value={resolvedValue}
        />

        <Pressable
          accessibilityLabel={resolvedVisible ? 'Hide password' : 'Show password'}
          accessibilityRole="button"
          accessibilityState={{ disabled: !isToggleInteractive }}
          disabled={!isToggleInteractive}
          hitSlop={8}
          onPress={handleToggleVisibility}
          style={({ pressed }) => [
            componentStyles.iconButton,
            pressed && isToggleInteractive ? { opacity: 0.8 } : null,
          ]}
          testID={testID ? `${testID}-toggle` : undefined}
        >
          {resolvedVisible ? (
            <EyeOpenIcon accessibilityLabel="Hide password" color={iconColor} size={textInputSpecs.iconSize} />
          ) : (
            <EyeClosedIcon accessibilityLabel="Show password" color={iconColor} size={textInputSpecs.iconSize} />
          )}
        </Pressable>
      </Animated.View>

      {normalizedHelper !== 'none' ? (
        <View style={styles.helperRow}>
          {normalizedHelper === 'error' ? <WarningIcon /> : null}
          {normalizedHelper === 'success' ? (
            <CircleTickIcon size={textInputSpecs.successIconSize} />
          ) : null}
          <Text style={styles.helperText}>{helperText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const componentStyles = StyleSheet.create({
  inputWithToggle: {
    flex: 1,
    minWidth: 0,
    width: undefined,
  },
  iconButton: {
    alignItems: 'center',
    height: textInputSpecs.iconSize,
    justifyContent: 'center',
    width: textInputSpecs.iconSize,
    zIndex: 1,
  },
});

export { getPasswordInputStyles, passwordInputSpecs };
