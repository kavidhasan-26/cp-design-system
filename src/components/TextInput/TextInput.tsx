import type { ReactNode } from 'react';
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
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { renderIconSlot } from '../icons/iconUtils';
import { CircleTickIcon } from '../icons/CircleTickIcon';
import { WarningIcon } from '../icons/WarningIcon';
import { purple } from '../../tokens/primitives/colors';
import {
  getFieldBorderColor,
  getTextInputStyles,
  textInputSpecs,
  type TextInputHelper,
  type TextInputAppearanceValue,
} from './textInputStyles';

/** Matches Figma property: Appearance */
export type TextInputAppearance = TextInputAppearanceValue;

/** Controls how typed text is capitalized. */
export type TextInputTextCase = 'default' | 'uppercase' | 'lowercase' | 'capitalize' | 'none';

export type TextInputProps = {
  /** Figma property: Label — when true, renders the default "Label" copy. Pass a string to customize. */
  label?: boolean | string;
  /** Figma property: Helper */
  helper?: TextInputHelper;
  /** Figma property: Helper text */
  helperText?: string;
  /** Figma property: Placeholder */
  placeholder?: string;
  /** Figma property: Value */
  value?: string;
  /** Figma property: Appearance — locks appearance for Storybook/docs. Omit in app code for live focus/value behavior. */
  appearance?: TextInputAppearance;
  /** Stretches the input to fill the width of its parent container. */
  fullWidth?: boolean;
  /** Convenience alias for state="disabled" in app code. */
  disabled?: boolean;
  /** Figma property: Leading icon */
  iconLeading?: boolean | ReactNode;
  /** Figma property: Trailing icon */
  iconTrailing?: boolean | ReactNode;
  /** Native keyboard layout shown when the field is focused. */
  keyboardType?: RNTextInputProps['keyboardType'];
  /** Controls automatic capitalization while typing. */
  textCase?: TextInputTextCase;
  onChangeText?: (value: string) => void;
  onFocus?: RNTextInputProps['onFocus'];
  onBlur?: RNTextInputProps['onBlur'];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function normalizeHelper(helper: TextInputHelper | undefined): TextInputHelper {
  return helper ?? 'none';
}

function resolveVisualState(
  appearance: TextInputAppearance | undefined,
  disabled: boolean,
  loading: boolean,
  focused: boolean,
  hasValue: boolean,
): TextInputAppearanceValue {
  if (disabled || appearance === 'disabled') {
    return 'disabled';
  }

  if (loading || appearance === 'loading') {
    return 'loading';
  }

  // Active in Figma maps to focused in app code.
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

function getBorderAnimationValue(visualState: TextInputAppearanceValue, helper: TextInputHelper): number {
  if (helper === 'error') {
    return 2;
  }

  if (visualState === 'active') {
    return 1;
  }

  return 0;
}

function getAutoCapitalize(textCase: TextInputTextCase): RNTextInputProps['autoCapitalize'] {
  switch (textCase) {
    case 'uppercase':
      return 'characters';
    case 'lowercase':
    case 'none':
      return 'none';
    case 'capitalize':
      return 'words';
    default:
      return 'sentences';
  }
}

function applyTextCase(value: string, textCase: TextInputTextCase): string {
  switch (textCase) {
    case 'uppercase':
      return value.toUpperCase();
    case 'lowercase':
      return value.toLowerCase();
    default:
      return value;
  }
}

export function TextInput({
  label = true,
  helper = 'none',
  helperText = 'Helper message',
  placeholder = 'Placeholder',
  value = '',
  appearance,
  fullWidth = false,
  disabled = false,
  iconLeading,
  iconTrailing,
  keyboardType = 'default',
  textCase = 'default',
  onChangeText,
  onFocus,
  onBlur,
  style,
  testID,
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const resolvedValue = onChangeText ? value : internalValue;
  const hasValue = resolvedValue.length > 0;
  const normalizedHelper = normalizeHelper(helper);
  const visualState = resolveVisualState(appearance, disabled, false, focused, hasValue);
  const borderAnim = useRef(
    new Animated.Value(getBorderAnimationValue(visualState, normalizedHelper)),
  ).current;
  const styles = getTextInputStyles(visualState, normalizedHelper, hasValue, fullWidth);
  const isEditable = visualState !== 'disabled' && visualState !== 'loading';
  const showLoadingIndicator = visualState === 'loading';
  const labelText = typeof label === 'string' ? label : 'Label';

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
      setInternalValue(value);
    }
  }, [onChangeText, value]);

  function handleChangeText(nextValue: string) {
    const formattedValue = applyTextCase(nextValue, textCase);

    if (!onChangeText) {
      setInternalValue(formattedValue);
    }

    onChangeText?.(formattedValue);
  }

  function handleFocus(event: Parameters<NonNullable<RNTextInputProps['onFocus']>>[0]) {
    setFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: Parameters<NonNullable<RNTextInputProps['onBlur']>>[0]) {
    setFocused(false);
    onBlur?.(event);
  }

  const leadingIcon = renderIconSlot(iconLeading, textInputSpecs.colors.placeholder);
  const trailingIcon = renderIconSlot(iconTrailing, textInputSpecs.colors.placeholder);

  return (
    <View style={[styles.root, style]} testID={testID}>
      {label ? <Text style={styles.label}>{labelText}</Text> : null}

      <Animated.View style={[styles.field, { borderColor }]}>
        {leadingIcon ? <View style={componentStyles.iconSlot}>{leadingIcon}</View> : null}

        <RNTextInput
          autoCapitalize={getAutoCapitalize(textCase)}
          autoCorrect={textCase === 'default' || textCase === 'capitalize'}
          caretHidden={false}
          cursorColor={textInputSpecs.colors.borderActive}
          editable={isEditable}
          keyboardType={keyboardType}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={textInputSpecs.colors.placeholder}
          selectionColor={textInputSpecs.colors.borderActive}
          style={[styles.input, webInputStyle]}
          underlineColorAndroid="transparent"
          value={resolvedValue}
        />

        {showLoadingIndicator ? (
          <ActivityIndicator color={purple[40]} size="small" style={componentStyles.loader} />
        ) : null}

        {!showLoadingIndicator && trailingIcon ? (
          <View style={componentStyles.iconSlot}>{trailingIcon}</View>
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

const webInputStyle =
  Platform.OS === 'web'
    ? ({
        caretColor: textInputSpecs.colors.borderActive,
        cursor: 'text',
        outlineWidth: 0,
      } as unknown as TextStyle)
    : undefined;

const componentStyles = StyleSheet.create({
  iconSlot: {
    alignItems: 'center',
    height: textInputSpecs.iconSize,
    justifyContent: 'center',
    width: textInputSpecs.iconSize,
  },
  loader: {
    height: textInputSpecs.iconSize,
    width: textInputSpecs.iconSize,
  },
});

export { ArrowRightIcon, getFieldBorderColor, getTextInputStyles, textInputSpecs };
export type { TextInputHelper, TextInputAppearanceValue };
