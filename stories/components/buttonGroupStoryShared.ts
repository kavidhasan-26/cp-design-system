import type { ArgTypes } from '@storybook/react';
import {
  ButtonGroup,
  type ButtonGroupVariant,
  type ButtonGroupLayout,
  type ButtonGroupPrimaryPosition,
} from '../../src/components/ButtonGroup';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
} from '../../src/storybook/figmaControls';

const layoutOptions = [
  { value: 'row' as const, label: 'Row' },
  { value: 'column' as const, label: 'Column' },
];

const sizeOptions = [
  { value: 'normal' as const, label: 'Normal' },
  { value: 'small' as const, label: 'Small' },
];

const rowCombinationOptions = [
  { value: 'primary-secondary' as const, label: 'Primary + Secondary' },
  { value: 'primary-tertiary' as const, label: 'Primary + Tertiary' },
];

const columnCombinationOptions = [
  { value: 'primary-secondary' as const, label: 'Primary + Secondary' },
  { value: 'primary-tertiary' as const, label: 'Primary + Tertiary' },
  { value: 'primary-secondary-tertiary' as const, label: 'Primary + Secondary + Tertiary' },
  { value: 'secondary-secondary' as const, label: 'Secondary + Secondary' },
];

const primaryPositionOptions = [
  { value: 'start' as const, label: 'Start' },
  { value: 'end' as const, label: 'End' },
];

export const buttonGroupArgTypes = createFigmaArgTypes({
  layout: figmaSelectArgType('Layout', layoutOptions, {
    description: 'Row supports 2 buttons. Column supports 2 or 3 buttons.',
    defaultValue: 'row',
  }),
  size: figmaSelectArgType('Size', sizeOptions, {
    description: 'Applies to every button in the group.',
    defaultValue: 'normal',
  }),
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the group stretches to the parent width and row buttons share space equally.',
    defaultValue: false,
  }),
  count: {
    name: 'Count',
    description: 'Number of buttons. Row is always 2. Column can be 2 or 3.',
    control: { type: 'select' },
    options: [2, 3],
    table: {
      category: 'Figma properties',
      type: { summary: '2 | 3' },
      defaultValue: { summary: '2' },
    },
  },
  variant: figmaSelectArgType('Variant', [...rowCombinationOptions, ...columnCombinationOptions], {
    description:
      'Hierarchy mix per slot. Row: Primary+Secondary or Primary+Tertiary. Column (2): Primary+Secondary, Primary+Tertiary, or Secondary+Secondary. Column (3): Primary+Secondary+Tertiary.',
    defaultValue: 'primary-secondary',
  }),
  primaryPosition: figmaSelectArgType('Primary position', primaryPositionOptions, {
    description:
      'Trailing (End) puts primary on the right in row or bottom in column. Use hierarchies or buttons[].hierarchy for a custom order.',
    defaultValue: 'end',
  }),
  hierarchies: { table: { disable: true } },
  buttons: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
}) satisfies ArgTypes;

export const buttonGroupStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const buttonGroupDecorators = [componentCanvasDecorator()];

export function buttonGroupArgs(
  layout: ButtonGroupLayout = 'row',
  variant: ButtonGroupVariant = 'primary-secondary',
  count: 2 | 3 = layout === 'row' ? 2 : 2,
  primaryPosition: ButtonGroupPrimaryPosition = 'end',
) {
  return {
    layout,
    size: 'normal' as const,
    fullWidth: false,
    count,
    variant,
    primaryPosition,
  };
}

export { ButtonGroup };
