import type { Meta, StoryObj } from '@storybook/react';
import { DocPage } from '../src/foundations/DocLayout';
import { SpacingShowcase } from '../src/foundations/SpacingShowcase';

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <DocPage
      title="Spacing"
      description="15 spacing values from 0px to 56px."
    >
      <SpacingShowcase />
    </DocPage>
  ),
};
