import type { TextStyle } from 'react-native';
import { getTypographyStyle } from '../../tokens/typography';
import {
  getFieldBackgroundColor,
  getFieldBorderColor,
  getHelperTextColor,
  getInputTextColor,
  getTextInputStyles,
  textInputSpecs,
  type TextInputAppearanceValue,
  type TextInputHelper,
} from '../TextInput/textInputStyles';

/** Phone-number input specs — field chrome matches Text Input; Figma component set (node 212:459). */
export const phoneNumberInputSpecs = {
  ...textInputSpecs,
  defaultCountryCode: '+91',
  defaultPlaceholder: '1234567890',
  maxLength: 10,
  countryCodeStyle: getTypographyStyle('body-r2'),
  countryCodeColor: textInputSpecs.colors.placeholder,
} as const;

export function getPhoneNumberInputStyles(
  visualState: TextInputAppearanceValue,
  helper: TextInputHelper,
  hasValue: boolean,
  fullWidth: boolean,
) {
  const textInputStyles = getTextInputStyles(visualState, helper, hasValue, fullWidth);

  return {
    ...textInputStyles,
    countryCode: {
      ...phoneNumberInputSpecs.countryCodeStyle,
      color: phoneNumberInputSpecs.countryCodeColor,
    } satisfies TextStyle,
  };
}

export {
  getFieldBorderColor,
  getFieldBackgroundColor,
  getHelperTextColor,
  getInputTextColor,
  textInputSpecs,
};
export type { TextInputAppearanceValue as PhoneNumberInputAppearanceValue, TextInputHelper as PhoneNumberInputHelper };
