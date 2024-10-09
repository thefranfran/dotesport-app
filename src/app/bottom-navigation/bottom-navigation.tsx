import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FeedProvider } from '@/app/screens/feed/feed.index';

import { type HomeTabParamList } from './types';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name='Feed' component={FeedProvider} />
    </Tab.Navigator>
  );
};
