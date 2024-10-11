import { MoveRight } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { type OnboardingStackScreenProps } from '@/app/bottom-navigation';
import { Screen } from '@/components/screen';
import Text from '@/components/text';
import { type Leagues, type Team } from '@/types';

import { useSubmitAnimation } from './onboarding.hooks';
import OnboardingEnrollment from './onboarding-enroll/onboarding-enroll';

interface OnboardingProps extends OnboardingStackScreenProps<'Onboarding'> {}

const Onboarding = (props: OnboardingProps) => {
  const { navigation } = props;

  const [enrolledTeam, setEnrolledTeam] = useState<Team | undefined>(undefined);
  const [selectedLeagues, setSelectedLeagues] = useState<Leagues | undefined>(
    undefined,
  );

  const navigateToSettings = useCallback(() => {
    navigation.push('OnboardingSettings');
  }, [navigation]);

  const { styles } = useStyles(stylesheet);
  const { tap, animatedViewStyle } = useSubmitAnimation({
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

      <GestureDetector gesture={tap}>
        <Animated.View style={[animatedViewStyle, styles.continue]}>
          <Pressable style={styles.submit} onPress={navigateToSettings}>
            <Text preset='formLabel' size='md' color='#fff'>
              Continue your onboarding
            </Text>
            <MoveRight
              style={styles.submitIcon}
              color='#fff'
              strokeWidth={1.5}
            />
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </Screen>
  );
};

const stylesheet = createStyleSheet((theme, runTime) => ({
  container: {
    paddingHorizontal: theme.spacing.lg * 2,
    flex: 1,
  },
  helper: {
    paddingHorizontal: theme.spacing.xl * 1.5,
    paddingVertical: theme.spacing.lg,
  },
  continue: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: runTime.insets.bottom,
  },
  submit: {
    backgroundColor: 'black',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl * 1.5,
  },
  submitIcon: {
    marginStart: theme.spacing.md,
  },
}));

export default Onboarding;
