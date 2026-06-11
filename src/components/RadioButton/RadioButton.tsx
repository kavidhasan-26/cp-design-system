import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  getRadioButtonStyles,
  isRadioButtonSelected,
  radioButtonSpecs,
  resolveRadioButtonType,
  type RadioButtonType,
} from './radioButtonStyles';

export type { RadioButtonType };

export type RadioButtonProps = {
  /** Figma property: Label */
  label?: string;
  /** Figma property: Type — locks appearance for Storybook/docs. Omit in app code to derive from selected, borders, and disabled. */
  type?: RadioButtonType;
  /** Whether the option is selected. */
  selected?: boolean;
  /** When false, renders the no-borders variant. Defaults to true. */
  borders?: boolean;
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
  type,
  selected = false,
  borders = true,
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  testID,
}: RadioButtonProps) {
  const visualType = resolveRadioButtonType(type, disabled, selected, borders);
  const stylesForType = getRadioButtonStyles(visualType);
  const isSelected = isRadioButtonSelected(visualType);
  const isDisabled = visualType === 'disabled';

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
