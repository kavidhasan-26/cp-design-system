import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  TextInput,
  textInputArgTypes,
  textInputArgs,
  textInputDecorators,
  textInputStoryParameters,
} from './textInputStoryShared';

const meta = {
  title: 'Components/Text Input',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    ...textInputStoryParameters,
    docs: {
      ...textInputStoryParameters.docs,
      page: textInputStoryParameters.docs.page,
      description: {
        component:
          'Text inputs collect single-line text. Five field states are available — Enabled, Active, Filled, Loading, and Disabled — with a single helper slot for Error, Success, or Hint messages.',
      },
    },
  },
  argTypes: textInputArgTypes,
  args: textInputArgs(),
  decorators: textInputDecorators,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Core Text-input states from the Figma component set.',
      },
    },
  },
  render: () => (
    <View style={{ gap: 24, width: 347 }}>
      <TextInput label placeholder="Placeholder" state="enabled" />
      <TextInput label placeholder="Placeholder" state="active" />
      <TextInput label value="Value" state="filled" />
      <TextInput label placeholder="Placeholder" state="loading" />
      <TextInput label placeholder="Placeholder" state="disabled" />
    </View>
  ),
};

export const Enabled: Story = {
  args: textInputArgs(),
  parameters: {
    docs: {
      description: {
        story:
          'Default resting state with Border 3. Click to focus — border animates to purple (Active) and the caret appears.',
      },
    },
  },
};

export const Active: Story = {
  args: textInputArgs('active'),
  parameters: {
    docs: {
      description: {
        story: 'Focused state with Border Purple and a live caret in app usage.',
      },
    },
  },
};

export const Filled: Story = {
  args: textInputArgs('filled'),
  parameters: {
    docs: {
      description: {
        story: 'Value entered with primary text and the default gray border.',
      },
    },
  },
};

export const Loading: Story = {
  args: textInputArgs('loading'),
  parameters: {
    docs: {
      description: {
        story: 'Loading state with Neutral 15 field background and a spinner.',
      },
    },
  },
};

export const Disabled: Story = {
  args: textInputArgs('disabled'),
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
    ...textInputArgs('enabled'),
    helper: 'error',
    helperText: 'Error message',
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
    ...textInputArgs('filled'),
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
    ...textInputArgs('enabled'),
    helper: 'hint',
    helperText: 'Hint message',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hint helper with neutral secondary copy below the field.',
      },
    },
  },
};
