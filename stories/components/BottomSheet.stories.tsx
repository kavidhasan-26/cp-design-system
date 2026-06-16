import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { fn } from '@storybook/test';
import { neutral } from '../../src/tokens/primitives/colors';
import {
  BottomSheet,
  STORYBOOK_SHEET_CONTAINER_HEIGHT,
  bottomSheetArgTypes,
  bottomSheetArgs,
  bottomSheetDecorators,
  bottomSheetStoryParameters,
} from './bottomSheetStoryShared';

function PlaceholderBlock({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: neutral[20],
        borderRadius: 8,
        height: tall ? 240 : 100,
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Text style={{ color: neutral[50] }}>{label}</Text>
    </View>
  );
}

function LongContentList() {
  return (
    <View style={{ gap: 8 }}>
      {Array.from({ length: 12 }, (_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: neutral[20],
            borderRadius: 8,
            padding: 16,
          }}
        >
          <Text style={{ color: neutral[50] }}>List item {index + 1}</Text>
        </View>
      ))}
    </View>
  );
}

const meta = {
  title: 'Components/Bottom Sheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    ...bottomSheetStoryParameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/CoHNXBVyLx0jqxNNvDKeNU?node-id=347-584',
    },
    docs: {
      ...bottomSheetStoryParameters.docs,
      page: bottomSheetStoryParameters.docs.page,
      description: {
        component:
          'Bottom sheet surface for mobile overlays. Footer=fixed pins actions and scrolls the body. Set height to fit-content, medium (50%), or large (maxHeight). Wrap with scrim and safe area in app code.',
      },
    },
  },
  argTypes: bottomSheetArgTypes,
  args: {
    ...bottomSheetArgs('fixed', 'button-group'),
    onClose: fn(),
    onPrimaryPress: fn(),
  },
  decorators: bottomSheetDecorators,
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <View style={{ gap: 24, width: 375 }}>
      <BottomSheet
        actions="button-group"
        containerHeight={STORYBOOK_SHEET_CONTAINER_HEIGHT}
        footer="fixed"
      >
        <PlaceholderBlock label="Content slot" />
      </BottomSheet>
      <BottomSheet
        actions="primary"
        containerHeight={STORYBOOK_SHEET_CONTAINER_HEIGHT}
        footer="inline"
      >
        <PlaceholderBlock label="Content slot" />
      </BottomSheet>
    </View>
  ),
};

export const FixedButtonGroup: Story = {
  args: bottomSheetArgs('fixed', 'button-group'),
};

export const FixedPrimary: Story = {
  args: bottomSheetArgs('fixed', 'primary'),
};

export const InlinePrimary: Story = {
  args: bottomSheetArgs('inline', 'primary'),
};

export const MediumHeightScroll: Story = {
  args: {
    ...bottomSheetArgs('fixed', 'primary'),
    height: 'medium',
  },
  render: (args) => (
    <BottomSheet {...args}>
      <LongContentList />
    </BottomSheet>
  ),
};

export const LargeHeightScroll: Story = {
  args: {
    ...bottomSheetArgs('fixed', 'button-group'),
    height: 'large',
    maxHeight: '90%',
  },
  render: (args) => (
    <BottomSheet {...args}>
      <LongContentList />
    </BottomSheet>
  ),
};

export const CustomBackground: Story = {
  args: {
    ...bottomSheetArgs('fixed', 'primary', 'custom-background'),
    title: '',
    subtext: '',
  },
  render: (args) => (
    <BottomSheet
      {...args}
      backgroundContent={<PlaceholderBlock label="Background slot" />}
    >
      <PlaceholderBlock label="Custom content slot" />
    </BottomSheet>
  ),
};

export const FitContentMaxHeight: Story = {
  args: {
    ...bottomSheetArgs('fixed', 'primary'),
    height: 'fit-content',
    maxHeight: '50%',
  },
  render: (args) => (
    <BottomSheet {...args}>
      <LongContentList />
    </BottomSheet>
  ),
};
