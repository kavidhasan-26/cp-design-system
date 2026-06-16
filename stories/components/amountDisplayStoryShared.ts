import type { ArgTypes } from '@storybook/react';
import { AmountDisplay, type AmountDisplayVisibility } from '../../src/components/AmountDisplay';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaNumberArgType,
  figmaSelectArgType,
  normalLargeSizeOptions,
} from '../../src/storybook/figmaControls';

const variantOptions = [
  { value: 'with-toggle' as const, label: 'With toggle' },
  { value: 'without-toggle' as const, label: 'Without toggle' },
];

const visibilityOptions = [
  { value: 'visible' as const, label: 'Visible' },
  { value: 'hidden' as const, label: 'Hidden' },
];

export const amountDisplayArgTypes = createFigmaArgTypes({
  variant: figmaSelectArgType('Variant', variantOptions, {
    description: 'With toggle shows a privacy mask and eye control. Without toggle always shows the amount with the same rolling animation.',
    defaultValue: 'with-toggle',
  }),
  amount: figmaNumberArgType('Amount', {
    description: 'Numeric value formatted with Indian grouping (e.g. 1234567 → 12,34,567).',
    defaultValue: 12000,
  }),
  decimals: figmaNumberArgType('Decimals', {
    description: 'Decimal places shown after the amount.',
    defaultValue: 0,
  }),
  showCurrency: figmaBooleanArgType('Show ₹', {
    description: 'When true, shows the ₹ symbol before the amount.',
    defaultValue: true,
  }),
  size: figmaSelectArgType('Size', normalLargeSizeOptions, {
    description: 'Normal uses Numeral 2 (32px). Large uses Numeral 1 (40px) for the amount and ₹ symbol.',
    defaultValue: 'normal',
  }),
  visibility: figmaSelectArgType('Visibility', visibilityOptions, {
    description:
      'With-toggle only. Locks visibility for Storybook. Hidden shows mask blocks and a closed eye — tap the toggle in app code to reveal with a rolling animation.',
    defaultValue: 'hidden',
  }),
  defaultVisible: figmaBooleanArgType('Default visible', {
    description: 'With-toggle only. Initial visibility when uncontrolled. Defaults to hidden for privacy.',
    defaultValue: false,
    category: 'Behavior',
  }),
  showReplayButton: figmaBooleanArgType('Replay button', {
    description: 'Without-toggle only. Shows a replay control to re-run the rolling animation.',
    defaultValue: false,
    category: 'Behavior',
  }),
  visible: { table: { disable: true } },
  disabled: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onVisibilityChange: { table: { disable: true } },
}) satisfies ArgTypes;

export const amountDisplayStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const amountDisplayDecorators = [componentCanvasDecorator()];

export function amountDisplayArgs(
  visibility?: AmountDisplayVisibility,
  amount = 12000,
  variant: 'with-toggle' | 'without-toggle' = 'with-toggle',
  showReplayButton = false,
  size: 'normal' | 'large' = 'normal',
) {
  return {
    variant,
    amount,
    decimals: 0,
    showCurrency: true,
    showReplayButton,
    size,
    defaultVisible: visibility === 'visible',
    ...(visibility ? { visibility } : {}),
  };
}

export { AmountDisplay };
