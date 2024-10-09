/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  scheme: Env.SCHEME,
  slug: 'dotesport',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    package: Env.PACKAGE,
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          newArchEnabled: true,
        },
        android: {
          newArchEnabled: true,
        },
      },
    ],
    'expo-localization',
    'expo-font',
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
