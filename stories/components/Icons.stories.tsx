import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { neutral } from '../../src/tokens/primitives/colors';
import { red } from '../../src/tokens/primitives/colors';
import { purple } from '../../src/tokens/primitives/colors';
import {
  ArrowRightIcon,
  CircleTickIcon,
  CloseIcon,
  EditIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  InfoIcon,
  LoopIcon,
  SearchIcon,
  WarningIcon,
  WarningTriangleIcon,
} from '../../src/components/icons';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import { ComponentDocsPage } from '../../src/storybook/ComponentDocsPage';
import { IconGallery } from '../../src/storybook/IconGallery';

const iconGallerySections = [
  {
    title: 'Line',
    items: [
      { name: 'arrow-right', icon: <ArrowRightIcon /> },
      { name: 'close', icon: <CloseIcon /> },
      { name: 'edit', icon: <EditIcon /> },
      { name: 'eye-open', icon: <EyeOpenIcon /> },
      { name: 'eye-closed', icon: <EyeClosedIcon /> },
      { name: 'search', icon: <SearchIcon /> },
      { name: 'info', icon: <InfoIcon /> },
      { name: 'loop', icon: <LoopIcon /> },
    ],
  },
  {
    title: 'Filled',
    items: [
      { name: 'circle-tick', icon: <CircleTickIcon /> },
      { name: 'warning', icon: <WarningIcon /> },
      { name: 'warning-triangle', icon: <WarningTriangleIcon /> },
    ],
  },
];

const meta = {
  title: 'Components/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: ComponentDocsPage,
      description: {
        component: 'SVG icons from the design system. Import by name from the package root.',
      },
    },
    backgrounds: {
      default: 'canvas',
      values: [{ name: 'canvas', value: '#f4f4f4' }],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#ffffff' }],
    },
  },
  render: () => <IconGallery sections={iconGallerySections} />,
};

export const Sizes: Story = {
  decorators: [componentCanvasDecorator()],
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <ArrowRightIcon size={12} />
      <ArrowRightIcon size={16} />
      <ArrowRightIcon size={24} />
    </View>
  ),
};

export const Colors: Story = {
  decorators: [componentCanvasDecorator()],
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <EyeOpenIcon color={neutral[50]} />
      <EyeOpenIcon color={purple[40]} />
      <WarningIcon color={red[50]} />
    </View>
  ),
};
