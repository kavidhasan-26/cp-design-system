import type { ArgTypes } from '@storybook/react';
import { RadioButton, type RadioButtonType } from '../../src/components/RadioButton';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
} from '../../src/storybook/figmaControls';

const typeOptions = [
  { value: 'unselected' as const, label: 'Unselected' },
  { value: 'active' as const, label: 'Active' },
  { value: 'disabled' as const, label: 'Disabled' },
  { value: 'unselected-no-borders' as const, label: 'Unselected - No Borders' },
  { value: 'active-no-borders' as const, label: 'Active - No Borders' },
];

export const radioButtonArgTypes = createFigmaArgTypes({
  label: figmaTextArgType('Label', {
    description: 'Option label shown on the leading side of the control.',
    defaultValue: 'Label',
  }),
  type: figmaSelectArgType('Type', typeOptions, {
    description:
      'Locks the visual appearance for Storybook. Omit in app code and use selected, borders, and disabled for live behavior.',
    defaultValue: 'unselected',
  }),
  selected: figmaBooleanArgType('Selected', {
    description: 'Whether the option is selected. Ignored when Type is set.',
    defaultValue: false,
  }),
  borders: figmaBooleanArgType('Borders', {
    description: 'When false, renders the no-borders variant without the container stroke.',
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

export function radioButtonArgs(type?: RadioButtonType) {
  return {
    label: 'Label',
    ...(type ? { type } : {}),
    selected: type === 'active' || type === 'active-no-borders',
    borders: type !== 'unselected-no-borders' && type !== 'active-no-borders',
    fullWidth: false,
  };
}

export { RadioButton };
