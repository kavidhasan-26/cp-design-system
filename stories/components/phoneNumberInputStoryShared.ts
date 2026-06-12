import type { ArgTypes } from '@storybook/react';
import { PhoneNumberInput, type PhoneNumberInputAppearance } from '../../src/components/PhoneNumberInput';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
} from '../../src/storybook/figmaControls';

const appearanceOptions = [
  { value: 'enabled' as const, label: 'Enabled' },
  { value: 'active' as const, label: 'Active' },
  { value: 'filled' as const, label: 'Filled' },
  { value: 'loading' as const, label: 'Loading' },
  { value: 'disabled' as const, label: 'Disabled' },
];

const helperOptions = [
  { value: 'none' as const, label: 'None' },
  { value: 'error' as const, label: 'Error' },
  { value: 'success' as const, label: 'Success' },
  { value: 'hint' as const, label: 'Hint' },
];

export const phoneNumberInputArgTypes = createFigmaArgTypes({
  label: figmaBooleanArgType('Label', {
    description: 'When true, renders the field label above the input.',
    defaultValue: true,
  }),
  countryCode: figmaTextArgType('Country code', {
    description: 'Dial code shown in Text/Secondary before the number field.',
    defaultValue: '+91',
  }),
  placeholder: figmaTextArgType('Placeholder', {
    description: 'Digit placeholder shown when the field is empty — 1 through 0.',
    defaultValue: '1234567890',
  }),
  value: figmaTextArgType('Value', {
    description: 'National number digits used for filled states and controlled usage.',
    defaultValue: '9876543210',
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
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the input stretches to fill the width of its parent container.',
    defaultValue: false,
  }),
  disabled: { table: { disable: true } },
  maxLength: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onChangeText: { table: { disable: true } },
  onFocus: { table: { disable: true } },
  onBlur: { table: { disable: true } },
}) satisfies ArgTypes;

export const phoneNumberInputStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const phoneNumberInputDecorators = [componentCanvasDecorator()];

export function phoneNumberInputArgs(appearance?: PhoneNumberInputAppearance) {
  return {
    label: true,
    countryCode: '+91',
    placeholder: '1234567890',
    value: appearance === 'filled' ? '9876543210' : '',
    helper: 'none' as const,
    helperText: 'Helper message',
    ...(appearance ? { appearance } : {}),
    fullWidth: false,
  };
}

export { PhoneNumberInput };
