import type { BottomSheetHeight, BottomSheetMaxHeight } from './bottomSheetStyles';

export function resolveMaxHeight(
  maxHeight: BottomSheetMaxHeight,
  containerHeight: number,
): number {
  if (typeof maxHeight === 'number') {
    return maxHeight;
  }

  const match = /^(\d+(?:\.\d+)?)%$/.exec(maxHeight);
  if (match) {
    return containerHeight * (Number.parseFloat(match[1]) / 100);
  }

  return containerHeight * 0.9;
}

export function resolveSheetHeight(
  height: BottomSheetHeight,
  maxHeightPx: number,
  containerHeight: number,
): number | undefined {
  if (height === 'fit-content') {
    return undefined;
  }

  if (height === 'medium') {
    return Math.min(containerHeight * 0.5, maxHeightPx);
  }

  if (height === 'large') {
    return maxHeightPx;
  }

  return Math.min(height, maxHeightPx);
}
