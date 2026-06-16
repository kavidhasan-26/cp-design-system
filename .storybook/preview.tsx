import type { Preview } from '@storybook/react';
import { View } from 'react-native';
import { CpDesignSystemProvider } from '../src/fonts/CpDesignSystemProvider';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
      sort: 'alpha',
    },
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    a11y: {
      test: 'todo',
    },
    options: {
      showRoots: true,
      storySort: {
        order: [
          'Foundations',
          ['Introduction', 'Colors', 'Typography', 'Spacing', 'Radius'],
          'Components',
          [
            'Button',
            ['Overview', 'Primary', 'Secondary', 'Tertiary'],
            'Text Input',
            [
              'Overview',
              'Large',
              'Enabled',
              'Active',
              'Filled',
              'Loading',
              'Disabled',
              'With Error',
              'With Success',
              'With Hint',
            ],
            'Phone Number Input',
            [
              'Overview',
              'Large',
              'Enabled',
              'Active',
              'Filled',
              'Loading',
              'Disabled',
              'With Error',
              'With Success',
              'With Hint',
            ],
            'Password Input',
            [
              'Overview',
              'Large',
              'Enabled',
              'Active',
              'Filled',
              'Visible',
              'Disabled',
              'With Error',
              'With Success',
              'With Hint',
              'Interactive',
            ],
            'Otp Input',
            [
              'Overview',
              'Large',
              'Enabled',
              'Active',
              'Filled',
              'Disabled',
              'With Error',
              'With Success',
              'With Hint',
            ],
            'Amount Display',
            ['Overview', 'Large', 'Hidden', 'Visible', 'Without Toggle', 'Interactive', 'Indian Grouping'],
            'Radio Button',
            [
              'Overview',
              'Large',
              'Unselected',
              'Active',
              'Disabled',
              'Unselected Plain',
              'Selected Plain',
              'Full Width',
              'Interactive',
            ],
            'Segmented Control',
            [
              'Overview',
              'Two Options',
              'Three Options',
              'Disabled',
              'Long Labels',
              'Full Width',
              'Interactive',
            ],
            'Icons',
            ['Overview', 'Sizes', 'Colors'],
          ],
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isFoundation = context.title?.startsWith('Foundations/');

      const story = isFoundation ? (
        <View style={{ flex: 1 }}>
          <Story />
        </View>
      ) : (
        <Story />
      );

      return <CpDesignSystemProvider>{story}</CpDesignSystemProvider>;
    },
  ],
};

export default preview;
