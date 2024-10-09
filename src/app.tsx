import 'react-native-gesture-handler';
import '@/ui/unistyles';

import { registerRootComponent } from 'expo';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { RootLayout } from '@/app/layout';

if (__DEV__) {
  require('./devtools/ignore-warnings');
  require('./devtools/reactotron-config');
  require('./devtools/wdyr');
}

enableScreens(true);
enableFreeze(true);

function App() {
  return <RootLayout />;
}

registerRootComponent(App);
