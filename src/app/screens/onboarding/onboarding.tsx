import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { type RootStackScreenProps } from '@/app/bottom-navigation';
import { Screen } from '@/components/screen';
import Text from '@/components/text';
import { type Leagues, type Team } from '@/types';

import { useSubmitAnimation } from './onboarding.hooks';
import OnboardingEnrollment from './onboarding-enroll/onboarding-enroll';

interface OnboardingProps extends RootStackScreenProps<'Onboarding'> {}

const Onboarding = (props: OnboardingProps) => {
  const { navigation } = props;

  const [enrolledTeam, setEnrolledTeam] = useState<Team | undefined>(undefined);
  const [selectedLeagues, setSelectedLeagues] = useState<Leagues[]>([]);

  const { styles, theme } = useStyles(stylesheet);
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
        updateEnrollment={setEnrolledTeam}
      />
      <Pressable style={styles.helper}>
        <Text preset='bold' color='#fff'>
          Get more information about how the leagues and teams work through the
          application
        </Text>
      </Pressable>

      <GestureDetector gesture={tap}>
        <Animated.View style={[animatedViewStyle, styles.continue]}>
          <Pressable style={styles.submit}>
            <Text>Next</Text>
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
    backgroundColor: '#000',
    paddingHorizontal: theme.spacing.xl * 1.5,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.radius.xl,
  },
  continue: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: runTime.insets.bottom,
  },
  submit: {
    backgroundColor: 'red',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.xl,
  },
}));

export default Onboarding;
