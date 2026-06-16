import type { TextStyle, ViewStyle } from 'react-native';
import { background, surface, text } from '../../tokens/semantic/colors';
import { motion } from '../../tokens/motion';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { getTypographyStyle } from '../../tokens/typography';

/** Pixel-perfect segmented-control specs from Figma component set (node 300:583). */
export const segmentedControlSpecs = {
  trackPadding: space[2],
  segmentPaddingVertical: space[4],
  segmentPaddingHorizontal: space[8],
  borderRadius: radius.x,
  animationDuration: motion.durationFast,
  disabledOpacity: 0.5,
  minWidth: {
    2: 260,
    3: 320,
  },
  selectedLabelStyle: getTypographyStyle('label-3'),
  labelStyle: getTypographyStyle('body-r3'),
  colors: {
    track: background.background1,
    thumb: surface.white,
    label: text.primary,
  },
} as const;

export type SegmentedControlOptionCount = 2 | 3;

type SegmentedControlStyles = {
  root: ViewStyle;
  fullWidth: ViewStyle;
  track: ViewStyle;
  row: ViewStyle;
  thumb: ViewStyle;
  segment: ViewStyle;
  segmentPressed: ViewStyle;
  label: TextStyle;
  selectedLabel: TextStyle;
};

export function getSegmentedControlStyles(
  disabled: boolean,
  optionCount: SegmentedControlOptionCount,
): SegmentedControlStyles {
  return {
    root: {
      alignSelf: 'flex-start',
      opacity: disabled ? segmentedControlSpecs.disabledOpacity : 1,
      minWidth: segmentedControlSpecs.minWidth[optionCount],
    },
    fullWidth: {
      alignSelf: 'stretch',
      width: '100%',
    },
    track: {
      backgroundColor: segmentedControlSpecs.colors.track,
      borderRadius: segmentedControlSpecs.borderRadius,
      padding: segmentedControlSpecs.trackPadding,
    },
    row: {
      alignItems: 'stretch',
      flexDirection: 'row',
      position: 'relative',
    },
    thumb: {
      backgroundColor: segmentedControlSpecs.colors.thumb,
      borderRadius: segmentedControlSpecs.borderRadius,
      bottom: 0,
      position: 'absolute',
      top: 0,
    },
    segment: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: segmentedControlSpecs.segmentPaddingHorizontal,
      paddingVertical: segmentedControlSpecs.segmentPaddingVertical,
    },
    segmentPressed: {
      opacity: 0.8,
    },
    label: {
      ...segmentedControlSpecs.labelStyle,
      color: segmentedControlSpecs.colors.label,
      textAlign: 'center',
    },
    selectedLabel: {
      ...segmentedControlSpecs.selectedLabelStyle,
      color: segmentedControlSpecs.colors.label,
      textAlign: 'center',
    },
  };
}
