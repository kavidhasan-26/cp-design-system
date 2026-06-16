import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import {
  SegmentedControl,
  segmentedControlArgTypes,
  segmentedControlArgs,
  segmentedControlDecorators,
  segmentedControlStoryParameters,
  segmentedControlStoryProps,
  type StoryArgs,
} from './segmentedControlStoryShared';

function SegmentedControlStory(args: StoryArgs) {
  return <SegmentedControl {...segmentedControlStoryProps(args)} />;
}

function LiveSegmentedControl({ count }: { count: 2 | 3 }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options =
    count === 3
      ? (['Option 1', 'Option 2', 'Option 3'] as const)
      : (['Option 1', 'Option 2'] as const);

  return (
    <SegmentedControl
      onChange={setSelectedIndex}
      options={options}
      selectedIndex={selectedIndex}
    />
  );
}

const meta = {
  title: 'Components/Segmented Control',
  component: SegmentedControlStory,
  tags: ['autodocs'],
  parameters: {
    ...segmentedControlStoryParameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/CoHNXBVyLx0jqxNNvDKeNU?node-id=300-583',
    },
    docs: {
      ...segmentedControlStoryParameters.docs,
      page: segmentedControlStoryParameters.docs.page,
      description: {
        component:
          'Pill-shaped segmented control for choosing one of two or three options. Selected segment shows a white thumb with medium label weight; unselected segments use regular weight. Labels wrap and all segments share the same height.',
      },
    },
  },
  argTypes: segmentedControlArgTypes,
  args: segmentedControlArgs('2', '1'),
  decorators: segmentedControlDecorators,
} satisfies Meta<typeof SegmentedControlStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Two- and three-segment controls plus a long-label example with equal segment heights.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24, maxWidth: 360 }}>
      <SegmentedControl appearance={1} options={['Option 1', 'Option 2']} />
      <SegmentedControl appearance={1} options={['Option 1', 'Option 2', 'Option 3']} />
      <SegmentedControl
        appearance={1}
        options={['Monthly billing plan', 'Annual billing plan with savings']}
      />
      <SegmentedControl appearance={1} disabled options={['Option 1', 'Option 2']} />
    </View>
  ),
};

export const TwoOptions: Story = {
  args: segmentedControlArgs('2', '1'),
  parameters: {
    docs: {
      description: {
        story: 'Two equal segments with a sliding white thumb on the selected option.',
      },
    },
  },
};

export const ThreeOptions: Story = {
  args: segmentedControlArgs('3', '2'),
  parameters: {
    docs: {
      description: {
        story: 'Three equal segments with the thumb on the middle option.',
      },
    },
  },
};

export const Disabled: Story = {
  args: segmentedControlArgs('2', '1', 'true'),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state at 50% opacity with no segment interaction.',
      },
    },
  },
};

export const LongLabels: Story = {
  args: {
    ...segmentedControlArgs('2', '1'),
    option1: 'Monthly billing plan',
    option2: 'Annual billing plan with savings',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Long labels wrap to multiple lines. Both segments stretch to the same height and the control grows vertically.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    ...segmentedControlArgs('2', '1'),
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-width layout keeps equal segment widths across the parent container.',
      },
    },
  },
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Live selection with an animated sliding thumb — no appearance lock.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24, maxWidth: 360 }}>
      <LiveSegmentedControl count={2} />
      <LiveSegmentedControl count={3} />
    </View>
  ),
};
