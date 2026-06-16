/** Story title → consumer import + minimal usage. Add an entry when coding a new component. */
export const PACKAGE_NAME = 'cp-design-system';

export type ComponentDocumentation = {
  imports: string;
  usage: string;
};

export const componentDocumentationByTitle: Record<string, ComponentDocumentation> = {
  'Components/Button': {
    imports: `import { Button } from '${PACKAGE_NAME}';`,
    usage: `<Button label="Continue" hierarchy="primary" onPress={handlePress} />`,
  },
  'Components/Icon Button': {
    imports: `import { IconButton } from '${PACKAGE_NAME}';\nimport { CloseIcon } from '${PACKAGE_NAME}';`,
    usage: `<IconButton
  variant="ghost"
  size="small"
  compact
  iconSize={11}
  accessibilityLabel="Close"
  icon={<CloseIcon size={11} />}
  onPress={handleClose}
/>`,
  },
  'Components/Button Group': {
    imports: `import { ButtonGroup } from '${PACKAGE_NAME}';`,
    usage: `<ButtonGroup
  variant="primary-secondary"
  layout="row"
  fullWidth
  primaryPosition="end"
  buttons={[
    { label: 'Cancel', onPress: handleCancel },
    { label: 'Confirm', onPress: handleConfirm },
  ]}
/>`,
  },
  'Components/Text Input': {
    imports: `import { TextInput } from '${PACKAGE_NAME}';`,
    usage: `<TextInput
  label
  labelText="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
/>`,
  },
  'Components/Phone Number Input': {
    imports: `import { PhoneNumberInput } from '${PACKAGE_NAME}';`,
    usage: `<PhoneNumberInput
  label
  labelText="Mobile number"
  value={phone}
  onChangeText={setPhone}
/>`,
  },
  'Components/Password Input': {
    imports: `import { PasswordInput } from '${PACKAGE_NAME}';`,
    usage: `<PasswordInput
  label
  labelText="Password"
  value={password}
  onChangeText={setPassword}
/>`,
  },
  'Components/Otp Input': {
    imports: `import { OtpInput } from '${PACKAGE_NAME}';`,
    usage: `<OtpInput
  label
  labelText="OTP"
  value={otp}
  onChangeText={setOtp}
/>`,
  },
  'Components/Amount Display': {
    imports: `import { AmountDisplay } from '${PACKAGE_NAME}';`,
    usage: `<AmountDisplay
  amount={12000}
  decimals={0}
  variant="with-toggle"
  defaultVisible={false}
  showCurrency
/>`,
  },
  'Components/Radio Button': {
    imports: `import { RadioButton } from '${PACKAGE_NAME}';`,
    usage: `<RadioButton
  label="Option A"
  selected={selected === 'a'}
  bordered
  onPress={() => setSelected('a')}
/>`,
  },
  'Components/Segmented Control': {
    imports: `import { SegmentedControl } from '${PACKAGE_NAME}';`,
    usage: `<SegmentedControl
  options={['Daily', 'Weekly']}
  selectedIndex={selectedIndex}
  onChange={setSelectedIndex}
/>`,
  },
  'Components/Bottom Sheet': {
    imports: `import { BottomSheet } from '${PACKAGE_NAME}';`,
    usage: `<BottomSheet
  title="Title"
  subtext="Subtext"
  footer="fixed"
  actions="primary"
  primaryLabel="Continue"
  onPrimaryPress={handleContinue}
  onClose={handleClose}
>
  {/* sheet body */}
</BottomSheet>`,
  },
  'Components/Icons': {
    imports: `import { CloseIcon, SearchIcon } from '${PACKAGE_NAME}';`,
    usage: `<CloseIcon size={16} />
<SearchIcon size={24} color="#171717" />`,
  },
};

export function getComponentDocumentation(storyTitle: string | undefined) {
  if (!storyTitle) {
    return undefined;
  }

  return componentDocumentationByTitle[storyTitle];
}
