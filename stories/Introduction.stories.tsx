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
        <CodeBlock copyable>{`npm install github:kavidhasan-26/cp-design-system`}</CodeBlock>
      </DocSection>

      <DocSection title="Expo setup">
        <Text style={docStyles.pageDescription}>
          Add transpilePackages in app.json. Inter loads automatically on web when you import from
          cp-design-system. On iOS and Android, wrap your app root with CpDesignSystemProvider
          (requires expo-font).
        </Text>
        <CodeBlock copyable>{`npx expo install expo-font`}</CodeBlock>
        <CodeBlock copyable>{`{
  "expo": {
    "transpilePackages": ["cp-design-system"]
  }
}`}</CodeBlock>
        <CodeBlock copyable>{`import { CpDesignSystemProvider } from 'cp-design-system';

export default function App() {
  return (
    <CpDesignSystemProvider>
      {/* your app */}
    </CpDesignSystemProvider>
  );
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Naming conventions">
        <CodeBlock>{`Components
- variant      Style variant (RadioButton, ButtonGroup)
- appearance   Locked visual for Storybook (Button, TextInput, OtpInput)
- visibility   Visible / hidden (AmountDisplay)
- hierarchy    Button emphasis: primary | secondary | tertiary
- bordered     RadioButton container stroke on/off

Tokens — Figma names still work
- space[4], radius[2], border.border3, getTypographyStyle('body-r2')

Tokens — developer aliases
- spacing.md, radii.md, borders.default, borders.focus
- getTypographyStyle('body-regular-sm')  → body-r3
- getTypographyStyle('heading-sm')       → heading-5`}</CodeBlock>
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock>{`import { Button, RadioButton, ButtonGroup, tokens, getTypographyStyle, spacing } from 'cp-design-system';

<Button label="Continue" hierarchy="primary" onPress={handlePress} />

<RadioButton label="Option A" selected bordered onPress={selectA} />

<ButtonGroup variant="primary-secondary" layout="row" fullWidth primaryPosition="end" />

const styles = StyleSheet.create({
  title: getTypographyStyle('heading-sm'),
  screen: {
    backgroundColor: tokens.colors.semantic.base.background,
    padding: spacing['3xl'],
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
