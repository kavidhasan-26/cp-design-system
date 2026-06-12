import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
  type StyleProp,
  type TextInput as RNTextInputType,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { CircleTickIcon } from '../icons/CircleTickIcon';
import { WarningIcon } from '../icons/WarningIcon';
import {
  getCellBorderColor,
  getOtpInputStyles,
  otpInputSpecs,
  type OtpInputHelper,
  type OtpInputAppearanceValue,
} from './otpInputStyles';
import { getWebTextInputStyle } from '../shared/webTextInputStyle';

/** Matches Figma property: Appearance */
export type OtpInputAppearance = OtpInputAppearanceValue;

export type OtpInputProps = {
  label?: boolean | string;
  helper?: OtpInputHelper;
  helperText?: string;
  /** Number of OTP cells. Defaults to 4 per Figma. */
  length?: number;
  value?: string;
  /** Locks appearance for Storybook. Omit in app code for live focus and typing. */
  appearance?: OtpInputAppearance;
  fullWidth?: boolean;
  disabled?: boolean;
  onChangeText?: (value: string) => void;
  onComplete?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function normalizeHelper(helper: OtpInputHelper | undefined): OtpInputHelper {
  return helper ?? 'none';
}

function sanitizeValue(value: string, length: number): string {
  return value.replace(/\D/g, '').slice(0, length);
}

function resolveVisualState(
  appearance: OtpInputAppearance | undefined,
  disabled: boolean,
  focused: boolean,
  value: string,
  length: number,
): OtpInputAppearanceValue {
  if (disabled || appearance === 'disabled') {
    return 'disabled';
  }

  if (focused) {
    return value.length >= length ? 'filled' : 'active';
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

  if (value.length >= length) {
    return 'filled';
  }

  if (value.length > 0) {
    return 'active';
  }

  return 'enabled';
}

function getActiveCellIndex(
  appearance: OtpInputAppearance | undefined,
  focused: boolean,
  valueLength: number,
  length: number,
): number | null {
  if (focused) {
    return Math.min(valueLength, length - 1);
  }

  if (appearance === 'active') {
    return 0;
  }

  if (appearance === 'filled') {
    return length - 1;
  }

  return null;
}

function getBorderAnimationValue(helper: OtpInputHelper, isActiveCell: boolean): number {
  if (helper === 'error') {
    return 2;
  }

  if (isActiveCell) {
    return 1;
  }

  return 0;
}

export function OtpInput({
  label = true,
  helper = 'none',
  helperText = 'Helper message',
  length = otpInputSpecs.length,
  value = '',
  appearance,
  fullWidth = false,
  disabled = false,
  onChangeText,
  onComplete,
  style,
  testID,
}: OtpInputProps) {
  const inputRef = useRef<RNTextInputType>(null);
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(() => sanitizeValue(value, length));

  const resolvedValue = sanitizeValue(onChangeText ? value : internalValue, length);
  const normalizedHelper = normalizeHelper(helper);
  const visualState = resolveVisualState(appearance, disabled, focused, resolvedValue, length);
  const styles = getOtpInputStyles(visualState, normalizedHelper, fullWidth);
  const isEditable = visualState !== 'disabled';
  const labelText = typeof label === 'string' ? label : 'Label';
  const activeCellIndex = getActiveCellIndex(appearance, focused, resolvedValue.length, length);

  const borderAnims = useRef(Array.from({ length }, () => new Animated.Value(0))).current;

  const webInputStyle = getWebTextInputStyle({ caretColor: 'transparent' });

  useEffect(() => {
    if (!onChangeText) {
      setInternalValue(sanitizeValue(value, length));
    }
  }, [length, onChangeText, value]);

  useEffect(() => {
    borderAnims.forEach((anim, index) => {
      const isActiveCell = activeCellIndex === index;
      Animated.timing(anim, {
        toValue: getBorderAnimationValue(normalizedHelper, isActiveCell),
        duration: otpInputSpecs.transitionDuration,
        useNativeDriver: false,
      }).start();
    });
  }, [activeCellIndex, borderAnims, length, normalizedHelper]);

  function updateValue(nextRawValue: string) {
    const nextValue = sanitizeValue(nextRawValue, length);

    if (!onChangeText) {
      setInternalValue(nextValue);
    }

    onChangeText?.(nextValue);

    if (nextValue.length === length) {
      onComplete?.(nextValue);
    }
  }

  return (
    <View style={[styles.root, style]} testID={testID}>
      {label ? <Text style={styles.label}>{labelText}</Text> : null}

      <Pressable
        accessibilityRole="none"
        disabled={!isEditable}
        onPress={() => inputRef.current?.focus()}
        style={styles.cellRow}
      >
        {Array.from({ length }, (_, index) => {
          const digit = resolvedValue[index] ?? '';
          const showCaret = focused && activeCellIndex === index && digit.length === 0;
          const borderColor = borderAnims[index].interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
              otpInputSpecs.colors.borderDefault,
              otpInputSpecs.colors.borderActive,
              otpInputSpecs.colors.borderError,
            ],
          });

          return (
            <Animated.View key={index} style={[styles.cell, { borderColor }]}>
              {showCaret ? <View style={componentStyles.caret} /> : null}
              {digit ? <Text style={styles.cellText}>{digit}</Text> : null}
            </Animated.View>
          );
        })}
      </Pressable>

      <RNTextInput
        ref={inputRef}
        autoComplete={Platform.OS === 'web' ? 'one-time-code' : 'sms-otp'}
        caretHidden
        editable={isEditable}
        keyboardType="number-pad"
        maxLength={length}
        onBlur={() => setFocused(false)}
        onChangeText={updateValue}
        onFocus={() => setFocused(true)}
        selectionColor="transparent"
        style={[styles.hiddenInput, webInputStyle]}
        textContentType="oneTimeCode"
        underlineColorAndroid="transparent"
        value={resolvedValue}
      />

      {normalizedHelper !== 'none' ? (
        <View style={styles.helperRow}>
          {normalizedHelper === 'error' ? <WarningIcon /> : null}
          {normalizedHelper === 'success' ? (
            <CircleTickIcon size={otpInputSpecs.successIconSize} />
          ) : null}
          <Text style={styles.helperText}>{helperText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const componentStyles = StyleSheet.create({
  caret: {
    backgroundColor: otpInputSpecs.colors.caret,
    height: 18,
    width: 1,
  },
});

export { getCellBorderColor, getOtpInputStyles, otpInputSpecs };
export type { OtpInputHelper, OtpInputAppearanceValue };
