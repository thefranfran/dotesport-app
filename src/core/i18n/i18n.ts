import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import { resources } from '@/core/i18n/resources';
import { getLanguage } from '@/core/i18n/utils';

const fallbackLocale = 'en';
const locale = Localization.getLocales()[0].languageCode || fallbackLocale;

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguage() || locale,
  fallbackLng: 'en',
  compatibilityJSON: 'v3', // By default, React Native projects does not support Intl

  // allows integrating dynamic values into translations.
  interpolation: {
    escapeValue: false, // escape passed in values to avoid XSS injections
  },
});

export const isRTL: boolean = i18n.dir() === 'rtl';

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
