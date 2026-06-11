import type { ArgTypes } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentDocsPage } from './ComponentDocsPage';

type FigmaSelectOption<T extends string> = {
  value: T;
  label: string;
};

type FigmaSelectConfig<T extends string> = {
  description: string;
  defaultValue: T;
  category?: string;
};

export function figmaSelectArgType<T extends string>(
  name: string,
  options: FigmaSelectOption<T>[],
  config: FigmaSelectConfig<T>,
) {
  const labels = Object.fromEntries(options.map((option) => [option.value, option.label])) as Record<T, string>;

  return {
    name,
    description: config.description,
    control: { type: 'select' as const },
    options: options.map((option) => option.value),
    labels,
    table: {
      category: config.category ?? 'Figma properties',
      type: { summary: options.map((option) => option.label).join(' | ') },
      defaultValue: { summary: labels[config.defaultValue] ?? config.defaultValue },
    },
  };
}

type FigmaBooleanConfig = {
  description: string;
  defaultValue?: boolean;
  category?: string;
};

export function figmaBooleanArgType(name: string, config: FigmaBooleanConfig) {
  return {
    name,
    description: config.description,
    control: { type: 'boolean' as const },
    table: {
      category: config.category ?? 'Figma properties',
      type: { summary: 'boolean' },
      defaultValue: { summary: String(config.defaultValue ?? false) },
    },
  };
}

type FigmaTextConfig = {
  description: string;
  defaultValue?: string;
  category?: string;
};

export function figmaTextArgType(name: string, config: FigmaTextConfig) {
  return {
    name,
    description: config.description,
    control: { type: 'text' as const },
    table: {
      category: config.category ?? 'Figma properties',
      type: { summary: 'string' },
      defaultValue: { summary: config.defaultValue ? `"${config.defaultValue}"` : 'undefined' },
    },
  };
}

type FigmaNumberConfig = {
  description: string;
  defaultValue?: number;
  category?: string;
};

export function figmaNumberArgType(name: string, config: FigmaNumberConfig) {
  return {
    name,
    description: config.description,
    control: { type: 'number' as const },
    table: {
      category: config.category ?? 'Figma properties',
      type: { summary: 'number' },
      defaultValue: { summary: String(config.defaultValue ?? 0) },
    },
  };
}

export function figmaActionArgType(name: string, description: string) {
  return {
    name,
    description,
    action: name,
    table: {
      category: 'Events',
      type: { summary: '() => void' },
    },
  };
}

export function createFigmaArgTypes<T extends ArgTypes>(argTypes: T): T {
  return argTypes;
}

/** Shared parameters for component stories — Carbon-style canvas + bottom panel. */
export const componentStoryParameters = {
  layout: 'centered' as const,
  controls: {
    expanded: true,
    sort: 'alpha' as const,
  },
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  docs: {
    page: ComponentDocsPage,
    story: {
      inline: true,
    },
    canvas: {
      layout: 'centered' as const,
    },
    source: {
      type: 'dynamic' as const,
      excludeDecorators: true,
    },
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: true }],
    },
    test: 'todo' as const,
  },
};

type ComponentMetaOptions<T> = {
  title?: string;
  component: T;
  argTypes: ArgTypes;
  args: Record<string, unknown>;
  previewBackground?: string;
};

export function createComponentMeta<C>({
  title,
  component,
  argTypes,
  args,
  previewBackground = '#f4f4f4',
}: ComponentMetaOptions<C>) {
  return {
    ...(title ? { title } : {}),
    component,
    tags: ['autodocs'],
    parameters: {
      ...componentStoryParameters,
      backgrounds: {
        default: 'canvas',
        values: [{ name: 'canvas', value: previewBackground }],
      },
    },
    argTypes,
    args: {
      ...args,
      onPress: fn(),
    },
  };
}
