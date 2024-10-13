/* eslint-disable max-lines-per-function */
import { Slider } from '@miblanchard/react-native-slider';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { MAX_FONT_MULTIPLIER, useFontSize } from '@/core/font-scaling';

import { type FontScalingProps } from './font-scaling.props';

const FontScaling = (props: FontScalingProps) => {
  const { visible, position, toggleFontScaling } = props;
  const { currentFontSize, changeFontSize } = useFontSize();

  const [scalingValue, setScalingValue] = useState<number>(currentFontSize);

  const { styles, theme } = useStyles(stylesheet);
  const { top } = useSafeAreaInsets();

  const opacity = useSharedValue<number>(0);

  const boxFontScalingStyle = useMemo(
    () => ({
      position: 'absolute',
      top: (position?.y ?? 0) * 4 + top * currentFontSize,
      right: (position?.width ?? 0) / 2,
      zIndex: 9999,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.sm,
      width: 150,
      backgroundColor: '#e3e3e3',
      borderRadius: theme.radius.lg,
    }),
    [position, top, currentFontSize], // eslint-disable-line react-hooks/exhaustive-deps
  ) satisfies ViewStyle;

  const boxAnimationStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const updateScalingValue = useCallback((value: number[]) => {
    if (value[0] > MAX_FONT_MULTIPLIER) {
      return;
    }

    setScalingValue(value[0]);
    changeFontSize(value[0]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      style={styles.container}
      transparent
      visible={visible}
      animationType='fade'
    >
      <TouchableWithoutFeedback onPress={toggleFontScaling}>
        <View style={styles.container}>
          <Animated.View style={[boxFontScalingStyle, boxAnimationStyle]}>
            <Slider
              value={scalingValue}
              animateTransitions
              thumbTintColor='#000'
              minimumTrackTintColor='#000'
              maximumTrackTintColor='#000'
              maximumValue={MAX_FONT_MULTIPLIER}
              minimumValue={1}
              step={0.1}
              onValueChange={(value) => updateScalingValue(value)}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}));

export default FontScaling;
