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
import { amountDisplaySpecs, getAmountDisplayStyles, type AmountDisplaySize } from './amountDisplayStyles';
import {
  formatIndianAmount,
  getIndianAmountDigitCount,
} from './formatIndianAmount';
import { RollingAmount } from './RollingAmount';

/** Matches Figma property: Visibility */
export type AmountDisplayVisibility = 'visible' | 'hidden';

/** With toggle — privacy mask and eye control. Without toggle — amount only. */
export type AmountDisplayVariant = 'with-toggle' | 'without-toggle';

export type AmountDisplayProps = {
  /** Numeric amount rendered with Indian grouping. */
  amount?: number;
  /** Decimal places shown after the amount. */
  decimals?: number;
  /** When true, shows the ₹ symbol before the amount. Defaults to true. */
  showCurrency?: boolean;
  /** With toggle shows privacy controls. Without toggle always shows the amount. */
  variant?: AmountDisplayVariant;
  /** Controlled visibility. Only applies when variant is with-toggle. */
  visible?: boolean;
  /** Initial visibility when uncontrolled. Only applies when variant is with-toggle. */
  defaultVisible?: boolean;
  /** Locks appearance for Storybook. Only applies when variant is with-toggle. */
  visibility?: AmountDisplayVisibility;
  disabled?: boolean;
  /** Without-toggle only. Shows a replay control to re-run the rolling animation. Defaults to false. */
  showReplayButton?: boolean;
  /** Figma property: Size — normal uses Numeral 2 (32px). Large uses Numeral 1 (40px). */
  size?: AmountDisplaySize;
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

type AmountDisplayContentProps = Omit<AmountDisplayProps, 'variant'>;

function useRollSettleEffect(
  isRolling: boolean,
  amount: number,
  decimals: number,
  settleProgress: Animated.Value,
  setIsRolling: (rolling: boolean) => void,
) {
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
  }, [amount, decimals, isRolling, settleProgress, setIsRolling]);
}

function AmountDisplayWithoutToggle({
  amount = 12000,
  decimals = 0,
  showCurrency = true,
  showReplayButton = false,
  size = 'normal',
  style,
  testID,
}: AmountDisplayContentProps) {
  const styles = getAmountDisplayStyles(size);
  const [isRolling, setIsRolling] = useState(true);
  const [rollKey, setRollKey] = useState(0);
  const settleProgress = useRef(new Animated.Value(0)).current;
  const formattedAmount = formatIndianAmount(amount, decimals);

  useEffect(() => {
    setIsRolling(true);
    settleProgress.setValue(0);
  }, [amount, decimals, settleProgress]);

  useRollSettleEffect(isRolling, amount, decimals, settleProgress, setIsRolling);

  function handleReplay() {
    setIsRolling(true);
    settleProgress.setValue(0);
    setRollKey((key) => key + 1);
  }

  return (
    <View accessibilityRole="text" style={[styles.root, style]} testID={testID}>
      <View style={styles.amountGroup}>
        {showCurrency ? <Text style={styles.currency}>₹</Text> : null}
        <RollingAmount
          key={rollKey}
          animate={isRolling}
          formattedAmount={formattedAmount}
          settleProgress={settleProgress}
          size={size}
        />
      </View>

      {showReplayButton ? (
        <Pressable
          accessibilityLabel="Replay amount animation"
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleReplay}
          style={({ pressed }) => [styles.replayButton, pressed && { opacity: 0.8 }]}
          testID={testID ? `${testID}-replay` : undefined}
        >
          <Text style={styles.replayLabel}>Replay</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function AmountDisplayWithToggle({
  amount = 12000,
  decimals = 0,
  showCurrency = true,
  visible,
  defaultVisible = false,
  visibility,
  disabled = false,
  size = 'normal',
  onVisibilityChange,
  style,
  testID,
}: AmountDisplayContentProps) {
  const styles = getAmountDisplayStyles(size);
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

  useRollSettleEffect(isRolling, amount, decimals, settleProgress, setIsRolling);

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
            size={size}
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
        {resolvedVisible ? (
          <EyeOpenIcon color={amountDisplaySpecs.colors.toggleIcon} />
        ) : (
          <EyeClosedIcon color={amountDisplaySpecs.colors.toggleIcon} />
        )}
      </Pressable>
    </View>
  );
}

export function AmountDisplay({ variant = 'with-toggle', ...props }: AmountDisplayProps) {
  if (variant === 'without-toggle') {
    return <AmountDisplayWithoutToggle {...props} />;
  }

  return <AmountDisplayWithToggle {...props} />;
}

export { formatIndianAmount, getIndianAmountDigitCount } from './formatIndianAmount';
export { amountDisplaySpecs, amountDisplaySpecsBySize, getAmountDisplaySpecs, getAmountDisplayStyles } from './amountDisplayStyles';
export type { AmountDisplaySize } from './amountDisplayStyles';
