import type { ViewStyle } from 'react-native';
import { space } from '../../tokens/spacing';

/** Pixel-perfect button-group specs aligned with Figma (node 167:83). */
export const buttonGroupSpecs = {
  gap: space[4],
  fixedWidth: 343,
} as const;

export function getButtonGroupStyles(fullWidth: boolean): ViewStyle {
  return fullWidth
    ? {
        alignSelf: 'stretch',
        width: '100%',
      }
    : {
        alignSelf: 'flex-start',
        maxWidth: buttonGroupSpecs.fixedWidth,
      };
}
