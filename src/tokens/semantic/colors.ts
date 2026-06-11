/** Semantic color tokens from the Figma "Colors" collection (light mode). */
export const base = {
  primary: '#514c9f',
  secondary: '#b9b7d8',
  background: '#ffffff',
} as const;

export const border = {
  border1: '#f4f4f4',
  border2: '#c5c5c5',
  border3: '#c9c9c9',
  borderPurple: '#514c9f',
} as const;

export const actionPrimary = {
  default: '#514c9f',
  hovered: '#736fb2',
  pressed: '#736fb2',
  disabled: '#acacac',
} as const;

export const actionSecondary = {
  default: '#b9b7d8',
  hovered: '#736fb2',
  pressed: '#736fb2',
  disabled: '#acacac',
} as const;

export const text = {
  primary: '#303030',
  secondary: '#6c6c6c',
  disabled: '#666666',
  link: '#2e72d2',
  onPrimary: '#ffffff',
  onSecondary: '#514c9f',
} as const;

export const surface = {
  white: '#ffffff',
  colored1: '#b9b7d8',
} as const;

export const background = {
  background1: '#f3f3f3',
} as const;

export const semantic = {
  base,
  border,
  actionPrimary,
  actionSecondary,
  text,
  surface,
  background,
} as const;

export type SemanticColorGroup = {
  title: string;
  description: string;
  tokens: Array<{ name: string; token: string; value: string }>;
};

export const semanticColorGroups: SemanticColorGroup[] = [
  {
    title: 'Base',
    description: 'Core brand and page background colors.',
    tokens: [
      { name: 'Base/Primary', token: 'base-primary', value: base.primary },
      { name: 'Base/Secondary', token: 'base-secondary', value: base.secondary },
      { name: 'Base/Background', token: 'base-background', value: base.background },
    ],
  },
  {
    title: 'Action Primary',
    description: 'Primary interactive element states.',
    tokens: [
      { name: 'Action Primary/Default', token: 'action-primary-default', value: actionPrimary.default },
      { name: 'Action Primary/Hovered', token: 'action-primary-hovered', value: actionPrimary.hovered },
      { name: 'Action Primary/Pressed', token: 'action-primary-pressed', value: actionPrimary.pressed },
      { name: 'Action Primary/Disabled', token: 'action-primary-disabled', value: actionPrimary.disabled },
    ],
  },
  {
    title: 'Action Secondary',
    description: 'Secondary interactive element states.',
    tokens: [
      { name: 'Action Secondary/Default', token: 'action-secondary-default', value: actionSecondary.default },
      { name: 'Action Secondary/Hovered', token: 'action-secondary-hovered', value: actionSecondary.hovered },
      { name: 'Action Secondary/Pressed', token: 'action-secondary-pressed', value: actionSecondary.pressed },
      { name: 'Action Secondary/Disabled', token: 'action-secondary-disabled', value: actionSecondary.disabled },
    ],
  },
  {
    title: 'Text',
    description: 'Typography and content color roles.',
    tokens: [
      { name: 'Text/Primary', token: 'text-primary', value: text.primary },
      { name: 'Text/Secondary', token: 'text-secondary', value: text.secondary },
      { name: 'Text/Disabled', token: 'text-disabled', value: text.disabled },
      { name: 'Text/Link', token: 'text-link', value: text.link },
      { name: 'Text/on primary', token: 'text-on-primary', value: text.onPrimary },
      { name: 'Text/on secondary', token: 'text-on-secondary', value: text.onSecondary },
    ],
  },
  {
    title: 'Border',
    description: 'Stroke and divider colors.',
    tokens: [
      { name: 'Border/Border 1', token: 'border-border-1', value: border.border1 },
      { name: 'Border/Border 2', token: 'border-border-2', value: border.border2 },
      { name: 'Border/Border 3', token: 'border-border-3', value: border.border3 },
      { name: 'Border/Border Purple', token: 'border-border-purple', value: border.borderPurple },
    ],
  },
  {
    title: 'Surface & Background',
    description: 'Container and page section backgrounds.',
    tokens: [
      { name: 'Surface/Surface White', token: 'surface-surface-white', value: surface.white },
      { name: 'Surface/Surface colored 1', token: 'surface-surface-colored-1', value: surface.colored1 },
      { name: 'Background/Background 1', token: 'background-background-1', value: background.background1 },
    ],
  },
];
