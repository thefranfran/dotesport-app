import React, { useMemo } from 'react';
import {
  Pressable,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { UnistylesRuntime } from 'react-native-unistyles';

import { type EsportsIconTypes } from '@/components/esport-icon';
import EsportIcon from '@/components/esport-icon/esport-icon';
import Text from '@/components/text';

type OnboardingEnrollmentItemProps = {
  name: string;
  slug: EsportsIconTypes;
  isActive: boolean;
  updateEnrollment: () => void;
};

const ICON_SIZE = 32;
const TEAMS_ADAPTIVE_TINT = [
  'g2-esports',
  'sk-gaming',
  'karmine-corp',
  'giantx',
];

const OnboardingEnrollmentItem = ({
  name,
  slug,
  isActive,
  updateEnrollment,
}: OnboardingEnrollmentItemProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const currentTheme = UnistylesRuntime.themeName;

  const iconAdaptiveTint = useMemo(() => {
    if (
      currentTheme === 'light' &&
      TEAMS_ADAPTIVE_TINT.some((team) => slug.includes(team))
    ) {
      return isActive ? theme.colors.background : '#000';
    }
    return undefined;
  }, [currentTheme, isActive, slug]);

  const textColorReactive: StyleProp<TextStyle> = useMemo(() => {
    return {
      marginLeft: theme.spacing.md,
      color: isActive ? theme.colors.background : theme.colors.text,
    };
  }, [isActive]);

  const itemReactiveStyle: StyleProp<ViewStyle> = useMemo(() => {
    return [
      styles.item,
      {
        borderColor: isActive ? theme.colors.transparent : '#757575',
        backgroundColor: isActive ? '#000' : theme.colors.background,
      },
    ];
  }, [isActive]);

  return (
    <Pressable style={itemReactiveStyle} onPress={updateEnrollment}>
      <EsportIcon icon={slug} size={ICON_SIZE} color={iconAdaptiveTint} />
      <Text style={textColorReactive}>{name}</Text>
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl * 1.5,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    marginBottom: theme.spacing.lg * 1.5,
    marginRight: theme.spacing.xl,
    borderWidth: 1,
  },
}));

export default React.memo(OnboardingEnrollmentItem, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
});
