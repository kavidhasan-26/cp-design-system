import type { ArgTypes } from '@storybook/react';
import { PasswordInput, type PasswordInputAppearance } from '../../src/components/PasswordInput';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
  normalLargeSizeOptions,
} from '../../src/storybook/figmaControls';

const appearanceOptions = [
  { value: 'enabled' as const, label: 'Enabled' },
  { value: 'active' as const, label: 'Active' },
  { value: 'filled' as const, label: 'Filled' },
  { value: 'disabled' as const, label: 'Disabled' },
];

const visibilityOptions = [
  { value: 'hidden' as const, label: 'Hidden' },
  { value: 'visible' as const, label: 'Visible' },
];

const helperOptions = [
  { value: 'none' as const, label: 'None' },
  { value: 'error' as const, label: 'Error' },
  { value: 'success' as const, label: 'Success' },
  { value: 'hint' as const, label: 'Hint' },
];

export const passwordInputArgTypes = createFigmaArgTypes({
  label: figmaBooleanArgType('Label', {
    description: 'When true, renders the field label above the input.',
    defaultValue: true,
  }),
  labelText: figmaTextArgType('Label text', {
    description: 'Copy shown in the field label when Label is true.',
    defaultValue: 'Label',
  }),
  placeholder: figmaTextArgType('Placeholder', {
    description: 'Placeholder copy shown when the field is empty.',
    defaultValue: 'Password',
  }),
  value: figmaTextArgType('Value', {
    description: 'Input value used for filled states and controlled usage.',
    defaultValue: 'Password123',
  }),
  helper: figmaSelectArgType('Helper', helperOptions, {
    description: 'Single helper slot below the field — None, Error, Success, or Hint.',
    defaultValue: 'none',
  }),
  helperText: figmaTextArgType('Helper text', {
    description: 'Copy shown in the helper row when Helper is not None.',
    defaultValue: 'Helper message',
  }),
  appearance: figmaSelectArgType('Appearance', appearanceOptions, {
    description:
      'Locks the visual appearance for Storybook. Active matches the focused state in app code — leave unset on Enabled to interact with focus, typing, and the purple border transition.',
    defaultValue: 'enabled',
  }),
  size: figmaSelectArgType('Size', normalLargeSizeOptions, {
    description: 'Normal uses 14px vertical padding. Large uses 16px (space-8) vertical padding.',
    defaultValue: 'normal',
  }),
  visibility: figmaSelectArgType('Visibility', visibilityOptions, {
    description:
      'Locks password visibility for Storybook. Hidden is the default in app code — leave unset on Enabled to toggle with the eye icon.',
    defaultValue: 'hidden',
  }),
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the input stretches to fill the width of its parent container.',
    defaultValue: false,
  }),
  disabled: { table: { disable: true } },
  defaultVisible: { table: { disable: true } },
  visible: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onChangeText: { table: { disable: true } },
  onVisibilityChange: { table: { disable: true } },
  onFocus: { table: { disable: true } },
  onBlur: { table: { disable: true } },
}) satisfies ArgTypes;

export const passwordInputStoryParameters = {
  ...componentStoryParameters,
  actions: { disable: true },
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const passwordInputDecorators = [componentCanvasDecorator()];

export function passwordInputArgs(
  appearance?: PasswordInputAppearance,
  size: 'normal' | 'large' = 'normal',
) {
  return {
    label: true,
    labelText: 'Label',
    placeholder: 'Password',
    ...(appearance === 'filled' ? { value: 'Password123' } : {}),
    helper: 'none' as const,
    helperText: 'Helper message',
    ...(appearance ? { appearance } : {}),
    size,
    fullWidth: false,
  };
}

export { PasswordInput };
