import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  PhoneNumberInput,
  phoneNumberInputArgTypes,
  phoneNumberInputArgs,
  phoneNumberInputDecorators,
  phoneNumberInputStoryParameters,
} from './phoneNumberInputStoryShared';

const meta = {
  title: 'Components/Phone Number Input',
  component: PhoneNumberInput,
  tags: ['autodocs'],
  parameters: {
    ...phoneNumberInputStoryParameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/CoHNXBVyLx0jqxNNvDKeNU?node-id=212-459',
    },
    docs: {
      ...phoneNumberInputStoryParameters.docs,
      page: phoneNumberInputStoryParameters.docs.page,
      description: {
        component:
          'Phone number inputs collect national digits with a fixed country-code prefix. The +91 prefix uses Text/Secondary, matching the placeholder grey. Five field states match Text Input — Enabled, Active, Filled, Loading, and Disabled.',
      },
    },
  },
  argTypes: phoneNumberInputArgTypes,
  args: phoneNumberInputArgs(),
  decorators: phoneNumberInputDecorators,
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Core phone-number states with +91 prefix and digit placeholder.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24, width: 347 }}>
      <PhoneNumberInput label appearance="enabled" />
      <PhoneNumberInput label appearance="active" />
      <PhoneNumberInput label value="9876543210" appearance="filled" />
      <PhoneNumberInput label appearance="loading" />
      <PhoneNumberInput label appearance="disabled" />
    </View>
  ),
};

export const Enabled: Story = {
  args: phoneNumberInputArgs(),
  parameters: {
    docs: {
      description: {
        story:
          'Default resting state with +91 and placeholder both in Text/Secondary. Click to focus — border animates to purple.',
      },
    },
  },
};

export const Active: Story = {
  args: phoneNumberInputArgs('active'),
  parameters: {
    docs: {
      description: {
        story: 'Focused state with Border Purple and a live caret in app usage.',
      },
    },
  },
};

export const Filled: Story = {
  args: phoneNumberInputArgs('filled'),
  parameters: {
    docs: {
      description: {
        story: 'National digits entered with primary text and the default gray border.',
      },
    },
  },
};

export const Loading: Story = {
  args: phoneNumberInputArgs('loading'),
  parameters: {
    docs: {
      description: {
        story: 'Loading state with Neutral 15 field background and a spinner.',
      },
    },
  },
};

export const Disabled: Story = {
  args: phoneNumberInputArgs('disabled'),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state with Neutral 30 background at 70% opacity.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    ...phoneNumberInputArgs('enabled'),
    helper: 'error',
    helperText: 'Enter a valid 10-digit mobile number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error helper with Red 50 border and message below the field.',
      },
    },
  },
};

export const WithSuccess: Story = {
  args: {
    ...phoneNumberInputArgs('filled'),
    helper: 'success',
    helperText: 'Mobile number verified',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success helper with circle-tick icon and primary message text.',
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    ...phoneNumberInputArgs('enabled'),
    helper: 'hint',
    helperText: 'We will send an OTP to this number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hint helper with neutral secondary copy below the field.',
      },
    },
  },
};
