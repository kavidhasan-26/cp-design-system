import type { Preview } from '@storybook/react';
import { View } from 'react-native';
import { CpDesignSystemProvider } from '../src/fonts/CpDesignSystemProvider';

const preview: Preview = {
  parameters: {
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
              'Enabled',
              'Active',
              'Filled',
              'Disabled',
              'With Error',
              'With Success',
              'With Hint',
            ],
            'Amount Display',
            ['Overview', 'Hidden', 'Visible', 'Interactive', 'Indian Grouping'],
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
