import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { red } from '../../tokens/primitives/colors';
import type { IconProps } from './types';

/** 16×16 warning-triangle icon from Figma Icons (node 249:712). */
export function WarningTriangleIcon({
  color = red[50],
  size = 16,
  accessibilityLabel,
}: IconProps) {
  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <Path
        d="M7.06218 3.5C7.44708 2.83333 8.40933 2.83333 8.79423 3.5L13.9904 12.5C14.3753 13.1667 13.8942 14 13.1244 14H2.73205C1.96225 14 1.48113 13.1667 1.86603 12.5L7.06218 3.5Z"
        fill={color}
      />
      <Rect fill="#ffffff" height={5} width={1} x={7.4} y={5.2} />
      <Circle cx={7.9} cy={12} fill="#ffffff" r={0.5} />
    </Svg>
  );
}
