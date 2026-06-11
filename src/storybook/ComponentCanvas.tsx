import type { Decorator } from '@storybook/react';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type ComponentCanvasProps = {
  children: ReactNode;
  backgroundColor?: string;
  compact?: boolean;
};

/** Carbon-style component preview canvas — centered on a neutral background. */
export function ComponentCanvas({ children, backgroundColor = '#f4f4f4', compact = false }: ComponentCanvasProps) {
  return (
    <View style={[styles.canvas, compact ? styles.canvasCompact : styles.canvasStory, { backgroundColor }]}>
      {children}
    </View>
  );
}

export function componentCanvasDecorator(backgroundColor = '#f4f4f4'): Decorator {
  return (Story, context) => {
    const compact = context.viewMode === 'docs';

    return (
      <ComponentCanvas backgroundColor={backgroundColor} compact={compact}>
        <Story />
      </ComponentCanvas>
    );
  };
}

const styles = StyleSheet.create({
  canvas: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasStory: {
    minHeight: 280,
    padding: 48,
  },
  canvasCompact: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});
