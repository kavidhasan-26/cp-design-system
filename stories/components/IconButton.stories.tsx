import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { fn } from '@storybook/test';
import { ArrowRightIcon } from '../../src/components/icons/ArrowRightIcon';
import { CloseIcon } from '../../src/components/icons/CloseIcon';
import { figmaComponentUrl } from '../../src/storybook/figmaDocumentation';
import {
  IconButton,
  ghostCloseIconButtonArgs,
  iconButtonArgTypes,
  iconButtonArgs,
  iconButtonDecorators,
  iconButtonStoryParameters,
} from './iconButtonStoryShared';

const meta = {
  title: 'Components/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    ...iconButtonStoryParameters,
    design: {
      type: 'figma',
      url: figmaComponentUrl('66:143'),
    },
    docs: {
      ...iconButtonStoryParameters.docs,
      page: iconButtonStoryParameters.docs.page,
      description: {
        component:
          'Circular icon-only buttons for compact actions. Default uses purple surfaces; Ghost stays transparent at rest and shows a neutral background when pressed — used for Bottomsheet close.',
      },
    },
  },
  argTypes: iconButtonArgTypes,
  args: {
    ...iconButtonArgs('default'),
    onPress: fn(),
  },
  decorators: iconButtonDecorators,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Default and Ghost variants at Normal and Small sizes — Active, Hovered/Pressed, and Disabled.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        <IconButton
          accessibilityLabel="Action"
          appearance="active"
          icon={<ArrowRightIcon />}
          onPress={fn()}
          size="normal"
          variant="default"
        />
        <IconButton
          accessibilityLabel="Action"
          appearance="hovered"
          icon={<ArrowRightIcon />}
          onPress={fn()}
          size="normal"
          variant="default"
        />
        <IconButton
          accessibilityLabel="Action"
          appearance="disabled"
          icon={<ArrowRightIcon />}
          onPress={fn()}
          size="normal"
          variant="default"
        />
        <IconButton
          accessibilityLabel="Action"
          appearance="active"
          icon={<ArrowRightIcon />}
          onPress={fn()}
          size="small"
          variant="default"
        />
        <IconButton
          accessibilityLabel="Action"
          appearance="hovered"
          icon={<ArrowRightIcon />}
          onPress={fn()}
          size="small"
          variant="default"
        />
        <IconButton
          accessibilityLabel="Action"
          appearance="disabled"
          icon={<ArrowRightIcon />}
          onPress={fn()}
          size="small"
          variant="default"
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        <IconButton
          accessibilityLabel="Close"
          appearance="active"
          icon={<CloseIcon size={11} />}
          onPress={fn()}
          size="small"
          variant="ghost"
        />
        <IconButton
          accessibilityLabel="Close"
          appearance="hovered"
          icon={<CloseIcon size={11} />}
          onPress={fn()}
          size="small"
          variant="ghost"
        />
        <IconButton
          accessibilityLabel="Close"
          appearance="disabled"
          icon={<CloseIcon size={11} />}
          onPress={fn()}
          size="small"
          variant="ghost"
        />
        <IconButton
          accessibilityLabel="Close"
          appearance="active"
          icon={<CloseIcon size={11} />}
          onPress={fn()}
          size="normal"
          variant="ghost"
        />
        <IconButton
          accessibilityLabel="Close"
          appearance="hovered"
          icon={<CloseIcon size={11} />}
          onPress={fn()}
          size="normal"
          variant="ghost"
        />
        <IconButton
          accessibilityLabel="Close"
          appearance="disabled"
          icon={<CloseIcon size={11} />}
          onPress={fn()}
          size="normal"
          variant="ghost"
        />
      </View>
    </View>
  ),
};

export const Default: Story = {
  args: iconButtonArgs('default'),
  parameters: {
    docs: {
      description: {
        story: 'Default icon buttons use purple-10 at rest and purple-20 when pressed or hovered.',
      },
    },
  },
};

export const Ghost: Story = {
  args: ghostCloseIconButtonArgs(),
  parameters: {
    docs: {
      description: {
        story:
          'Ghost icon buttons stay transparent at rest and show a neutral background when pressed. Bottomsheet close uses the Small size.',
      },
    },
  },
};
