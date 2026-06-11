import type { Meta, StoryObj } from '@storybook/react';
import { DocPage } from '../src/foundations/DocLayout';
import { TypographyShowcase } from '../src/foundations/TypographyShowcase';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <DocPage
      title="Typography"
      description="Inter text styles applied with getTypographyStyle('token-name')."
    >
      <TypographyShowcase />
    </DocPage>
  ),
};
