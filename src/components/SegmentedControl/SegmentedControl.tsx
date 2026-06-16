import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  getSegmentedControlStyles,
  segmentedControlSpecs,
  type SegmentedControlOptionCount,
} from './segmentedControlStyles';

/** 1-based selected segment — matches Figma Selected property. Storybook only. */
export type SegmentedControlAppearance = 1 | 2 | 3;

export type SegmentedControlOptions =
  | readonly [string, string]
  | readonly [string, string, string];

export type SegmentedControlProps = {
  /** Segment labels — exactly 2 or 3 options. */
  options: SegmentedControlOptions;
  /** Controlled selected index (0-based). */
  selectedIndex?: number;
  /** Initial selected index when uncontrolled. Defaults to 0. */
  defaultSelectedIndex?: number;
  /** Locks selection for Storybook. 1-based to match Figma. Omit in app code. */
  appearance?: SegmentedControlAppearance;
  disabled?: boolean;
  /** Stretches to fill the parent width while keeping equal segment widths. */
  fullWidth?: boolean;
  onChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

type SegmentLayout = {
  x: number;
  width: number;
};

function resolveSelectedIndex(
  appearance: SegmentedControlAppearance | undefined,
  selectedIndex: number | undefined,
  internalIndex: number,
): number {
  if (appearance !== undefined) {
    return appearance - 1;
  }

  return selectedIndex ?? internalIndex;
}

function assertOptionCount(count: number): asserts count is SegmentedControlOptionCount {
  if (count !== 2 && count !== 3) {
    throw new Error('SegmentedControl requires exactly 2 or 3 options.');
  }
}

export function SegmentedControl({
  options,
  selectedIndex,
  defaultSelectedIndex = 0,
  appearance,
  disabled = false,
  fullWidth = false,
  onChange,
  style,
  testID,
}: SegmentedControlProps) {
  assertOptionCount(options.length);

  const styles = getSegmentedControlStyles(disabled, options.length);
  const [internalIndex, setInternalIndex] = useState(defaultSelectedIndex);
  const [layouts, setLayouts] = useState<SegmentLayout[]>([]);
  const [thumbReady, setThumbReady] = useState(false);
  const thumbX = useRef(new Animated.Value(0)).current;
  const thumbWidth = useRef(new Animated.Value(0)).current;
  const hasAnimated = useRef(false);

  const resolvedIndex = resolveSelectedIndex(appearance, selectedIndex, internalIndex);
  const isInteractive = !disabled && appearance === undefined;

  useEffect(() => {
    hasAnimated.current = false;
    setThumbReady(false);
    setLayouts([]);
  }, [options.length, options.join('\u0000')]);

  useEffect(() => {
    const layout = layouts[resolvedIndex];
    if (!layout) {
      return;
    }

    if (!hasAnimated.current) {
      thumbX.setValue(layout.x);
      thumbWidth.setValue(layout.width);
      hasAnimated.current = true;
      setThumbReady(true);
      return;
    }

    Animated.parallel([
      Animated.timing(thumbX, {
        toValue: layout.x,
        duration: segmentedControlSpecs.animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(thumbWidth, {
        toValue: layout.width,
        duration: segmentedControlSpecs.animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, [layouts, resolvedIndex, thumbWidth, thumbX]);

  function handleSegmentLayout(index: number, event: LayoutChangeEvent) {
    const { x, width } = event.nativeEvent.layout;

    setLayouts((previous) => {
      const next = [...previous];
      next[index] = { x, width };
      return next;
    });
  }

  function handlePress(index: number) {
    if (!isInteractive || index === resolvedIndex) {
      return;
    }

    if (selectedIndex === undefined) {
      setInternalIndex(index);
    }

    onChange?.(index);
  }

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.root, fullWidth ? styles.fullWidth : null, style]}
      testID={testID}
    >
      <View style={styles.track}>
        <View style={styles.row}>
          {thumbReady ? (
            <Animated.View
              pointerEvents="none"
              style={[styles.thumb, { left: thumbX, width: thumbWidth }]}
            />
          ) : null}

          {options.map((label, index) => {
            const selected = index === resolvedIndex;

            return (
              <Pressable
                key={`${index}-${label}`}
                accessibilityRole="tab"
                accessibilityState={{ disabled: !isInteractive, selected }}
                disabled={!isInteractive}
                onLayout={(event) => handleSegmentLayout(index, event)}
                onPress={() => handlePress(index)}
                style={({ pressed }) => [
                  styles.segment,
                  pressed && isInteractive ? styles.segmentPressed : null,
                ]}
                testID={testID ? `${testID}-segment-${index}` : undefined}
              >
                <Text style={selected ? styles.selectedLabel : styles.label}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export { getSegmentedControlStyles, segmentedControlSpecs } from './segmentedControlStyles';
