import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
  type StyleProp,
  type TextInputProps as RNTextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { CircleTickIcon } from '../icons/CircleTickIcon';
import { WarningIcon } from '../icons/WarningIcon';
import { purple } from '../../tokens/primitives/colors';
import {
  getPhoneNumberInputStyles,
  phoneNumberInputSpecs,
  textInputSpecs,
  type PhoneNumberInputAppearanceValue,
  type PhoneNumberInputHelper,
} from './phoneNumberInputStyles';
import type { TextInputSize } from '../TextInput/textInputStyles';
import { getWebTextInputStyle } from '../shared/webTextInputStyle';

/** Matches Figma property: Appearance */
export type PhoneNumberInputAppearance = PhoneNumberInputAppearanceValue;

export type PhoneNumberInputProps = {
  /** Figma property: Label — when true, renders the field label above the input. */
  label?: boolean;
  /** Figma property: Label text */
  labelText?: string;
  /** Figma property: Helper */
  helper?: PhoneNumberInputHelper;
  /** Figma property: Helper text */
  helperText?: string;
  /** Figma property: Country code — shown in Text/Secondary before the number field. */
  countryCode?: string;
  /** Figma property: Placeholder — digit hint from 1 through 0. */
  placeholder?: string;
  /** Figma property: Value — national number digits only. */
  value?: string;
  /** Figma property: Appearance — locks appearance for Storybook/docs. Omit in app code for live focus/value behavior. */
  appearance?: PhoneNumberInputAppearance;
  /** Figma property: Size — normal or large field height. */
  size?: TextInputSize;
  /** Stretches the input to fill the width of its parent container. */
  fullWidth?: boolean;
  /** Convenience alias for appearance="disabled" in app code. */
  disabled?: boolean;
  /** Maximum national digits accepted. Defaults to 10 for +91 numbers. */
  maxLength?: number;
  onChangeText?: (value: string) => void;
  onFocus?: RNTextInputProps['onFocus'];
  onBlur?: RNTextInputProps['onBlur'];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function normalizeHelper(helper: PhoneNumberInputHelper | undefined): PhoneNumberInputHelper {
  return helper ?? 'none';
}

function sanitizeDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function resolveVisualState(
  appearance: PhoneNumberInputAppearance | undefined,
  disabled: boolean,
  loading: boolean,
  focused: boolean,
  hasValue: boolean,
): PhoneNumberInputAppearanceValue {
  if (disabled || appearance === 'disabled') {
    return 'disabled';
  }

  if (loading || appearance === 'loading') {
    return 'loading';
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

function getBorderAnimationValue(
  visualState: PhoneNumberInputAppearanceValue,
  helper: PhoneNumberInputHelper,
): number {
  if (helper === 'error') {
    return 2;
  }

  if (visualState === 'active') {
    return 1;
  }

  return 0;
}

export function PhoneNumberInput({
  label = true,
  labelText = 'Label',
  helper = 'none',
  helperText = 'Helper message',
  countryCode = phoneNumberInputSpecs.defaultCountryCode,
  placeholder = phoneNumberInputSpecs.defaultPlaceholder,
  value = '',
  appearance,
  size = 'normal',
  fullWidth = false,
  disabled = false,
  maxLength = phoneNumberInputSpecs.maxLength,
  onChangeText,
  onFocus,
  onBlur,
  style,
  testID,
}: PhoneNumberInputProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(sanitizeDigits(value));

  const resolvedValue = onChangeText ? sanitizeDigits(value) : internalValue;
  const hasValue = resolvedValue.length > 0;
  const normalizedHelper = normalizeHelper(helper);
  const visualState = resolveVisualState(appearance, disabled, false, focused, hasValue);
  const borderAnim = useRef(
    new Animated.Value(getBorderAnimationValue(visualState, normalizedHelper)),
  ).current;
  const styles = getPhoneNumberInputStyles(visualState, normalizedHelper, hasValue, fullWidth, size);
  const isEditable = visualState !== 'disabled' && visualState !== 'loading';
  const showLoadingIndicator = visualState === 'loading';

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
    if (!onChangeText) {
      setInternalValue(sanitizeDigits(value));
    }
  }, [onChangeText, value]);

  function handleChangeText(nextValue: string) {
    const digits = sanitizeDigits(nextValue).slice(0, maxLength);

    if (!onChangeText) {
      setInternalValue(digits);
    }

    onChangeText?.(digits);
  }

  function handleFocus(event: Parameters<NonNullable<RNTextInputProps['onFocus']>>[0]) {
    setFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: Parameters<NonNullable<RNTextInputProps['onBlur']>>[0]) {
    setFocused(false);
    onBlur?.(event);
  }

  return (
    <View style={[styles.root, style]} testID={testID}>
      {label ? <Text style={styles.label}>{labelText}</Text> : null}

      <Animated.View style={[styles.field, { borderColor }]}>
        <Text style={styles.countryCode}>{countryCode}</Text>

        <RNTextInput
          autoComplete="tel"
          autoCorrect={false}
          caretHidden={false}
          cursorColor={textInputSpecs.colors.borderActive}
          editable={isEditable}
          keyboardType="phone-pad"
          maxLength={maxLength}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={textInputSpecs.colors.placeholder}
          selectionColor={textInputSpecs.colors.borderActive}
          style={[styles.input, getWebTextInputStyle({ caretColor: textInputSpecs.colors.borderActive })]}
          textContentType="telephoneNumber"
          underlineColorAndroid="transparent"
          value={resolvedValue}
        />

        {showLoadingIndicator ? (
          <ActivityIndicator color={purple[40]} size="small" style={componentStyles.loader} />
        ) : null}
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
  loader: {
    height: textInputSpecs.iconSize,
    width: textInputSpecs.iconSize,
  },
});

export { getPhoneNumberInputStyles, phoneNumberInputSpecs };
