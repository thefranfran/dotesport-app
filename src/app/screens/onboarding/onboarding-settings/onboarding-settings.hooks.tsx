import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ALargeSmall, MoveLeft } from 'lucide-react-native';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
  type LayoutChangeEvent,
  type LayoutRectangle,
  type ViewStyle,
} from 'react-native';

import { type OnboardingStackParamList } from '@/app/bottom-navigation';
import Header from '@/components/header';
import Icon from '@/components/icon';
import { useFontSize } from '@/core/font-scaling';
import { spacing } from '@/ui';

export const useHeader = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    OnboardingStackParamList,
    'OnboardingSettings',
    undefined
  >;
}) => {
  const [position, setPosition] = useState<LayoutRectangle>();
  const [visibleFontScaling, setVisibleFontScaling] = useState<boolean>(false);

  const { currentFontSize } = useFontSize();

  const headerStyle = useMemo(
    () => ({
      marginHorizontal: spacing.xl * 1.5 * currentFontSize,
    }),
    [currentFontSize], // eslint-disable-line react-hooks/exhaustive-deps
  ) satisfies ViewStyle;

  const toggleFontScaling = useCallback(() => {
    setVisibleFontScaling((prev) => !prev);
  }, []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setPosition(event.nativeEvent.layout);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title='Settings'
          onLeftPress={navigation.goBack}
          style={headerStyle}
          LeftActionComponent={
            <Icon
              onPress={navigation.goBack}
              lucideIcon={(props) => <MoveLeft {...props} />}
            />
          }
          RightActionComponent={
            <Icon
              onPress={toggleFontScaling}
              onLayout={onLayout}
              lucideIcon={(props) => <ALargeSmall {...props} />}
            />
          }
        />
      ),
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { visibleFontScaling, position, toggleFontScaling };
};
