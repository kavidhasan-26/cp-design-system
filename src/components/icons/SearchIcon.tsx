import Svg, { Circle, Path } from 'react-native-svg';
import { neutral } from '../../tokens/primitives/colors';
import type { IconProps } from './types';

/** 16×16 search icon from Figma Icons (node 210:413). */
export function SearchIcon({ color = neutral[50], size = 16, accessibilityLabel }: IconProps) {
  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <Circle
        cx={6.476}
        cy={6.476}
        r={3.81}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
      <Path
        d="M13.388 13.333L9.143 9.143"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
    </Svg>
  );
}
