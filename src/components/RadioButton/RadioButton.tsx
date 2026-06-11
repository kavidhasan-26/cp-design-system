import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  getRadioButtonStyles,
  isRadioButtonSelected,
  radioButtonSpecs,
  resolveRadioButtonVariant,
  type RadioButtonVariant,
} from './radioButtonStyles';

export type { RadioButtonVariant };

export type RadioButtonProps = {
  /** Figma property: Label */
  label?: string;
  /** Figma property: Variant — locks appearance for Storybook/docs. Omit in app code to derive from selected, bordered, and disabled. */
  variant?: RadioButtonVariant;
  /** Whether the option is selected. */
  selected?: boolean;
  /** When false, renders the plain (no border) variant. Defaults to true. */
  bordered?: boolean;
  /** Convenience alias for type="disabled" in app code. */
  disabled?: boolean;
  /** Stretches the control to fill the width of its parent container. */
  fullWidth?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function RadioButton({
  label = 'Label',
  variant,
  selected = false,
  bordered = true,
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  testID,
}: RadioButtonProps) {
  const visualVariant = resolveRadioButtonVariant(variant, disabled, selected, bordered);
  const stylesForType = getRadioButtonStyles(visualVariant);
  const isSelected = isRadioButtonSelected(visualVariant);
  const isDisabled = visualVariant === 'disabled';

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        stylesForType.container,
        fullWidth ? styles.fullWidth : styles.fixedWidth,
        pressed && !isDisabled ? styles.pressed : null,
        style,
      ]}
      testID={testID}
    >
      <Text style={stylesForType.label}>{label}</Text>
      <View style={stylesForType.indicator}>
        {stylesForType.indicatorDot ? <View style={stylesForType.indicatorDot} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  fixedWidth: {
    maxWidth: radioButtonSpecs.fixedWidth,
    width: radioButtonSpecs.fixedWidth,
  },
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  pressed: {
    opacity: 0.92,
  },
});
