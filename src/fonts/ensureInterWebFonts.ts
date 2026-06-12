import { Platform } from 'react-native';

const INTER_STYLESHEET_ID = 'cp-design-system-inter-fonts';

/** Loads Inter from Google Fonts on web. Safe to call multiple times. */
export function ensureInterWebFonts(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') {
    return;
  }

  if (document.getElementById(INTER_STYLESHEET_ID)) {
    return;
  }

  const link = document.createElement('link');
  link.id = INTER_STYLESHEET_ID;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap';
  document.head.appendChild(link);
}

ensureInterWebFonts();
