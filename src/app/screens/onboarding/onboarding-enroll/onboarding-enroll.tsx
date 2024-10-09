import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useSelector } from 'react-redux';

import { Row } from '@/components/layout';
import Text from '@/components/text';
import { selectTeams } from '@/core/redux/reducers/esports/esports.selector';
import { type RootState } from '@/core/redux/store';
import { type Team } from '@/types';

import OnboardingEnrollItem from './onboarding-enroll-item';

const MAX_LIST_ITEMS_PER_ROW = 2;

type OnboardingEnrollmentProps = {
  currentEnrollment: Team | undefined;
  updateEnrollment: React.Dispatch<React.SetStateAction<Team | undefined>>;
};

const OnboardingEnrollment = (props: OnboardingEnrollmentProps) => {
  const { currentEnrollment, updateEnrollment } = props;
  const { styles } = useStyles(stylesheet);

  const teams = useSelector((state: RootState) => selectTeams(state));

  const _handleUpdateEnrollment = useCallback(
    (team: Team) => {
      updateEnrollment(team);
    },
    [updateEnrollment],
  );

  return (
    <>
      <Text size='xl' preset='heading' tx='onboarding.league' />
      <Text size='sm' preset='subheading' tx='onboarding.league-precision' />
      <Row wrap='wrap'></Row>

      <View style={styles.enrollContainer}>
        <Text size='xl' preset='heading' tx='onboarding.enroll' />
        <Text size='sm' preset='subheading' tx='onboarding.enroll-precision' />
        <FlatList
          data={teams}
          keyExtractor={(item) => `team-${item.id}`}
          contentContainerStyle={styles.list}
          numColumns={MAX_LIST_ITEMS_PER_ROW}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <OnboardingEnrollItem
                isActive={currentEnrollment?.id === item.id}
                updateEnrollment={() => _handleUpdateEnrollment(item)}
                {...item}
              />
            );
          }}
        />
      </View>
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  enrollContainer: {
    marginTop: theme.spacing.xl * 2,
  },
  list: {
    marginTop: theme.spacing.xl * 2,
  },
}));

export default OnboardingEnrollment;
