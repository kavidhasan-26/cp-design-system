import type { ButtonGroupCombination, ButtonGroupLayout, ButtonGroupPrimaryPosition } from './types';

export const rowCombinations: ButtonGroupCombination[] = ['primary-secondary', 'primary-tertiary'];
export const columnTwoCombinations: ButtonGroupCombination[] = [
  'primary-secondary',
  'primary-tertiary',
  'secondary-secondary',
];

export function getCombinationCount(combination: ButtonGroupCombination): 2 | 3 {
  return combination === 'primary-secondary-tertiary' ? 3 : 2;
}

export function resolveCombination(
  layout: ButtonGroupLayout,
  count: 2 | 3,
  combination: ButtonGroupCombination | undefined,
): ButtonGroupCombination {
  if (layout === 'row') {
    if (combination && rowCombinations.includes(combination)) {
      return combination;
    }
    return 'primary-secondary';
  }

  if (count === 3) {
    return 'primary-secondary-tertiary';
  }

  if (combination && columnTwoCombinations.includes(combination)) {
    return combination;
  }

  return 'primary-secondary';
}

export function resolveCount(
  layout: ButtonGroupLayout,
  count: 2 | 3 | undefined,
  combination: ButtonGroupCombination,
): 2 | 3 {
  const combinationCount = getCombinationCount(combination);

  if (layout === 'row') {
    return 2;
  }

  if (count === 2 || count === 3) {
    if (count === 3 && combinationCount !== 3) {
      return combinationCount;
    }
    if (count === 2 && combinationCount === 3) {
      return 2;
    }
    return count;
  }

  return combinationCount;
}

export function resolvePrimaryPosition(
  primaryPosition: ButtonGroupPrimaryPosition | undefined,
): ButtonGroupPrimaryPosition {
  return primaryPosition ?? 'end';
}
