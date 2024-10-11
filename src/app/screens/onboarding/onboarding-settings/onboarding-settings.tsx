import { ALargeSmall, MoveLeft } from 'lucide-react-native';
import { useLayoutEffect, useMemo } from 'react';
import { Pressable, type ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { type OnboardingStackScreenProps } from '@/app/bottom-navigation';
import Header from '@/components/header';
import { Screen } from '@/components/screen';
import { useFontSize } from '@/core/font-scaling';

interface OnboardingSettingsProps
  extends OnboardingStackScreenProps<'OnboardingSettings'> {}

const OnboardingSettings = (props: OnboardingSettingsProps) => {
  const { navigation } = props;
  const { currentFontSize } = useFontSize();

  const { styles, theme } = useStyles(stylesheet);

  const headerStyle = useMemo(
    () => ({
      marginHorizontal: theme.spacing.xl * currentFontSize,
    }),
    [currentFontSize], // eslint-disable-line react-hooks/exhaustive-deps
  ) satisfies ViewStyle;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title='Settings'
          onLeftPress={navigation.goBack}
          style={headerStyle}
          LeftActionComponent={
            <Pressable onPress={navigation.goBack}>
              <MoveLeft color={theme.colors.text} size={32} />
            </Pressable>
          }
          RightActionComponent={
            <Pressable>
              <ALargeSmall color={theme.colors.text} size={32} />
            </Pressable>
          }
        />
      ),
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Screen preset='auto' contentContainerStyle={styles.container} />;
};

const stylesheet = createStyleSheet((theme, md) => ({
  container: {
    flex: 1,
  },
}));

export default OnboardingSettings;
