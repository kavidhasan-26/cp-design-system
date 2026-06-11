import Svg, { Path } from 'react-native-svg';
import { neutral } from '../../tokens/primitives/colors';
import type { IconProps } from './types';

/** 16×16 open-eye icon from Figma Amount-display (node 141:81). */
export function EyeOpenIcon({ color = neutral[50], size = 16, accessibilityLabel }: IconProps) {
  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <Path
        d="M2 8.66699C4.4 3.33366 11.6 3.33366 14 8.66699"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.23463 11.1813C7.47728 11.2818 7.73736 11.3335 8 11.3335C8.53043 11.3335 9.03914 11.1228 9.41421 10.7477C9.78929 10.3726 10 9.86393 10 9.3335C10 8.80306 9.78929 8.29436 9.41421 7.91928C9.03914 7.54421 8.53043 7.3335 8 7.3335C7.73736 7.3335 7.47728 7.38523 7.23463 7.48574C6.99198 7.58625 6.7715 7.73357 6.58579 7.91928C6.40007 8.105 6.25275 8.32548 6.15224 8.56813C6.05173 8.81078 6 9.07085 6 9.3335C6 9.59614 6.05173 9.85621 6.15224 10.0989C6.25275 10.3415 6.40007 10.562 6.58579 10.7477C6.7715 10.9334 6.99198 11.0807 7.23463 11.1813Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** 16×16 closed-eye icon from Figma Amount-display (node 141:101). */
export function EyeClosedIcon({ color = neutral[50], size = 16, accessibilityLabel }: IconProps) {
  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <Path
        d="M13 10.6663L11.35 8.40234M8 11.6663V9.33301M3 10.6663L4.646 8.40767M2 5.33301C4.4 10.6663 11.6 10.6663 14 5.33301"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
