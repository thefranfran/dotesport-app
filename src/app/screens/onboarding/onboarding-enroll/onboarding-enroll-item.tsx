import React, { useMemo } from 'react';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Button from '@/components/button/button';
import Icon, { type IconTypes } from '@/components/icon';
import {
  LEAGUES_ADAPTIVE_TINT,
  LEAGUES_ADJUSTED_TINT,
  TEAMS_ADAPTIVE_TINT,
  TEAMS_ADJUSTED_TINT,
} from '@/core/esports';

type OnboardingEnrollmentItemProps = {
  name: string;
  slug: IconTypes;
  isActive: boolean;
  isAvailable?: boolean;
  updateEnrollment: () => void;
};

const OnboardingEnrollmentItem = ({
  name,
  slug,
  isActive,
  isAvailable = true,
  updateEnrollment,
}: OnboardingEnrollmentItemProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const iconColorReactive = useMemo(() => {
    if (isActive) {
      return TEAMS_ADAPTIVE_TINT[slug]?.icon
        ? TEAMS_ADAPTIVE_TINT[slug].icon
        : LEAGUES_ADAPTIVE_TINT[slug].icon;
    }

    return TEAMS_ADJUSTED_TINT.includes(slug) ||
      LEAGUES_ADJUSTED_TINT.includes(slug)
      ? '#000'
      : undefined;
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const textColorReactive: StyleProp<TextStyle> = useMemo(() => {
    return {
      marginLeft: theme.spacing.md,
      color: isActive
        ? ((TEAMS_ADAPTIVE_TINT[slug]?.text &&
            TEAMS_ADAPTIVE_TINT[slug].text) ??
          LEAGUES_ADAPTIVE_TINT[slug].text)
        : theme.colors.text,
    };
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const itemReactiveStyle: StyleProp<ViewStyle> = useMemo(() => {
    return [
      styles.item,
      {
        borderColor: isActive ? theme.colors.transparent : '#757575',
        backgroundColor: isActive
          ? ((TEAMS_ADAPTIVE_TINT[slug]?.background &&
              TEAMS_ADAPTIVE_TINT[slug].background) ??
            LEAGUES_ADAPTIVE_TINT[slug].background)
          : theme.colors.background,
      },
    ];
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Button
      onPress={updateEnrollment}
      style={itemReactiveStyle}
      text={name}
      textStyle={textColorReactive}
      disabled={!isAvailable}
      disabledStyle={styles.disabled}
      pressedEnabled={false}
      LeftAccessory={(props) => (
        <Icon icon={slug} color={iconColorReactive} {...props} />
      )}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.xl,
    marginBottom: theme.spacing.lg * 1.5,
    marginRight: theme.spacing.xl,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
}));

export default React.memo(OnboardingEnrollmentItem, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
});
