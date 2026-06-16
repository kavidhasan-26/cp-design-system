import { Text, View } from 'react-native';
import { DocBlockStack, DocCodeBlock, DocSection } from '../storybook/DocCodeBlock';
import { DocPage } from './DocLayout';
import { docStyles } from './docTheme';

const STORYBOOK_URL = 'https://kavidhasan-26.github.io/cp-design-system/';

const foundationLinks = ['Colors', 'Typography', 'Spacing', 'Radius'];

const componentProps = [
  {
    name: 'hierarchy',
    detail: 'Components: Button, ButtonGroup\nValues: primary | secondary | tertiary\nSets button emphasis.',
  },
  {
    name: 'variant',
    detail:
      'Components: RadioButton, ButtonGroup, AmountDisplay\nRadioButton/ButtonGroup: style combination\nAmountDisplay: with-toggle | without-toggle',
  },
  {
    name: 'appearance',
    detail:
      'Components: Button, TextInput, PhoneNumberInput, PasswordInput, OtpInput\nStorybook only. Locks visual state (enabled, active, filled, disabled).\nDo not use in app code.',
  },
  {
    name: 'visibility',
    detail: 'Components: AmountDisplay (with-toggle only)\nValues: hidden | visible',
  },
  {
    name: 'bordered',
    detail: 'Components: RadioButton\nShows or hides the outer border.',
  },
] as const;

const usageExample = `import { Button, RadioButton, ButtonGroup, tokens, getTypographyStyle, spacing } from 'cp-design-system';

<Button label="Continue" hierarchy="primary" onPress={handlePress} />

<RadioButton label="Option A" selected bordered onPress={selectA} />

<ButtonGroup variant="primary-secondary" layout="row" fullWidth primaryPosition="end" />

const styles = StyleSheet.create({
  title: getTypographyStyle('heading-sm'),
  screen: {
    backgroundColor: tokens.colors.semantic.base.background,
    padding: spacing['3xl'],
  },
});`;

const namingReference = `# Component props
hierarchy="primary"          # Button, ButtonGroup
variant="primary-secondary"  # RadioButton, ButtonGroup
appearance="active"          # Storybook only
variant="without-toggle"     # AmountDisplay — amount only, no eye control
visibility="visible"         # AmountDisplay with-toggle only
bordered                     # RadioButton

# Tokens — Figma names
space[4]
radius[2]
border.border3
getTypographyStyle('body-r2')

# Tokens — aliases
spacing.md
radii.md
borders.default
getTypographyStyle('body-regular-sm')  # → body-r3
getTypographyStyle('heading-sm')       # → heading-5`;

function ConventionItem({ name, detail }: { name: string; detail: string }) {
  return (
    <View style={docStyles.conventionItem}>
      <Text style={docStyles.conventionName}>{name}</Text>
      <Text style={docStyles.conventionDetail}>{detail}</Text>
    </View>
  );
}

export function IntroPage() {
  return (
    <DocPage
      title="CP Design System"
      description="React Native components and tokens from Figma."
    >
      <DocSection title="Storybook">
        <DocCodeBlock>{STORYBOOK_URL}</DocCodeBlock>
      </DocSection>

      <DocSection title="Install">
        <DocCodeBlock>{`npm install github:kavidhasan-26/cp-design-system`}</DocCodeBlock>
      </DocSection>

      <DocSection title="Update">
        <Text style={docStyles.pageDescription}>
          Run install again to get the latest version. In production, pin a tag in package.json.
        </Text>
        <DocBlockStack>
          <DocCodeBlock>{`npm install github:kavidhasan-26/cp-design-system

"cp-design-system": "github:kavidhasan-26/cp-design-system#v0.1.0"
npm install github:kavidhasan-26/cp-design-system#v0.1.1
npm install github:kavidhasan-26/cp-design-system --force
npx expo start -c`}</DocCodeBlock>
          <DocCodeBlock>{`npm uninstall cp-design-system`}</DocCodeBlock>
        </DocBlockStack>
      </DocSection>

      <DocSection title="Expo setup">
        <Text style={docStyles.pageDescription}>
          Add transpilePackages. Wrap the app in CpDesignSystemProvider on iOS and Android. Inter
          loads on web when you import the package.
        </Text>
        <DocBlockStack>
          <DocCodeBlock>{`npx expo install expo-font`}</DocCodeBlock>
          <DocCodeBlock>{`{
  "expo": {
    "transpilePackages": ["cp-design-system"]
  }
}`}</DocCodeBlock>
          <DocCodeBlock>{`import { CpDesignSystemProvider } from 'cp-design-system';

export default function App() {
  return (
    <CpDesignSystemProvider>
      {/* your app */}
    </CpDesignSystemProvider>
  );
}`}</DocCodeBlock>
        </DocBlockStack>
      </DocSection>

      <DocSection
        description="Prop names on components, and token names in code."
        title="Naming conventions"
      >
        <Text style={docStyles.subsectionTitle}>Component props</Text>
        <View style={docStyles.conventionGroup}>
          {componentProps.map((item) => (
            <ConventionItem key={item.name} detail={item.detail} name={item.name} />
          ))}
        </View>

        <Text style={docStyles.subsectionTitle}>Tokens</Text>
        <View style={docStyles.conventionGroup}>
          <ConventionItem
            detail="space[4], radius[2], border.border3, getTypographyStyle('body-r2')"
            name="Figma names"
          />
          <ConventionItem
            detail={`spacing.md, radii.md, borders.default\ngetTypographyStyle('body-regular-sm') → body-r3\ngetTypographyStyle('heading-sm') → heading-5`}
            name="Aliases"
          />
        </View>

        <Text style={docStyles.subsectionTitle}>Quick reference</Text>
        <DocCodeBlock>{namingReference}</DocCodeBlock>
      </DocSection>

      <DocSection title="Usage">
        <DocCodeBlock>{usageExample}</DocCodeBlock>
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
  );
}
