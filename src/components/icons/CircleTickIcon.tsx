import Svg, { Circle, Path } from 'react-native-svg';
import { green } from '../../tokens/primitives/colors';
import type { IconProps } from './types';

type CircleTickIconProps = IconProps & {
  /** @deprecated Use circleColor instead. */
  color?: string;
  /** Fill color of the circle. */
  circleColor?: string;
  /** Stroke color of the checkmark. */
  checkColor?: string;
};

/** 12×12 success icon from Figma Icons (node 54:34). */
export function CircleTickIcon({
  color,
  circleColor = color ?? green[50],
  checkColor = '#ffffff',
  size = 12,
  accessibilityLabel,
}: CircleTickIconProps) {
  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      fill="none"
      height={size}
      viewBox="0 0 12 12"
      width={size}
    >
      <Circle cx={6} cy={6} fill={circleColor} r={6} />
      <Path
        d="M4 5.71022L5.49644 7.20666L8.48932 4"
        stroke={checkColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.818298}
      />
    </Svg>
  );
}
