import type { ButtonHierarchy } from '../Button';
import type { ButtonGroupButtonConfig, ButtonGroupCombination, ButtonGroupPrimaryPosition } from './types';

export const combinationHierarchies: Record<ButtonGroupCombination, ButtonHierarchy[]> = {
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
  combination: ButtonGroupCombination,
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

  const base = combinationHierarchies[combination].slice(0, count);
  return applyPrimaryPosition(base, primaryPosition);
}
