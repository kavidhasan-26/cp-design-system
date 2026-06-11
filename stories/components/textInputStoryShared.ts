import type { ArgTypes } from '@storybook/react';
import { TextInput, type TextInputState } from '../../src/components/TextInput';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
} from '../../src/storybook/figmaControls';

const stateOptions = [
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

const keyboardTypeOptions = [
  { value: 'default' as const, label: 'Default' },
  { value: 'email-address' as const, label: 'Email address' },
  { value: 'numeric' as const, label: 'Numeric' },
  { value: 'phone-pad' as const, label: 'Phone pad' },
  { value: 'number-pad' as const, label: 'Number pad' },
  { value: 'decimal-pad' as const, label: 'Decimal pad' },
  { value: 'url' as const, label: 'URL' },
  { value: 'visible-password' as const, label: 'Visible password' },
];

const textCaseOptions = [
  { value: 'default' as const, label: 'Default' },
  { value: 'uppercase' as const, label: 'Uppercase' },
  { value: 'lowercase' as const, label: 'Lowercase' },
  { value: 'capitalize' as const, label: 'Capitalize words' },
  { value: 'none' as const, label: 'None' },
];

export const textInputArgTypes = createFigmaArgTypes({
  label: figmaBooleanArgType('Label', {
    description: 'When true, renders the field label above the input.',
    defaultValue: true,
  }),
  placeholder: figmaTextArgType('Placeholder', {
    description: 'Placeholder copy shown when the field is empty.',
    defaultValue: 'Placeholder',
  }),
  value: figmaTextArgType('Value', {
    description: 'Input value used for filled states and controlled usage.',
    defaultValue: 'Value',
  }),
  helper: figmaSelectArgType('Helper', helperOptions, {
    description: 'Single helper slot below the field — None, Error, Success, or Hint.',
    defaultValue: 'none',
  }),
  helperText: figmaTextArgType('Helper text', {
    description: 'Copy shown in the helper row when Helper is not None.',
    defaultValue: 'Helper message',
  }),
  state: figmaSelectArgType('State', stateOptions, {
    description:
      'Locks the visual appearance for Storybook. Active matches the focused state in app code — leave unset on Enabled to interact with focus, typing, and the purple border transition.',
    defaultValue: 'enabled',
  }),
  iconLeading: figmaBooleanArgType('Leading icon', {
    description: 'When true, renders a leading arrow icon inside the field.',
    defaultValue: false,
  }),
  iconTrailing: figmaBooleanArgType('Trailing icon', {
    description: 'When true, renders a trailing arrow icon inside the field.',
    defaultValue: false,
  }),
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the input stretches to fill the width of its parent container.',
    defaultValue: false,
  }),
  keyboardType: figmaSelectArgType('Keyboard type', keyboardTypeOptions, {
    description: 'Native keyboard layout shown when the field is focused.',
    defaultValue: 'default',
    category: 'Input behavior',
  }),
  textCase: figmaSelectArgType('Text case', textCaseOptions, {
    description: 'Controls automatic capitalization while typing — uppercase, lowercase, or default sentence case.',
    defaultValue: 'default',
    category: 'Input behavior',
  }),
  disabled: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onChangeText: { table: { disable: true } },
  onFocus: { table: { disable: true } },
  onBlur: { table: { disable: true } },
}) satisfies ArgTypes;

export const textInputStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const textInputDecorators = [componentCanvasDecorator()];

export function textInputArgs(state?: TextInputState) {
  return {
    label: true,
    placeholder: 'Placeholder',
    value: state === 'filled' ? 'Value' : '',
    helper: 'none' as const,
    helperText: 'Helper message',
    ...(state ? { state } : {}),
    iconLeading: false,
    iconTrailing: false,
    fullWidth: false,
    keyboardType: 'default' as const,
    textCase: 'default' as const,
  };
}

export { TextInput };
