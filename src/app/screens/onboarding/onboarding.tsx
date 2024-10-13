import React, { useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { type OnboardingStackScreenProps } from '@/app/bottom-navigation';
import { Screen } from '@/components/screen';
import { type Leagues, type Team } from '@/types';

import { useSubmitAnimation } from './onboarding.hooks';
import NextButton from './onboarding-bottom-button';
import OnboardingEnrollment from './onboarding-enroll/onboarding-enroll';

interface OnboardingProps extends OnboardingStackScreenProps<'Onboarding'> {}

const Onboarding = (props: OnboardingProps) => {
  const { navigation } = props;

  const [enrolledTeam, setEnrolledTeam] = useState<Team | undefined>(undefined);
  const [selectedLeagues, setSelectedLeagues] = useState<Leagues | undefined>(
    undefined,
  );

  const navigateToSettings = useCallback(() => {
    navigation.push('OnboardingSettings', {
      preferred_league: selectedLeagues!,
      preferred_team: enrolledTeam!,
    });
  }, [selectedLeagues, enrolledTeam]); // eslint-disable-line react-hooks/exhaustive-deps

  const { styles } = useStyles(stylesheet);
  const { animatedViewStyle } = useSubmitAnimation({
    enrolledTeam,
    selectedLeagues,
  });

  return (
    <Screen
      preset='auto'
      contentContainerStyle={styles.container}
      safeAreaEdges={['top']}
    >
      <OnboardingEnrollment
        currentEnrollment={enrolledTeam}
        currentLeagues={selectedLeagues}
        updateLeagues={setSelectedLeagues}
        updateEnrollment={setEnrolledTeam}
      />
      <NextButton
        title='Continue your onboarding'
        animationStyles={animatedViewStyle}
        navigate={navigateToSettings}
      />
    </Screen>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg * 2,
    flex: 1,
  },
  helper: {
    paddingHorizontal: theme.spacing.xl * 1.5,
    paddingVertical: theme.spacing.lg,
  },
}));

export default Onboarding;
