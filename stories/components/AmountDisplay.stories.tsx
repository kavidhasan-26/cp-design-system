import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  AmountDisplay,
  amountDisplayArgTypes,
  amountDisplayArgs,
  amountDisplayDecorators,
  amountDisplayStoryParameters,
} from './amountDisplayStoryShared';

const meta = {
  title: 'Components/Amount Display',
  component: AmountDisplay,
  tags: ['autodocs'],
  parameters: {
    ...amountDisplayStoryParameters,
    docs: {
      ...amountDisplayStoryParameters.docs,
      page: amountDisplayStoryParameters.docs.page,
      description: {
        component:
          'Privacy-aware amount display with a visibility toggle. Amounts use Indian grouping and roll into place when revealed from the hidden state.',
      },
    },
  },
  argTypes: amountDisplayArgTypes,
  args: amountDisplayArgs('hidden'),
  decorators: amountDisplayDecorators,
} satisfies Meta<typeof AmountDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Both states are interactive — tap the eye icon to show or hide each amount.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24 }}>
      <AmountDisplay amount={12000} defaultVisible />
      <AmountDisplay amount={12000} />
    </View>
  ),
};

export const Hidden: Story = {
  args: amountDisplayArgs('hidden'),
  parameters: {
    docs: {
      description: {
        story: 'Default privacy state with mask blocks and a closed eye icon.',
      },
    },
  },
};

export const Visible: Story = {
  args: amountDisplayArgs('visible'),
  parameters: {
    docs: {
      description: {
        story: 'Revealed amount with an open eye icon. Tap the toggle in app usage to hide again.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    amount: 12000,
    decimals: 0,
    showCurrency: true,
    defaultVisible: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tap the closed eye to reveal the amount — digits roll into place with Indian grouping. Tap the open eye to hide again.',
      },
    },
  },
};

export const IndianGrouping: Story = {
  args: amountDisplayArgs('visible', 1234567),
  parameters: {
    docs: {
      description: {
        story: 'Large values follow the Indian number system — 12,34,567 instead of 1,234,567.',
      },
    },
  },
};
