import { LogBox } from 'react-native';

if (__DEV__) {
  LogBox.ignoreLogs([
    'getHost: "Invalid non-string URL" for scriptURL - Falling back to localhost',
  ]);
}
