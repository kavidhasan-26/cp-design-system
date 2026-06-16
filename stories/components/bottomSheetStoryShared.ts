import type { ArgTypes } from '@storybook/react';
import { BottomSheet, type BottomSheetFooter, type BottomSheetLayout } from '../../src/components/BottomSheet';
import { componentCanvasDecorator } from '../../src/storybook/ComponentCanvas';
import {
  componentStoryParameters,
  createFigmaArgTypes,
  figmaBooleanArgType,
  figmaSelectArgType,
  figmaTextArgType,
} from '../../src/storybook/figmaControls';

const footerOptions = [
  { value: 'fixed' as const, label: 'Fixed' },
  { value: 'inline' as const, label: 'Inline' },
];

const actionsOptions = [
  { value: 'primary' as const, label: 'Primary' },
  { value: 'button-group' as const, label: 'Button group' },
];

const layoutOptions = [
  { value: 'default' as const, label: 'Default' },
  { value: 'custom-background' as const, label: 'Custom background' },
];

const heightOptions = [
  { value: 'fit-content' as const, label: 'Fit content' },
  { value: 'medium' as const, label: 'Medium' },
  { value: 'large' as const, label: 'Large' },
];

const maxHeightOptions = [
  { value: '90%' as const, label: '90%' },
  { value: '70%' as const, label: '70%' },
  { value: '50%' as const, label: '50%' },
];

export const bottomSheetArgTypes = createFigmaArgTypes({
  footer: figmaSelectArgType('Footer', footerOptions, {
    description: 'Fixed pins the footer and scrolls the body. Inline keeps actions in the scroll flow.',
    defaultValue: 'fixed',
  }),
  actions: figmaSelectArgType('Actions', actionsOptions, {
    description: 'Single primary button or a full-width primary + secondary group.',
    defaultValue: 'primary',
  }),
  layout: figmaSelectArgType('Layout', layoutOptions, {
    description: 'Default shows title and subtext. Custom background uses background + content slots.',
    defaultValue: 'default',
  }),
  title: figmaTextArgType('Title', {
    description: 'Sheet title shown in the default layout.',
    defaultValue: 'Title',
  }),
  subtext: figmaTextArgType('Subtext', {
    description: 'Supporting copy below the title.',
    defaultValue: 'Subtext',
  }),
  showClose: figmaBooleanArgType('Show close', {
    description: 'When true, renders the close icon in the header.',
    defaultValue: true,
  }),
  height: figmaSelectArgType('Height', heightOptions, {
    description: 'Container height mode. Fit content hugs up to maxHeight; medium is 50%; large uses maxHeight.',
    defaultValue: 'fit-content',
  }),
  maxHeight: figmaSelectArgType('Max height', maxHeightOptions, {
    description: 'Maximum sheet height relative to the Storybook frame.',
    defaultValue: '90%',
  }),
  primaryLabel: figmaTextArgType('Primary label', {
    description: 'Primary button label when Actions = Primary.',
    defaultValue: 'Button',
  }),
  containerHeight: { table: { disable: true } },
  children: { table: { disable: true } },
  backgroundContent: { table: { disable: true } },
  buttons: { table: { disable: true } },
  style: { table: { disable: true } },
  testID: { table: { disable: true } },
  onClose: { table: { disable: true } },
  onPrimaryPress: { table: { disable: true } },
}) satisfies ArgTypes;

export const bottomSheetStoryParameters = {
  ...componentStoryParameters,
  backgrounds: {
    default: 'canvas',
    values: [{ name: 'canvas', value: '#f4f4f4' }],
  },
};

export const bottomSheetDecorators = [componentCanvasDecorator()];

export const STORYBOOK_SHEET_CONTAINER_HEIGHT = 700;

export function bottomSheetArgs(
  footer: BottomSheetFooter = 'fixed',
  actions: 'primary' | 'button-group' = 'primary',
  layout: BottomSheetLayout = 'default',
) {
  return {
    footer,
    actions,
    layout,
    title: 'Title',
    subtext: 'Subtext',
    showClose: true,
    height: 'fit-content' as const,
    maxHeight: '90%' as const,
    primaryLabel: 'Button',
    containerHeight: STORYBOOK_SHEET_CONTAINER_HEIGHT,
  };
}

export { BottomSheet };
