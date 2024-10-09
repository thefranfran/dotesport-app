import { NativeModules } from 'react-native';
import apisaucePlugin from 'reactotron-apisauce';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import { reactotronRedux } from 'reactotron-redux';

import { resetStore } from '@/core/redux/utils';
import { clear, storage } from '@/core/storage';

import {
  networking,
  openInEditor,
  Reactotron,
  type ReactotronReactNative,
  trackGlobalLogs,
} from './reactotron-client';

const reactotron = Reactotron.configure({
  host: 'localhost',
  name: require('../../package.json').name,
  onConnect() {
    Reactotron.clear();
  },
})
  .use(mmkvPlugin<ReactotronReactNative>({ storage }))
  .use(reactotronRedux())
  .use(apisaucePlugin())
  .use(openInEditor())
  //@ts-ignore
  .use(trackGlobalLogs())
  //@ts-ignore
  .use(networking())
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  });

reactotron.onCustomCommand({
  title: 'Show Dev Menu',
  description: 'Opens the React Native dev menu',
  command: 'showDevMenu',
  handler: () => {
    Reactotron.log('Showing React Native dev menu');
    NativeModules.DevMenu.show();
  },
});

reactotron.onCustomCommand({
  title: 'Reset Store',
  description: 'Resets the MMKV store',
  command: 'resetStore',
  handler: () => {
    Reactotron.log('resetting store');
    clear();
  },
});

reactotron.onCustomCommand({
  title: 'Reset Redux Store',
  description: 'Resets the redux store',
  command: 'resetReduxStore',
  handler: () => {
    Reactotron.log('resetting redux store');
    resetStore();
  },
});

reactotron.onCustomCommand({
  title: 'Reset Navigation State',
  description: 'Resets the navigation state',
  command: 'resetNavigation',
  handler: () => {
    Reactotron.log('resetting navigation state');
  },
});

console.tron = reactotron;

/**
 * We tell typescript about our dark magic
 *
 * You can also import Reactotron yourself from ./reactotronClient
 * and use it directly, like Reactotron.log('hello world')
 */
declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance, and more.
     * @see https://github.com/infinitered/reactotron
     * @example
     * if (__DEV__) {
     *  console.tron.display({
     *    name: 'JOKE',
     *    preview: 'What's the best thing about Switzerland?',
     *    value: 'I don't know, but the flag is a big plus!',
     *    important: true
     *  })
     * }
     */
    tron: typeof reactotron;
  }
}

reactotron.connect();

export default reactotron;
