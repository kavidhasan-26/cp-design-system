import type { ArgTypes } from '@storybook/react';
import { ArrowRightIcon } from '../../src/components/icons/ArrowRightIcon';
import { CloseIcon } from '../../src/components/icons/CloseIcon';
import { IconButton, type IconButtonVariant } from '../../src/components/IconButton';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaActionArgType,
  figmaSelectArgType,
} from '../../src/storybook/figmaControls';

const sizeOptions = [
  { value: 'normal' as const, label: 'Normal' },
  { value: 'small' as const, label: 'Small' },
];

const variantOptions = [
  { value: 'default' as const, label: 'Default' },
  { value: 'ghost' as const, label: 'Ghost' },
];

const appearanceOptions = [
  { value: 'active' as const, label: 'Active' },
  { value: 'hovered' as const, label: 'Hovered/Pressed' },
  { value: 'disabled' as const, label: 'Disabled' },
];

export const iconButtonArgTypes = createFigmaArgTypes({
  variant: figmaSelectArgType('Variant', variantOptions, {
    description:
      'Default uses purple surfaces. Ghost stays transparent at rest and shows a neutral background only when pressed — used for Bottomsheet close.',
    defaultValue: 'default',
  }),
  size: figmaSelectArgType('Size', sizeOptions, {
    description: 'Normal is 40×40. Small is 32×32.',
    defaultValue: 'normal',
  }),
  appearance: figmaSelectArgType('State', appearanceOptions, {
    description:
      'Visual interaction state matching the Figma component set. Use Active for default, Hovered/Pressed for feedback states, and Disabled when the action is unavailable.',
    defaultValue: 'active',
  }),
  onPress: figmaActionArgType('onPress', 'Called when the icon button is pressed.'),
  disabled: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  hitSlop: { table: { disable: true } },
  accessibilityLabel: { table: { disable: true } },
  icon: { table: { disable: true } },
}) satisfies ArgTypes;

export const iconButtonStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const iconButtonDecorators = [componentCanvasDecorator()];

export function iconButtonArgs(variant: IconButtonVariant = 'default') {
  return {
    variant,
    size: 'normal' as const,
    appearance: 'active' as const,
    accessibilityLabel: 'Action',
    icon: <ArrowRightIcon />,
  };
}

export function ghostCloseIconButtonArgs() {
  return {
    variant: 'ghost' as const,
    size: 'small' as const,
    appearance: 'active' as const,
    accessibilityLabel: 'Close',
    icon: <CloseIcon size={11} />,
  };
}

export { IconButton };
