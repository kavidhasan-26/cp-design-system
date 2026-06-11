import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { CodeBlock, DocPage, DocSection } from '../src/foundations/DocLayout';
import { docStyles } from '../src/foundations/docTheme';

const meta = {
  title: 'Foundations/Introduction',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const foundationLinks = ['Colors', 'Typography', 'Spacing', 'Radius'];

export const Docs: Story = {
  render: () => (
    <DocPage
      title="CP Design System"
      description="Design tokens and React Native components synced from Figma."
    >
      <DocSection title="Storybook">
        <Text style={docStyles.pageDescription}>
          Live docs: https://kavidhasan-26.github.io/cp-design-system/
        </Text>
      </DocSection>

      <DocSection title="Install">
        <CodeBlock>{`npm install github:kavidhasan-26/cp-design-system`}</CodeBlock>
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock>{`import { Button, tokens, getTypographyStyle } from 'cp-design-system';

const styles = StyleSheet.create({
  title: getTypographyStyle('heading-2'),
  screen: {
    backgroundColor: tokens.colors.semantic.base.background,
    padding: tokens.space[8],
  },
});`}</CodeBlock>
      </DocSection>

      <DocSection title="Tokens">
        <View style={docStyles.linkList}>
          {foundationLinks.map((item) => (
            <Text key={item} style={docStyles.linkItem}>
              {item}
            </Text>
          ))}
        </View>
      </DocSection>
    </DocPage>
  ),
};
