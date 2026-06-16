import type { ArgTypes } from '@storybook/react';
import { RadioButton, type RadioButtonVariant } from '../../src/components/RadioButton';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
  normalLargeSizeOptions,
} from '../../src/storybook/figmaControls';

const variantOptions = [
  { value: 'unselected' as const, label: 'Unselected' },
  { value: 'selected' as const, label: 'Selected' },
  { value: 'disabled' as const, label: 'Disabled' },
  { value: 'unselected-plain' as const, label: 'Unselected plain' },
  { value: 'selected-plain' as const, label: 'Selected plain' },
];

export const radioButtonArgTypes = createFigmaArgTypes({
  label: figmaTextArgType('Label', {
    description: 'Option label shown on the leading side of the control.',
    defaultValue: 'Label',
  }),
  variant: figmaSelectArgType('Variant', variantOptions, {
    description:
      'Locks the visual appearance for Storybook. Omit in app code and use selected, bordered, and disabled for live behavior.',
    defaultValue: 'unselected',
  }),
  size: figmaSelectArgType('Size', normalLargeSizeOptions, {
    description: 'Normal uses 12px vertical padding. Large uses 16px (space-8) vertical padding.',
    defaultValue: 'normal',
  }),
  selected: figmaBooleanArgType('Selected', {
    description: 'Whether the option is selected. Ignored when variant is set.',
    defaultValue: false,
  }),
  bordered: figmaBooleanArgType('Bordered', {
    description: 'When false, renders the plain variant without the container stroke.',
    defaultValue: true,
  }),
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the control stretches to fill the width of its parent container.',
    defaultValue: false,
  }),
  disabled: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onPress: { table: { disable: true } },
}) satisfies ArgTypes;

export const radioButtonStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const radioButtonDecorators = [componentCanvasDecorator()];

export function radioButtonArgs(
  variant?: RadioButtonVariant,
  size: 'normal' | 'large' = 'normal',
) {
  return {
    label: 'Label',
    ...(variant ? { variant } : {}),
    size,
    selected: variant === 'selected' || variant === 'selected-plain',
    bordered: variant !== 'unselected-plain' && variant !== 'selected-plain',
    fullWidth: false,
  };
}

export { RadioButton };
