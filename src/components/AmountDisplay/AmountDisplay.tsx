import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { EyeClosedIcon, EyeOpenIcon } from '../icons/EyeIcons';
import { amountDisplaySpecs, getAmountDisplayStyles } from './amountDisplayStyles';
import {
  formatIndianAmount,
  getIndianAmountDigitCount,
} from './formatIndianAmount';
import { RollingAmount } from './RollingAmount';

/** Matches Figma property: Visibility */
export type AmountDisplayVisibility = 'visible' | 'hidden';

export type AmountDisplayProps = {
  /** Numeric amount rendered with Indian grouping. */
  amount?: number;
  /** Decimal places shown after the amount. */
  decimals?: number;
  /** Shows the rupee symbol before the amount. */
  showCurrency?: boolean;
  /** Controlled visibility. */
  visible?: boolean;
  /** Initial visibility when uncontrolled. Defaults to hidden for privacy. */
  defaultVisible?: boolean;
  /** Locks appearance for Storybook. Omit in app code for live toggle behavior. */
  visibility?: AmountDisplayVisibility;
  disabled?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function resolveVisible(
  visibility: AmountDisplayVisibility | undefined,
  visible: boolean | undefined,
  internalVisible: boolean,
): boolean {
  if (visibility === 'visible') {
    return true;
  }

  if (visibility === 'hidden') {
    return false;
  }

  return visible ?? internalVisible;
}

export function AmountDisplay({
  amount = 12000,
  decimals = 0,
  showCurrency = true,
  visible,
  defaultVisible = false,
  visibility,
  disabled = false,
  onVisibilityChange,
  style,
  testID,
}: AmountDisplayProps) {
  const styles = getAmountDisplayStyles();
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const [isRolling, setIsRolling] = useState(false);
  const previousVisibleRef = useRef(defaultVisible);
  const settleProgress = useRef(new Animated.Value(defaultVisible ? 1 : 0)).current;

  const resolvedVisible = resolveVisible(visibility, visible, internalVisible);
  const formattedAmount = formatIndianAmount(amount, decimals);
  const maskCount = getIndianAmountDigitCount(amount, decimals);
  const isInteractive = !disabled && visibility === undefined;

  useEffect(() => {
    if (resolvedVisible && !previousVisibleRef.current) {
      setIsRolling(true);
      settleProgress.setValue(0);
    } else if (!resolvedVisible) {
      setIsRolling(false);
      settleProgress.setValue(0);
    } else if (resolvedVisible && previousVisibleRef.current) {
      settleProgress.setValue(1);
    }

    previousVisibleRef.current = resolvedVisible;
  }, [resolvedVisible, settleProgress]);

  useEffect(() => {
    if (!isRolling) {
      return;
    }

    const digitCount = getIndianAmountDigitCount(amount, decimals);
    const rollDuration =
      amountDisplaySpecs.rollDuration + digitCount * amountDisplaySpecs.rollStagger;

    const timer = setTimeout(() => {
      setIsRolling(false);
      Animated.timing(settleProgress, {
        toValue: 1,
        duration: amountDisplaySpecs.settleDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, rollDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [amount, decimals, isRolling, settleProgress]);

  function handleToggle() {
    if (!isInteractive) {
      return;
    }

    const nextVisible = !resolvedVisible;

    if (visible === undefined) {
      setInternalVisible(nextVisible);
    }

    onVisibilityChange?.(nextVisible);
  }

  return (
    <View accessibilityRole="none" style={[styles.root, style]} testID={testID}>
      <View style={styles.amountGroup}>
        {showCurrency ? <Text style={styles.currency}>₹</Text> : null}

        {resolvedVisible ? (
          <RollingAmount
            animate={isRolling}
            formattedAmount={formattedAmount}
            settleProgress={settleProgress}
          />
        ) : (
          <View style={styles.maskRow}>
            {Array.from({ length: maskCount }, (_, index) => (
              <View key={index} style={styles.mask} />
            ))}
          </View>
        )}
      </View>

      <Pressable
        accessibilityLabel={resolvedVisible ? 'Hide amount' : 'Show amount'}
        accessibilityRole="button"
        accessibilityState={{ disabled: !isInteractive }}
        disabled={!isInteractive}
        hitSlop={8}
        onPress={handleToggle}
        style={({ pressed }) => [styles.toggle, pressed && isInteractive && { opacity: 0.8 }]}
        testID={testID ? `${testID}-toggle` : undefined}
      >
        {resolvedVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </Pressable>
    </View>
  );
}

export { formatIndianAmount, getIndianAmountDigitCount } from './formatIndianAmount';
export { amountDisplaySpecs, getAmountDisplayStyles } from './amountDisplayStyles';
