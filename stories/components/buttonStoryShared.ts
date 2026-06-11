import type { ArgTypes } from '@storybook/react';
import { Button, type ButtonHierarchy } from '../../src/components/Button';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaActionArgType,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
} from '../../src/storybook/figmaControls';

const sizeOptions = [
  { value: 'normal' as const, label: 'Normal' },
  { value: 'small' as const, label: 'Small' },
];

const appearanceOptions = [
  { value: 'active' as const, label: 'Active' },
  { value: 'hovered' as const, label: 'Hovered/Pressed' },
  { value: 'disabled' as const, label: 'Disabled' },
];

export const buttonArgTypes = createFigmaArgTypes({
  label: figmaTextArgType('Label', {
    description: 'The text displayed on the button.',
    defaultValue: 'Button',
  }),
  size: figmaSelectArgType('Size', sizeOptions, {
    description: 'Controls padding and height. Normal is the default size; Small is used in compact layouts.',
    defaultValue: 'normal',
  }),
  appearance: figmaSelectArgType('Appearance', appearanceOptions, {
    description:
      'Visual interaction state matching the Figma component set. Use Active for default, Hovered/Pressed for feedback states, and Disabled when the action is unavailable.',
    defaultValue: 'active',
  }),
  iconLeading: figmaBooleanArgType('Icon leading', {
    description: 'When true, renders a leading arrow icon before the label.',
    defaultValue: false,
  }),
  iconTrailing: figmaBooleanArgType('Icon trailing', {
    description: 'When true, renders a trailing arrow icon after the label.',
    defaultValue: false,
  }),
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the button stretches to fill the width of its parent container.',
    defaultValue: false,
  }),
  onPress: figmaActionArgType('onPress', 'Called when the button is pressed.'),
  hierarchy: { table: { disable: true } },
  disabled: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
}) satisfies ArgTypes;

export const buttonStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const buttonDecorators = [componentCanvasDecorator()];

export function buttonArgs(hierarchy: ButtonHierarchy) {
  return {
    label: 'Button',
    hierarchy,
    size: 'normal' as const,
    appearance: 'active' as const,
    iconLeading: false,
    iconTrailing: false,
    fullWidth: false,
  };
}

export { Button };
