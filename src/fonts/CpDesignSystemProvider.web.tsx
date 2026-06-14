import type { ReactNode } from 'react';
import { ensureInterWebFonts } from './ensureInterWebFonts';

export type CpDesignSystemProviderProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/** Web provider — Inter is injected via Google Fonts; no expo-font needed. */
export function CpDesignSystemProvider({ children }: CpDesignSystemProviderProps) {
  ensureInterWebFonts();
  return children;
}
