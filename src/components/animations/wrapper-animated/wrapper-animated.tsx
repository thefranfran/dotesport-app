import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { type WrapperAnimatedProps } from './wrapper-animated.props';

const WrapperAnimated = (props: WrapperAnimatedProps) => {
  const { delay = 0, duration = 300, children } = props;
  const opacity = useSharedValue<number>(0);
  const y = useSharedValue<number>(30);

  const _wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: y.value }],
    };
  });

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    y.value = withDelay(delay, withTiming(0, { duration }));
  }, []);

  return (
    <Animated.View style={_wrapperAnimatedStyle}>{children}</Animated.View>
  );
};

export default WrapperAnimated;
