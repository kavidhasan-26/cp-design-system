import { Platform } from 'react-native';

const INTER_WEB = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';

/** Maps token weights to loaded Inter faces on native and CSS Inter on web. */
export function getInterFontFamily(fontWeight: '400' | '500' | '700'): string {
  if (Platform.OS === 'web') {
    return INTER_WEB;
  }

  switch (fontWeight) {
    case '700':
      return 'Inter_700Bold';
    case '500':
      return 'Inter_500Medium';
    default:
      return 'Inter_400Regular';
  }
}

export const interFontFamily = INTER_WEB;
