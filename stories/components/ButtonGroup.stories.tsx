import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  ButtonGroup,
  buttonGroupArgTypes,
  buttonGroupArgs,
  buttonGroupDecorators,
  buttonGroupStoryParameters,
} from './buttonGroupStoryShared';

const meta = {
  title: 'Components/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    ...buttonGroupStoryParameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/CoHNXBVyLx0jqxNNvDKeNU?node-id=174-921',
    },
    docs: {
      ...buttonGroupStoryParameters.docs,
      page: buttonGroupStoryParameters.docs.page,
      description: {
        component:
          'Groups Button instances with Space-4 gaps. Row holds 2 equal-width buttons with primary on the right by default. Column holds 2 or 3 full-width buttons. Use primaryPosition, hierarchies, or buttons[].hierarchy to control slot order.',
      },
    },
  },
  argTypes: buttonGroupArgTypes,
  args: buttonGroupArgs('row', 'primary-secondary', 2),
  decorators: buttonGroupDecorators,
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Common row and column combinations from the Figma component set.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 32, width: 343 }}>
      <ButtonGroup variant="primary-secondary" fullWidth layout="row" primaryPosition="end" />
      <ButtonGroup variant="primary-tertiary" fullWidth layout="row" primaryPosition="end" />
      <ButtonGroup variant="primary-secondary-tertiary" count={3} fullWidth layout="column" primaryPosition="end" />
      <ButtonGroup variant="primary-tertiary" count={2} fullWidth layout="column" primaryPosition="end" />
      <ButtonGroup variant="secondary-secondary" count={2} fullWidth layout="column" />
    </View>
  ),
};

export const RowPrimarySecondary: Story = {
  args: {
    ...buttonGroupArgs('row', 'primary-secondary', 2),
    fullWidth: true,
  },
};

export const RowPrimaryTertiary: Story = {
  args: {
    layout: 'row',
    count: 2,
    variant: 'primary-tertiary',
    fullWidth: true,
  },
};

export const ColumnPrimaryTertiary: Story = {
  args: {
    layout: 'column',
    count: 2,
    variant: 'primary-tertiary',
    fullWidth: true,
  },
};

export const ColumnThreeUp: Story = {
  args: {
    layout: 'column',
    count: 3,
    variant: 'primary-secondary-tertiary',
    fullWidth: true,
  },
};

export const ColumnPrimarySecondary: Story = {
  args: {
    layout: 'column',
    count: 2,
    variant: 'primary-secondary',
    fullWidth: true,
  },
};

export const ColumnSecondarySecondary: Story = {
  args: {
    layout: 'column',
    count: 2,
    variant: 'secondary-secondary',
    fullWidth: true,
  },
};

export const SmallSize: Story = {
  args: {
    layout: 'row',
    count: 2,
    variant: 'primary-secondary',
    size: 'small',
    fullWidth: true,
  },
};

export const WithIcons: Story = {
  args: {
    layout: 'row',
    count: 2,
    variant: 'primary-secondary',
    fullWidth: true,
    buttons: [{ iconLeading: true }, { iconTrailing: true }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Per-button iconLeading and iconTrailing slots reuse the Button icon API.',
      },
    },
  },
};

export const HugWidth: Story = {
  args: {
    layout: 'row',
    count: 2,
    variant: 'primary-secondary',
    primaryPosition: 'end',
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'When full width is false, the group hugs its content while row buttons stay equal within the group.',
      },
    },
  },
};

export const RowPrimaryOnStart: Story = {
  args: {
    layout: 'row',
    count: 2,
    variant: 'primary-secondary',
    primaryPosition: 'start',
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary position=Start puts primary on the left in row layouts.',
      },
    },
  },
};

export const CustomOrder: Story = {
  args: {
    layout: 'row',
    count: 2,
    fullWidth: true,
    hierarchies: ['tertiary', 'primary'],
    buttons: [{ label: 'Cancel' }, { label: 'Confirm' }],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pass hierarchies for full control over slot order. Per-button hierarchy in buttons[] works the same way.',
      },
    },
  },
};
