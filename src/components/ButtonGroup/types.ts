import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ButtonHierarchy, ButtonSize, ButtonState } from '../Button';

export type ButtonGroupLayout = 'row' | 'column';

export type ButtonGroupCombination =
  | 'primary-secondary'
  | 'primary-tertiary'
  | 'primary-secondary-tertiary'
  | 'secondary-secondary';

/** Figma property: Primary position — start (leading) or end (trailing). Row defaults to end (primary on the right). */
export type ButtonGroupPrimaryPosition = 'start' | 'end';

export type ButtonGroupButtonConfig = {
  hierarchy?: ButtonHierarchy;
  label?: string;
  iconLeading?: boolean | ReactNode;
  iconTrailing?: boolean | ReactNode;
  onPress?: () => void;
  state?: ButtonState;
  disabled?: boolean;
};

export type ButtonGroupProps = {
  /** Figma property: Layout */
  layout?: ButtonGroupLayout;
  /** Figma property: Size — applied to every button in the group. */
  size?: ButtonSize;
  /** Figma property: Full width — stretches the group container; row buttons share width equally. */
  fullWidth?: boolean;
  /** Figma property: Count — 2 for row; 2 or 3 for column. */
  count?: 2 | 3;
  /** Figma property: Combination — hierarchy mix for the slots. */
  combination?: ButtonGroupCombination;
  /** Figma property: Primary position — trailing puts primary on the right (row) or bottom (column). */
  primaryPosition?: ButtonGroupPrimaryPosition;
  /** Explicit slot order. Overrides combination and primary position when length matches count. */
  hierarchies?: ButtonHierarchy[];
  /** Optional per-button overrides for hierarchy, labels, icons, and handlers. */
  buttons?: ButtonGroupButtonConfig[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
