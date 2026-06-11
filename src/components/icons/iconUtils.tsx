import type { ReactNode } from 'react';
import { purple } from '../../tokens/primitives/colors';
import { text } from '../../tokens/semantic/colors';
import { ArrowRightIcon } from './ArrowRightIcon';

export function renderIconSlot(
  slot: boolean | ReactNode | undefined,
  color: string,
): ReactNode | null {
  if (slot === true) {
    return <ArrowRightIcon color={color} />;
  }

  if (slot) {
    return slot;
  }

  return null;
}

export function getButtonIconColor(
  hierarchy: 'primary' | 'secondary' | 'tertiary',
  visualState: 'active' | 'hovered' | 'disabled',
): string {
  if (visualState === 'disabled') {
    return text.disabled;
  }

  if (hierarchy === 'primary') {
    return text.onPrimary;
  }

  return purple[40];
}
