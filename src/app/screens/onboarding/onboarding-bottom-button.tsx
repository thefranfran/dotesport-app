import React from 'react';
import { Pressable, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Text from '@/components/text';

interface NextButtonProps {
  animationStyles?: ViewStyle;
  title: string;
  navigate: () => void;
}

const NextButton = (props: NextButtonProps) => {
  const { title, animationStyles, navigate } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <Animated.View style={[animationStyles ?? undefined, styles.container]}>
      <Pressable style={styles.button} onPress={navigate}>
        <Text preset='formLabel' size='md' color='#fff'>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet((theme, runTime) => ({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: runTime.insets.bottom,
  },
  button: {
    backgroundColor: 'black',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl * 1.5,
  },
}));

export default React.memo(
  NextButton,
  (prev, next) => prev.title === next.title,
);
