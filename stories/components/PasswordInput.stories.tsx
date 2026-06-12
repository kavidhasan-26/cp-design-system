import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import {
  PasswordInput,
  passwordInputArgTypes,
  passwordInputArgs,
  passwordInputDecorators,
  passwordInputStoryParameters,
} from './passwordInputStoryShared';

function LivePasswordInput() {
  const [password, setPassword] = useState('');

  return (
    <PasswordInput
      helper="none"
      helperText="Helper message"
      label
      onChangeText={setPassword}
      placeholder="Password"
      value={password}
    />
  );
}

const meta = {
  title: 'Components/Password Input',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    ...passwordInputStoryParameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/CoHNXBVyLx0jqxNNvDKeNU?node-id=221-561',
    },
    docs: {
      ...passwordInputStoryParameters.docs,
      page: passwordInputStoryParameters.docs.page,
      description: {
        component:
          'Password inputs collect masked text with a trailing eye toggle. Four field states — Enabled, Active, Filled, and Disabled — with a single helper slot. Password is hidden by default; tap the eye icon to reveal.',
      },
    },
  },
  argTypes: passwordInputArgTypes,
  args: passwordInputArgs(),
  decorators: passwordInputDecorators,
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Live field at the top, then static password-input states with hidden text and eye-closed trailing icon.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24, width: 347 }}>
      <LivePasswordInput />
      <PasswordInput label appearance="enabled" visibility="hidden" />
      <PasswordInput label appearance="active" visibility="hidden" />
      <PasswordInput label value="Password123" appearance="filled" visibility="hidden" />
      <PasswordInput label appearance="disabled" visibility="hidden" />
    </View>
  ),
};

export const Enabled: Story = {
  args: passwordInputArgs(),
  parameters: {
    docs: {
      description: {
        story:
          'Default resting state with masked input and eye-closed icon. Click the field to focus or tap the eye to reveal.',
      },
    },
  },
};

export const Active: Story = {
  args: {
    ...passwordInputArgs('active'),
    visibility: 'hidden',
  },
  parameters: {
    docs: {
      description: {
        story: 'Focused state with Border Purple and a live caret in app usage.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    ...passwordInputArgs('filled'),
    visibility: 'hidden',
  },
  parameters: {
    docs: {
      description: {
        story: 'Value entered with masked characters and the default gray border.',
      },
    },
  },
};

export const Visible: Story = {
  args: {
    ...passwordInputArgs('filled'),
    visibility: 'visible',
  },
  parameters: {
    docs: {
      description: {
        story: 'Visible state with plain text and the eye-open trailing icon.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    ...passwordInputArgs('disabled'),
    visibility: 'hidden',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state with Neutral 30 background at 70% opacity. Toggle is inactive.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    ...passwordInputArgs('enabled'),
    visibility: 'hidden',
    helper: 'error',
    helperText: 'Password must be at least 8 characters',
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
    ...passwordInputArgs('filled'),
    visibility: 'hidden',
    helper: 'success',
    helperText: 'Password meets requirements',
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
    ...passwordInputArgs('enabled'),
    visibility: 'hidden',
    helper: 'hint',
    helperText: 'Use at least 8 characters with a number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hint helper with neutral secondary copy below the field.',
      },
    },
  },
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Live toggle — type a password and tap the eye icon to show or hide it.',
      },
    },
  },
  render: () => <LivePasswordInput />,
};
