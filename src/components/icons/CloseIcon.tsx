import Svg, { Path } from 'react-native-svg';
import { neutral } from '../../tokens/primitives/colors';
import type { IconProps } from './types';

/** ~11×11 close icon from Figma Icons (node 54:32). */
export function CloseIcon({ color = neutral[50], size = 11, accessibilityLabel }: IconProps) {
  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      fill="none"
      height={size}
      viewBox="0 0 13 13"
      width={size}
    >
      <Path
        d="M0.927246 11.4172L11.4172 0.927246M11.4172 11.4172L0.927246 0.927246"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.85423}
      />
    </Svg>
  );
}
