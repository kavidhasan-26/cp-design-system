import Svg, { Path } from 'react-native-svg';
import { red } from '../../tokens/primitives/colors';
import type { IconProps } from './types';

/** 16×16 warning icon from Figma Icons (node 64:103). */
export function WarningIcon({ color = red[50], size = 16, accessibilityLabel }: IconProps) {
  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <Path
        d="M8 1.33333C4.33333 1.33333 1.33333 4.33333 1.33333 8C1.33333 11.6667 4.33333 14.6667 8 14.6667C11.6667 14.6667 14.6667 11.6667 14.6667 8C14.6667 4.33333 11.6667 1.33333 8 1.33333ZM7.47619 4.19047H8.52381V9.42857H7.47619V4.19047ZM8 12.2857C7.61905 12.2857 7.28572 11.9524 7.28572 11.5714C7.28572 11.1905 7.61905 10.8571 8 10.8571C8.38095 10.8571 8.71429 11.1905 8.71429 11.5714C8.71429 11.9524 8.38095 12.2857 8 12.2857Z"
        fill={color}
      />
    </Svg>
  );
}
