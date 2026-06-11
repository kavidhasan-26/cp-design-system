import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  type Animated as AnimatedNamespace,
} from 'react-native';
import { amountDisplaySpecs, getAmountDisplayStyles } from './amountDisplayStyles';
import { splitIndianAmountDisplay } from './formatIndianAmount';

type RollingDigitProps = {
  digit: string;
  animate: boolean;
  delay: number;
  slotWidth: AnimatedNamespace.AnimatedInterpolation<number>;
  letterSpacing: AnimatedNamespace.AnimatedInterpolation<number>;
};

const ROLL_CYCLES = 2;
const DIGIT_COUNT = 10;

function RollingDigit({ digit, animate, delay, slotWidth, letterSpacing }: RollingDigitProps) {
  const styles = getAmountDisplayStyles();
  const targetDigit = Number.parseInt(digit, 10);
  const lineHeight = amountDisplaySpecs.amountStyle.fontSize ?? 32;
  const translateY = useRef(new Animated.Value(-targetDigit * lineHeight)).current;

  useEffect(() => {
    if (!animate) {
      translateY.setValue(-targetDigit * lineHeight);
      return;
    }

    translateY.setValue(0);
    Animated.timing(translateY, {
      toValue: -(targetDigit + ROLL_CYCLES * DIGIT_COUNT) * lineHeight,
      duration: amountDisplaySpecs.rollDuration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        translateY.setValue(-targetDigit * lineHeight);
      }
    });
  }, [animate, delay, lineHeight, targetDigit, translateY]);

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
};

export function RollingAmount({ formattedAmount, animate, settleProgress }: RollingAmountProps) {
  const styles = getAmountDisplayStyles();
  const parts = splitIndianAmountDisplay(formattedAmount);
  const lineHeight = amountDisplaySpecs.amountStyle.fontSize ?? 32;

  const layout = useMemo(
    () => ({
      digitGap: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [amountDisplaySpecs.rollDigitGap, amountDisplaySpecs.settledDigitGap],
      }),
      digitSlotWidth: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [amountDisplaySpecs.rollDigitSlotWidth, amountDisplaySpecs.settledDigitSlotWidth],
      }),
      letterSpacing: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [amountDisplaySpecs.rollLetterSpacing, amountDisplaySpecs.settledLetterSpacing],
      }),
      separatorWidth: settleProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [amountDisplaySpecs.rollSeparatorWidth, amountDisplaySpecs.settledSeparatorWidth],
      }),
    }),
    [settleProgress],
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
            delay={currentDigitIndex * amountDisplaySpecs.rollStagger}
            digit={part.value}
            letterSpacing={layout.letterSpacing}
            slotWidth={layout.digitSlotWidth}
          />
        );
      })}
    </Animated.View>
  );
}
