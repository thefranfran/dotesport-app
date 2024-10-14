import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';

import { type OnboardingStackParamList } from '@/app/bottom-navigation';
import Header from '@/components/header';

export const useHeader = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    OnboardingStackParamList,
    keyof OnboardingStackParamList,
    undefined
  >;
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header title='Profile' />,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
