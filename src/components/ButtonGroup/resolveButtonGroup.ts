import type { ButtonGroupVariant, ButtonGroupLayout, ButtonGroupPrimaryPosition } from './types';

export const rowVariants: ButtonGroupVariant[] = ['primary-secondary', 'primary-tertiary'];
export const columnTwoVariants: ButtonGroupVariant[] = [
  'primary-secondary',
  'primary-tertiary',
  'secondary-secondary',
];

export function getVariantButtonCount(variant: ButtonGroupVariant): 2 | 3 {
  return variant === 'primary-secondary-tertiary' ? 3 : 2;
}

export function resolveVariant(
  layout: ButtonGroupLayout,
  count: 2 | 3,
  variant: ButtonGroupVariant | undefined,
): ButtonGroupVariant {
  if (layout === 'row') {
    if (variant && rowVariants.includes(variant)) {
      return variant;
    }
    return 'primary-secondary';
  }

  if (count === 3) {
    return 'primary-secondary-tertiary';
  }

  if (variant && columnTwoVariants.includes(variant)) {
    return variant;
  }

  return 'primary-secondary';
}

export function resolveCount(
  layout: ButtonGroupLayout,
  count: 2 | 3 | undefined,
  variant: ButtonGroupVariant,
): 2 | 3 {
  const variantCount = getVariantButtonCount(variant);

  if (layout === 'row') {
    return 2;
  }

  if (count === 2 || count === 3) {
    if (count === 3 && variantCount !== 3) {
      return variantCount;
    }
    if (count === 2 && variantCount === 3) {
      return 2;
    }
    return count;
  }

  return variantCount;
}

export function resolvePrimaryPosition(
  primaryPosition: ButtonGroupPrimaryPosition | undefined,
): ButtonGroupPrimaryPosition {
  return primaryPosition ?? 'end';
}
