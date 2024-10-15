import { Image, type ImageStyle } from 'expo-image';
import { type ComponentType } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  View,
  type ViewProps,
} from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { useFontSize } from '@/core/font-scaling';

import { type IconProps, iconTeamRegistry } from './icon.props';

const DEFAULT_SIZE = 26;
const DEFAULT_ICON_SIZE = 32;

const Icon = (props: IconProps) => {
  const { theme } = useStyles();
  const { currentFontSize } = useFontSize();

  const {
    icon,
    color,
    size = DEFAULT_SIZE * currentFontSize,
    style: $imageStyleOverride,
    overrideIcon,
    containerStyle: $containerStyleOverride,
    lucideIcon,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (WrapperProps?.onPress ? Pressable : View) as ComponentType<
    PressableProps | ViewProps
  >;

  const $imageStyle: StyleProp<ImageStyle> = [
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];

  return (
    <Wrapper
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      {lucideIcon ? (
        lucideIcon({
          size: DEFAULT_ICON_SIZE * currentFontSize,
          color: theme.colors.text,
          ...overrideIcon,
        })
      ) : icon ? (
        <Image
          contentFit='contain'
          source={iconTeamRegistry[icon]}
          style={$imageStyle}
        />
      ) : null}
    </Wrapper>
  );
};

export default Icon;
