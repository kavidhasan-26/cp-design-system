import type { ButtonHierarchy } from '../Button';
import type { ButtonGroupButtonConfig, ButtonGroupVariant, ButtonGroupPrimaryPosition } from './types';

export const variantHierarchies: Record<ButtonGroupVariant, ButtonHierarchy[]> = {
  'primary-secondary': ['primary', 'secondary'],
  'primary-tertiary': ['primary', 'tertiary'],
  'primary-secondary-tertiary': ['primary', 'secondary', 'tertiary'],
  'secondary-secondary': ['secondary', 'secondary'],
};

/** Moves primary to the trailing edge — right in row, bottom in column. */
export function applyPrimaryPosition(
  hierarchies: ButtonHierarchy[],
  primaryPosition: ButtonGroupPrimaryPosition,
): ButtonHierarchy[] {
  if (primaryPosition === 'start' || !hierarchies.includes('primary')) {
    return hierarchies;
  }

  return [...hierarchies.filter((hierarchy) => hierarchy !== 'primary'), 'primary'];
}

export function resolveSlotHierarchies(
  variant: ButtonGroupVariant,
  count: 2 | 3,
  primaryPosition: ButtonGroupPrimaryPosition,
  hierarchies: ButtonHierarchy[] | undefined,
  buttons: ButtonGroupButtonConfig[] | undefined,
): ButtonHierarchy[] {
  if (hierarchies?.length === count) {
    return hierarchies;
  }

  if (buttons && buttons.length >= count) {
    const fromButtons = buttons.slice(0, count).map((slot) => slot.hierarchy);
    if (fromButtons.every((hierarchy) => hierarchy !== undefined)) {
      return fromButtons as ButtonHierarchy[];
    }
  }

  const base = variantHierarchies[variant].slice(0, count);
  return applyPrimaryPosition(base, primaryPosition);
}
