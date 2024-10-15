import { useCallback } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useDispatch } from 'react-redux';

import NextButton from '@/app/screens/onboarding/onboarding-bottom-button';
import Button from '@/components/button/button';
import { Stack } from '@/components/layout';
import { Screen } from '@/components/screen';
import Separator from '@/components/separator';
import Text from '@/components/text';
import { updateOnboarding } from '@/core/redux/reducers/authentication/authentication.reducer';

import { useHeader } from './onboarding-profile.hooks';
import { type OnboardingProfileProps } from './onboarding-profile.props';

const OnboardingProfile = (props: OnboardingProfileProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { styles } = useStyles(stylesheet);

  useHeader({ navigation });

  const skip = useCallback(() => {
    dispatch(updateOnboarding(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen preset='fixed' contentContainerStyle={styles.container}>
      <Stack justify='center'>
        <Button text='Create my profile' />
        <Separator />
        <Button preset='riot' text='Link my riot account' />
        <Text style={styles.riot_infos}>
          Speed up the process by linking your riot account, futhermore it will
          be required to get rewards if you want to claim them.
        </Text>
      </Stack>
      <NextButton title='Skip' navigate={skip} />
    </Screen>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl * 2,
    justifyContent: 'center',
  },
  riot_infos: {
    marginTop: theme.spacing.xl,
  },
}));

export default OnboardingProfile;
