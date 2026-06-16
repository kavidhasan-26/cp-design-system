import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  type Animated as AnimatedNamespace,
} from 'react-native';
import {
  getAmountDisplaySpecs,
  getAmountDisplayStyles,
  type AmountDisplaySize,
} from './amountDisplayStyles';
import { splitIndianAmountDisplay } from './formatIndianAmount';

type RollingDigitProps = {
  digit: string;
  animate: boolean;
  delay: number;
  size: AmountDisplaySize;
  slotWidth: AnimatedNamespace.AnimatedInterpolation<number>;
  letterSpacing: AnimatedNamespace.AnimatedInterpolation<number>;
};

const ROLL_CYCLES = 2;
const DIGIT_COUNT = 10;

function RollingDigit({ digit, animate, delay, size, slotWidth, letterSpacing }: RollingDigitProps) {
  const specs = getAmountDisplaySpecs(size);
  const styles = getAmountDisplayStyles(size);
  const targetDigit = Number.parseInt(digit, 10);
  const lineHeight = specs.amountStyle.fontSize ?? 32;
  const translateY = useRef(new Animated.Value(-targetDigit * lineHeight)).current;

  useEffect(() => {
    if (!animate) {
      translateY.setValue(-targetDigit * lineHeight);
      return;
    }

    translateY.setValue(0);
    Animated.timing(translateY, {
      toValue: -(targetDigit + ROLL_CYCLES * DIGIT_COUNT) * lineHeight,
      duration: specs.rollDuration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        translateY.setValue(-targetDigit * lineHeight);
      }
    });
  }, [animate, delay, lineHeight, specs.rollDuration, targetDigit, translateY]);

  return (
    <Animated.View style={[styles.digitSlot, { height: lineHeight, width: slotWidth }]}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {Array.from({ length: ROLL_CYCLES * DIGIT_COUNT + DIGIT_COUNT }, (_, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.digit,
              {
                height: lineHeight,
                letterSpacing,
                lineHeight,
                width: slotWidth,
              },
            ]}
          >
            {index % DIGIT_COUNT}
          </Animated.Text>
        ))}
      </Animated.View>
    </Animated.View>
  );
}

type RollingAmountProps = {
  formattedAmount: string;
  animate: boolean;
  settleProgress: Animated.Value;
  size?: AmountDisplaySize;
};

export function RollingAmount({
  formattedAmount,
  animate,
  settleProgress,
  size = 'normal',
}: RollingAmountProps) {
  const specs = getAmountDisplaySpecs(size);
  const styles = getAmountDisplayStyles(size);
  const parts = splitIndianAmountDisplay(formattedAmount);
  const lineHeight = specs.amountStyle.fontSize ?? 32;

  const layout = useMemo(
    () => ({
      digitGap: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [specs.rollDigitGap, specs.settledDigitGap],
      }),
      digitSlotWidth: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [specs.rollDigitSlotWidth, specs.settledDigitSlotWidth],
      }),
      letterSpacing: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [specs.rollLetterSpacing, specs.settledLetterSpacing],
      }),
      separatorWidth: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [specs.rollSeparatorWidth, specs.settledSeparatorWidth],
      }),
    }),
    [
      settleProgress,
      specs.rollDigitGap,
      specs.rollDigitSlotWidth,
      specs.rollLetterSpacing,
      specs.rollSeparatorWidth,
      specs.settledDigitGap,
      specs.settledDigitSlotWidth,
      specs.settledLetterSpacing,
      specs.settledSeparatorWidth,
    ],
  );

  let digitIndex = 0;

  return (
    <Animated.View style={[styles.amountRow, { gap: layout.digitGap }]}>
      {parts.map((part, index) => {
        if (part.type === 'separator') {
          return (
            <Animated.Text
              key={`${part.value}-${index}`}
              style={[
                styles.separator,
                {
                  letterSpacing: layout.letterSpacing,
                  lineHeight,
                  width: layout.separatorWidth,
                },
              ]}
            >
              {part.value}
            </Animated.Text>
          );
        }

        const currentDigitIndex = digitIndex;
        digitIndex += 1;

        return (
          <RollingDigit
            key={`${index}-${part.value}`}
            animate={animate}
            delay={currentDigitIndex * specs.rollStagger}
            digit={part.value}
            letterSpacing={layout.letterSpacing}
            size={size}
            slotWidth={layout.digitSlotWidth}
          />
        );
      })}
    </Animated.View>
  );
}
