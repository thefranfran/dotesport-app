import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

type Props = React.ComponentProps<typeof StatusBar>;

export const FocusAwareStatusBar = (props: Props) => {
  const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const barStyle = isDark ? 'light-content' : 'dark-content';

  return isFocused ? (
    <StatusBar animated barStyle={barStyle} {...props} />
  ) : null;
};
