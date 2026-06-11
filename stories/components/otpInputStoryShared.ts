import type { ArgTypes } from '@storybook/react';
import { OtpInput, type OtpInputAppearance } from '../../src/components/OtpInput';
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
  { value: 'disabled' as const, label: 'Disabled' },
];

const helperOptions = [
  { value: 'none' as const, label: 'None' },
  { value: 'error' as const, label: 'Error' },
  { value: 'success' as const, label: 'Success' },
  { value: 'hint' as const, label: 'Hint' },
];

export const otpInputArgTypes = createFigmaArgTypes({
  label: figmaBooleanArgType('Label', {
    description: 'When true, renders the field label above the OTP cells.',
    defaultValue: true,
  }),
  value: figmaTextArgType('Value', {
    description: 'OTP value used for filled states and controlled usage.',
    defaultValue: '1234',
  }),
  helper: figmaSelectArgType('Helper', helperOptions, {
    description: 'Single helper slot below the cells — None, Error, Success, or Hint.',
    defaultValue: 'none',
  }),
  helperText: figmaTextArgType('Helper text', {
    description: 'Copy shown in the helper row when Helper is not None.',
    defaultValue: 'Helper message',
  }),
  appearance: figmaSelectArgType('Appearance', appearanceOptions, {
    description:
      'Locks the visual appearance for Storybook. Active matches the focused cell in app code — leave unset on Enabled to interact with focus, typing, and the purple border transition.',
    defaultValue: 'enabled',
  }),
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the input stretches to fill the width of its parent container.',
    defaultValue: false,
  }),
  length: { table: { disable: true } },
  disabled: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onChangeText: { table: { disable: true } },
  onComplete: { table: { disable: true } },
}) satisfies ArgTypes;

export const otpInputStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const otpInputDecorators = [componentCanvasDecorator()];

export function otpInputArgs(appearance?: OtpInputAppearance) {
  return {
    label: true,
    value: appearance === 'filled' ? '1234' : '',
    helper: 'none' as const,
    helperText: 'Helper message',
    ...(appearance ? { appearance } : {}),
    fullWidth: false,
  };
}

export { OtpInput };
