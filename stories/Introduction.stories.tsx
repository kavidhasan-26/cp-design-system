import type { Meta, StoryObj } from '@storybook/react';
import { IntroPage } from '../src/foundations/IntroPage';

const meta = {
  title: 'Foundations/Introduction',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <IntroPage />,
};
