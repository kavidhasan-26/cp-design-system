import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from '@storybook/test';
import {
  RadioButton,
  radioButtonArgTypes,
  radioButtonArgs,
  radioButtonDecorators,
  radioButtonStoryParameters,
} from './radioButtonStoryShared';

const meta = {
  title: 'Components/Radio Button',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    ...radioButtonStoryParameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/CoHNXBVyLx0jqxNNvDKeNU?node-id=75-206',
    },
    docs: {
      ...radioButtonStoryParameters.docs,
      page: radioButtonStoryParameters.docs.page,
      description: {
        component:
          'Radio buttons let users select one option from a set. Label sits on the left and the indicator on the right. Supports bordered and plain variants plus selected, unselected, and disabled appearances.',
      },
    },
  },
  argTypes: radioButtonArgTypes,
  args: {
    ...radioButtonArgs('unselected'),
    onPress: fn(),
  },
  decorators: radioButtonDecorators,
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All five variants from the Figma component set.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 12, width: 276 }}>
      <RadioButton variant="unselected" />
      <RadioButton variant="selected" />
      <RadioButton variant="disabled" />
      <RadioButton variant="unselected-plain" />
      <RadioButton variant="selected-plain" />
      <RadioButton variant="unselected" size="large" />
    </View>
  ),
};

export const Large: Story = {
  args: radioButtonArgs('unselected', 'large'),
  parameters: {
    docs: {
      description: {
        story: 'Large size — 16px vertical padding (space[8]). Horizontal padding unchanged.',
      },
    },
  },
};

export const Unselected: Story = {
  args: radioButtonArgs('unselected'),
};

export const Active: Story = {
  args: radioButtonArgs('selected'),
};

export const Disabled: Story = {
  args: radioButtonArgs('disabled'),
};

export const UnselectedPlain: Story = {
  args: radioButtonArgs('unselected-plain'),
};

export const SelectedPlain: Story = {
  args: radioButtonArgs('selected-plain'),
};

export const FullWidth: Story = {
  args: {
    ...radioButtonArgs('selected'),
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When full width is true, the control stretches to the parent width while keeping the indicator on the right.',
      },
    },
  },
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Live selection without locking variant — mirrors app usage with selected and bordered props.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<'first' | 'second'>('first');

    return (
      <View style={{ gap: 12, width: 276 }}>
        <RadioButton
          label="Option A"
          selected={selected === 'first'}
          onPress={() => setSelected('first')}
        />
        <RadioButton
          label="Option B"
          selected={selected === 'second'}
          onPress={() => setSelected('second')}
        />
      </View>
    );
  },
};
