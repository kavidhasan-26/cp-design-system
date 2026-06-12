import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { ensureInterWebFonts } from './ensureInterWebFonts';

export type CpDesignSystemProviderProps = {
  children: ReactNode;
  /** Shown on native while Inter is loading. Defaults to null. */
  fallback?: ReactNode;
};

/**
 * Loads Inter for CP Design System components.
 * Wrap your app root once. Web fonts also load automatically on package import.
 */
export function CpDesignSystemProvider({
  children,
  fallback = null,
}: CpDesignSystemProviderProps) {
  ensureInterWebFonts();

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (Platform.OS !== 'web' && !loaded && !error) {
    return fallback;
  }

  return children;
}
