import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {
  BottomNavigation,
  type RootStackParamList,
} from '@/app/bottom-navigation';
import Onboarding from '@/app/screens/onboarding/onboarding';

import { useInitializationNavigation } from './stack-navigation.hooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultScreenOptions = {
  headerShown: false,
} satisfies NativeStackNavigationOptions;

export const StackNavigation = () => {
  const { initialRouteName, initialization } = useInitializationNavigation();

  if (initialization) {
    // TODO: Add a loading screen
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={defaultScreenOptions}
    >
      <Stack.Group navigationKey='OnboardingParent'>
        <Stack.Screen name='Onboarding' component={Onboarding} />
      </Stack.Group>
      <Stack.Screen name='Root' component={BottomNavigation} />
    </Stack.Navigator>
  );
};
