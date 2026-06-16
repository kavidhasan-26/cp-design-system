import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  OtpInput,
  otpInputArgTypes,
  otpInputArgs,
  otpInputDecorators,
  otpInputStoryParameters,
} from './otpInputStoryShared';

const meta = {
  title: 'Components/Otp Input',
  component: OtpInput,
  tags: ['autodocs'],
  parameters: {
    ...otpInputStoryParameters,
    docs: {
      ...otpInputStoryParameters.docs,
      page: otpInputStoryParameters.docs.page,
      description: {
        component:
          'OTP inputs collect a fixed-length numeric code across four cells. Four field states are available — Enabled, Active, Filled, and Disabled — with a single helper slot for Error, Success, or Hint messages.',
      },
    },
  },
  argTypes: otpInputArgTypes,
  args: otpInputArgs(),
  decorators: otpInputDecorators,
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Core OTP-input states from the Figma component set.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24, width: 347 }}>
      <OtpInput label appearance="enabled" />
      <OtpInput label appearance="active" />
      <OtpInput label appearance="filled" value="1234" />
      <OtpInput label appearance="disabled" />
      <OtpInput label appearance="enabled" size="large" />
    </View>
  ),
};

export const Large: Story = {
  args: otpInputArgs('enabled', 'large'),
  parameters: {
    docs: {
      description: {
        story: 'Large size — 52×52 cells (normal is 46×46). Typography unchanged.',
      },
    },
  },
};

export const Enabled: Story = {
  args: otpInputArgs(),
  parameters: {
    docs: {
      description: {
        story:
          'Default resting state with Border 3 on all cells. Click to focus — the active cell border animates to purple.',
      },
    },
  },
};

export const Active: Story = {
  args: otpInputArgs('active'),
  parameters: {
    docs: {
      description: {
        story: 'Focused state with Border Purple on the active cell and a live caret in app usage.',
      },
    },
  },
};

export const Filled: Story = {
  args: otpInputArgs('filled'),
  parameters: {
    docs: {
      description: {
        story: 'All digits entered with Border Purple on the last cell when focused or locked to Filled.',
      },
    },
  },
};

export const Disabled: Story = {
  args: otpInputArgs('disabled'),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state with Neutral 30 cell fill at 70% opacity.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    ...otpInputArgs('enabled'),
    helper: 'error',
    helperText: 'Error message',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error helper with Red 50 borders on all cells and message below the row.',
      },
    },
  },
};

export const WithSuccess: Story = {
  args: {
    ...otpInputArgs('filled'),
    helper: 'success',
    helperText: 'Success message',
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
    ...otpInputArgs('enabled'),
    helper: 'hint',
    helperText: 'Hint message',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hint helper with neutral secondary copy below the cells.',
      },
    },
  },
};
