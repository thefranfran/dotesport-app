import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from '@/app/screens/feed';

import { type HomeTabParamList } from './types';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name='Feed' component={Feed} />
    </Tab.Navigator>
  );
};
