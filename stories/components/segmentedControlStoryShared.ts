import type { ArgTypes } from '@storybook/react';
import {
  SegmentedControl,
  type SegmentedControlAppearance,
} from '../../src/components/SegmentedControl';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
} from '../../src/storybook/figmaControls';

const countOptions = [
  { value: '2' as const, label: '2' },
  { value: '3' as const, label: '3' },
];

const selectedOptions = [
  { value: '1' as const, label: '1' },
  { value: '2' as const, label: '2' },
  { value: '3' as const, label: '3' },
];

const disabledOptions = [
  { value: 'false' as const, label: 'False' },
  { value: 'true' as const, label: 'True' },
];

export const segmentedControlArgTypes = createFigmaArgTypes({
  count: figmaSelectArgType('Count', countOptions, {
    description: 'Number of segments — 2 or 3.',
    defaultValue: '2',
  }),
  selected: figmaSelectArgType('Selected', selectedOptions, {
    description: 'Selected segment (1-based, matches Figma).',
    defaultValue: '1',
  }),
  disabled: figmaSelectArgType('Disabled', disabledOptions, {
    description: 'Disabled state at 50% opacity.',
    defaultValue: 'false',
  }),
  option1: figmaTextArgType('Option 1', {
    description: 'Label for the first segment.',
    defaultValue: 'Option 1',
  }),
  option2: figmaTextArgType('Option 2', {
    description: 'Label for the second segment.',
    defaultValue: 'Option 2',
  }),
  option3: figmaTextArgType('Option 3', {
    description: 'Label for the third segment (Count = 3 only).',
    defaultValue: 'Option 3',
  }),
  fullWidth: figmaBooleanArgType('Full width', {
    description: 'When true, the control stretches to fill the width of its parent container.',
    defaultValue: false,
  }),
  options: { table: { disable: true } },
  selectedIndex: { table: { disable: true } },
  defaultSelectedIndex: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onChange: { table: { disable: true } },
}) satisfies ArgTypes;

export const segmentedControlStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const segmentedControlDecorators = [componentCanvasDecorator()];

type StoryArgs = {
  count: '2' | '3';
  selected: '1' | '2' | '3';
  disabled: 'true' | 'false';
  option1: string;
  option2: string;
  option3: string;
  fullWidth?: boolean;
};

export type { StoryArgs };

export function segmentedControlOptionsFromArgs(args: StoryArgs) {
  return args.count === '3'
    ? ([args.option1, args.option2, args.option3] as const)
    : ([args.option1, args.option2] as const);
}

export function segmentedControlStoryProps(args: StoryArgs) {
  return {
    appearance: Number(args.selected) as SegmentedControlAppearance,
    disabled: args.disabled === 'true',
    fullWidth: args.fullWidth,
    options: segmentedControlOptionsFromArgs(args),
  };
}

export function segmentedControlArgs(
  count: '2' | '3' = '2',
  selected: '1' | '2' | '3' = '1',
  disabled: 'true' | 'false' = 'false',
) {
  return {
    count,
    selected,
    disabled,
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3',
    fullWidth: false,
  };
}

export { SegmentedControl };
