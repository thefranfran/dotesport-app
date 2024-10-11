/* eslint-disable max-lines-per-function */
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useSelector } from 'react-redux';

import WrapperAnimated from '@/components/animations/wrapper-animated/wrapper-animated';
import { Row } from '@/components/layout';
import Text from '@/components/text';
import {
  selectLeagues,
  selectTeams,
} from '@/core/redux/reducers/esports/esports.selector';
import { type RootState } from '@/core/redux/store';
import { type Leagues, type Team } from '@/types';

import OnboardingEnrollItem from './onboarding-enroll-item';

type OnboardingEnrollmentProps = {
  currentEnrollment: Team | undefined;
  currentLeagues: Leagues | undefined;
  updateLeagues: React.Dispatch<React.SetStateAction<Leagues | undefined>>;
  updateEnrollment: React.Dispatch<React.SetStateAction<Team | undefined>>;
};

const OnboardingEnrollment = (props: OnboardingEnrollmentProps) => {
  const { currentEnrollment, currentLeagues, updateLeagues, updateEnrollment } =
    props;
  const { styles } = useStyles(stylesheet);

  const teams = useSelector((state: RootState) => selectTeams(state));
  const leagues = useSelector((state: RootState) => selectLeagues(state));

  const _handleUpdateEnrollment = useCallback((team: Team) => {
    updateEnrollment(team);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const _handleUpdateLeagues = useCallback((league: Leagues) => {
    updateLeagues(league);
    updateEnrollment(undefined);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <WrapperAnimated>
        <View style={styles.heading}>
          <Text size='lg' preset='heading' tx='onboarding.league' required />
          <Text
            size='sm'
            preset='subheading'
            tx='onboarding.league-precision'
          />
        </View>
        <Row wrap='wrap'>
          {leagues.map((item) => {
            return (
              <OnboardingEnrollItem
                key={`league-${item.id}`}
                isActive={currentLeagues?.id === item.id}
                isAvailable={item.is_available}
                updateEnrollment={() => _handleUpdateLeagues(item)}
                {...item}
              />
            );
          })}
        </Row>
      </WrapperAnimated>

      {currentLeagues ? (
        <WrapperAnimated>
          <View style={styles.heading}>
            <Text size='lg' preset='heading' tx='onboarding.enroll' required />
            <Text
              size='sm'
              preset='subheading'
              tx='onboarding.enroll-precision'
            />
          </View>
          <Row wrap='wrap'>
            {teams.map((item) => {
              return (
                <OnboardingEnrollItem
                  key={`team-${item.id}`}
                  isActive={currentEnrollment?.id === item.id}
                  updateEnrollment={() => _handleUpdateEnrollment(item)}
                  {...item}
                />
              );
            })}
          </Row>
        </WrapperAnimated>
      ) : null}
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  heading: {
    marginBottom: theme.spacing.xl,
  },
}));

export default OnboardingEnrollment;
