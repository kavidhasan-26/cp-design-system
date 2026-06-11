import type { ArgTypes } from '@storybook/react';
import { AmountDisplay, type AmountDisplayVisibility } from '../../src/components/AmountDisplay';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaNumberArgType,
  figmaSelectArgType,
} from '../../src/storybook/figmaControls';

const visibilityOptions = [
  { value: 'visible' as const, label: 'Visible' },
  { value: 'hidden' as const, label: 'Hidden' },
];

export const amountDisplayArgTypes = createFigmaArgTypes({
  amount: figmaNumberArgType('Amount', {
    description: 'Numeric value formatted with Indian grouping (e.g. 1234567 → 12,34,567).',
    defaultValue: 12000,
  }),
  decimals: figmaNumberArgType('Decimals', {
    description: 'Decimal places shown after the amount.',
    defaultValue: 0,
  }),
  showCurrency: figmaBooleanArgType('Currency', {
    description: 'When true, renders the rupee symbol before the amount.',
    defaultValue: true,
  }),
  visibility: figmaSelectArgType('Visibility', visibilityOptions, {
    description:
      'Locks visibility for Storybook. Hidden shows mask blocks and a closed eye — tap the toggle in app code to reveal with a rolling animation.',
    defaultValue: 'hidden',
  }),
  defaultVisible: figmaBooleanArgType('Default visible', {
    description: 'Initial visibility when uncontrolled. Defaults to hidden for privacy.',
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

export function amountDisplayArgs(visibility?: AmountDisplayVisibility, amount = 12000) {
  return {
    amount,
    decimals: 0,
    showCurrency: true,
    defaultVisible: visibility === 'visible',
    ...(visibility ? { visibility } : {}),
  };
}

export { AmountDisplay };
