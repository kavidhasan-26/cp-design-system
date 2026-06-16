import {
  getFieldBackgroundColor,
  getFieldBorderColor,
  getHelperTextColor,
  getInputTextColor,
  getTextInputStyles,
  textInputSpecs,
  type TextInputHelper,
  type TextInputSize,
} from '../TextInput/textInputStyles';

export type PasswordInputAppearanceValue = 'enabled' | 'active' | 'filled' | 'disabled';
export type PasswordInputHelper = TextInputHelper;

/** Password-input specs — field chrome matches Text Input; Figma component set (node 221:561). */
export const passwordInputSpecs = {
  ...textInputSpecs,
  defaultPlaceholder: 'Password',
} as const;

export function getPasswordInputStyles(
  visualState: PasswordInputAppearanceValue,
  helper: PasswordInputHelper,
  hasValue: boolean,
  fullWidth: boolean,
  size: TextInputSize = 'normal',
) {
  return getTextInputStyles(visualState, helper, hasValue, fullWidth, size);
}

export {
  getFieldBackgroundColor,
  getFieldBorderColor,
  getHelperTextColor,
  getInputTextColor,
  textInputSpecs,
};
