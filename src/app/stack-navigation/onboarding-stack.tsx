import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { type OnboardingStackParamList } from '@/app/bottom-navigation';
import Onboarding from '@/app/screens/onboarding/onboarding';
import OnboardingProfile from '@/app/screens/onboarding/onboarding-profile/onboarding-profile';
import OnboardingSettings from '@/app/screens/onboarding/onboarding-settings/onboarding-settings';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const defaultScreenOptions = {
  headerShown: false,
} satisfies NativeStackNavigationOptions;

export const OnboardingStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName='Onboarding'
    >
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='OnboardingSettings' component={OnboardingSettings} />
      <Stack.Screen name='OnboardingProfile' component={OnboardingProfile} />
    </Stack.Navigator>
  );
};
