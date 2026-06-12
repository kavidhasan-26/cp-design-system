import { Platform, type TextStyle } from 'react-native';

type WebTextInputStyleExtra = {
  boxShadow?: string;
  caretColor?: string;
  cursor?: string;
  outlineColor?: string;
  outlineStyle?: 'none' | string;
  outlineWidth?: number;
  type?: 'email' | 'password' | 'search' | 'tel' | 'text';
};

/** Removes the native/web input chrome so only the field container border shows. */
export function getWebTextInputStyle(extra?: WebTextInputStyleExtra): TextStyle | undefined {
  if (Platform.OS !== 'web') {
    return undefined;
  }

  return {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    boxShadow: 'none',
    caretColor: undefined,
    cursor: 'text',
    outlineWidth: 0,
    outlineStyle: 'none',
    outlineColor: 'transparent',
    ...extra,
  } as unknown as TextStyle;
}
