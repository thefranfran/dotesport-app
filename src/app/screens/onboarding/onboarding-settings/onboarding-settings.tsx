/* eslint-disable max-lines-per-function */
import React, { useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { type OnboardingStackScreenProps } from '@/app/bottom-navigation';
import FontScaling from '@/components/font-scaling/font-scaling';
import { Screen } from '@/components/screen';
import { useHaptic } from '@/core/hooks/use-haptics';

import NextButton from '../onboarding-bottom-button';
import { useHeader } from './onboarding-settings.hooks';
import OnboardingSetting from './onboarding-settings-row';

interface OnboardingSettingsProps
  extends OnboardingStackScreenProps<'OnboardingSettings'> {}

type Settings = {
  notifications: boolean;
  tracking: boolean;
  theme: 'light' | 'dark';
};

const OnboardingSettings = (props: OnboardingSettingsProps) => {
  const { navigation, route } = props;
  const { styles } = useStyles(stylesheet);
  const toggleFeedback = useHaptic('selection');

  const [settings, setSettings] = useState<Settings>({
    notifications: false,
    tracking: false,
    theme: 'light',
  });

  const { position, visibleFontScaling, toggleFontScaling } = useHeader({
    navigation,
  });

  const navigateToProfile = useCallback(() => {
    navigation.push('OnboardingProfile', {
      ...route.params,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSwitch = useCallback((key: keyof Settings) => {
    toggleFeedback();
    setSettings((prev) => ({
      ...prev,
      [key]:
        key === 'theme'
          ? prev.theme === 'light'
            ? 'dark'
            : 'light'
          : !prev[key],
    }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen preset='auto' contentContainerStyle={styles.container}>
      <FontScaling
        visible={visibleFontScaling}
        position={position}
        toggleFontScaling={toggleFontScaling}
      />

      <OnboardingSetting
        title='Notifications'
        description='Receive notifications for upcoming games, team updates, and more by enabling push notifications.'
        value={settings.notifications}
        onToggle={() => toggleSwitch('notifications')}
      />
      <OnboardingSetting
        title='Tracking activities'
        description='By enabling tracking your activities through the application, it helps us to provide you a better experience.'
        value={settings.tracking}
        onToggle={() => toggleSwitch('tracking')}
      />
      <OnboardingSetting
        title='Preferred theme'
        description='Choose between light and dark theme based on your preference.'
        value={settings.theme === 'dark'}
        onToggle={() => toggleSwitch('theme')}
      />
      <OnboardingSetting
        title='Language'
        description='Choose between the available languages for the application.'
        value={false}
        onToggle={() => {}}
      />

      <NextButton title='Create your profile' navigate={navigateToProfile} />
    </Screen>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg * 2,
    paddingTop: theme.spacing.xl * 2,
  },
}));

export default OnboardingSettings;
