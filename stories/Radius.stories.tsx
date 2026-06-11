import type { Meta, StoryObj } from '@storybook/react';
import { DocPage } from '../src/foundations/DocLayout';
import { RadiusShowcase } from '../src/foundations/RadiusShowcase';

const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <DocPage
      title="Radius"
      description="Corner radius from 0px to pill (999px)."
    >
      <RadiusShowcase />
    </DocPage>
  ),
};
