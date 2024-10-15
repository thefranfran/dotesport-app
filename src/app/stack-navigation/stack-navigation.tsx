import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {
  BottomNavigation,
  type RootStackParamList,
} from '@/app/bottom-navigation';

import { OnboardingStackNavigation } from './onboarding-stack';
import { useInitializationNavigation } from './stack-navigation.hooks';
import Article from '@/app/screens/article';

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultScreenOptions = {
  headerShown: false,
} satisfies NativeStackNavigationOptions;

export const StackNavigation = () => {
  const { hasToCompleteOnboarding, initialization } =
    useInitializationNavigation();

  if (initialization) {
    // TODO: Add a loading screen
    return null;
  }

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      {!hasToCompleteOnboarding ? (
        <Stack.Screen
          name='OnboardingStack'
          component={OnboardingStackNavigation}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen name='Root' component={BottomNavigation} />
          <Stack.Screen
            name='Article'
            component={Article}
            options={{
              presentation: 'modal',
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
