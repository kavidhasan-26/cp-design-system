import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { fn } from '@storybook/test';
import {
  Button,
  buttonArgTypes,
  buttonArgs,
  buttonDecorators,
  buttonStoryParameters,
} from './buttonStoryShared';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    ...buttonStoryParameters,
    docs: {
      ...buttonStoryParameters.docs,
      page: buttonStoryParameters.docs.page,
      description: {
        component:
          'Buttons trigger actions in the app. Three hierarchies are available — Primary, Secondary, and Tertiary — each with Normal and Small sizes and Active, Hovered/Pressed, and Disabled states.',
      },
    },
  },
  argTypes: buttonArgTypes,
  args: {
    ...buttonArgs('primary'),
    onPress: fn(),
  },
  decorators: buttonDecorators,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All three button hierarchies from the Figma component set — Primary, Secondary, and Tertiary.',
      },
    },
  },
  render: () => (
    <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
      <Button label="Button" hierarchy="primary" onPress={fn()} />
      <Button label="Button" hierarchy="secondary" onPress={fn()} />
      <Button label="Button" hierarchy="tertiary" onPress={fn()} />
    </View>
  ),
};

export const Primary: Story = {
  args: buttonArgs('primary'),
  parameters: {
    docs: {
      description: {
        story: 'Primary buttons are used for the main call-to-action on a screen.',
      },
    },
  },
};

export const Secondary: Story = {
  args: buttonArgs('secondary'),
  parameters: {
    docs: {
      description: {
        story: 'Secondary buttons support the primary action with an outlined style.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: buttonArgs('tertiary'),
  parameters: {
    docs: {
      description: {
        story: 'Tertiary buttons are text-only and used for the lowest-emphasis actions.',
      },
    },
  },
};
