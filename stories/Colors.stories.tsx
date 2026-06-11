import type { Meta, StoryObj } from '@storybook/react';
import { PrimitivePalettes, SemanticColorsTable } from '../src/foundations/ColorPalette';
import { DocPage } from '../src/foundations/DocLayout';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <DocPage
      title="Colors"
      description="Semantic roles for UI, and primitive palettes behind them."
    >
      <SemanticColorsTable />
      <PrimitivePalettes />
    </DocPage>
  ),
};
