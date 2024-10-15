import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ALargeSmall, MoveLeft } from 'lucide-react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { type LayoutChangeEvent, type LayoutRectangle } from 'react-native';

import { type OnboardingStackParamList } from '@/app/bottom-navigation';
import Header from '@/components/header';
import Icon from '@/components/icon';

export const useHeader = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    OnboardingStackParamList,
    keyof OnboardingStackParamList,
    undefined
  >;
}) => {
  const [position, setPosition] = useState<LayoutRectangle>();
  const [visibleFontScaling, setVisibleFontScaling] = useState<boolean>(false);

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
  }, [navigation]); // eslint-disable-line react-hooks/exhaustive-deps

  return { visibleFontScaling, position, toggleFontScaling };
};
