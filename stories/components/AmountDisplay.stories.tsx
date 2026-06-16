import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  AmountDisplay,
  amountDisplayArgTypes,
  amountDisplayArgs,
  amountDisplayDecorators,
  amountDisplayStoryParameters,
} from './amountDisplayStoryShared';

function LiveAmountDisplay() {
  return (
    <AmountDisplay
      amount={12000}
      decimals={0}
      defaultVisible={false}
      showCurrency
    />
  );
}

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
          'Amount display with Indian grouping. Use with-toggle for privacy mask and eye control, or without-toggle to always show the amount.',
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
      <AmountDisplay amount={12000} size="large" defaultVisible />
      <AmountDisplay amount={12000} variant="without-toggle" />
    </View>
  ),
};

export const Large: Story = {
  args: amountDisplayArgs('visible', 12000, 'with-toggle', false, 'large'),
  parameters: {
    docs: {
      description: {
        story: 'Large size uses Numeral 1 (40px) for the amount and ₹ symbol.',
      },
    },
  },
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

export const WithoutToggle: Story = {
  args: amountDisplayArgs(undefined, 12000, 'without-toggle'),
  parameters: {
    docs: {
      description: {
        story:
          'Always shows the amount with no eye control. Enable Replay button in controls to re-run the rolling animation.',
      },
    },
  },
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Tap the closed eye to reveal the amount — digits roll into place with Indian grouping. Tap the open eye to hide again.',
      },
    },
  },
  render: () => <LiveAmountDisplay />,
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
