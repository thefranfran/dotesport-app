import { Image, type ImageStyle } from 'expo-image';
import { type ComponentType } from 'react';
import {
  type StyleProp,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewProps,
} from 'react-native';

import { useFontSize } from '@/core/font-scaling';

import { type IconProps, iconTeamRegistry } from './icon.props';

const DEFAULT_SIZE = 26;

const Icon = (props: IconProps) => {
  const { currentFontSize } = useFontSize();

  const {
    icon,
    color,
    size = DEFAULT_SIZE * currentFontSize,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (
    WrapperProps?.onPress ? TouchableOpacity : View
  ) as ComponentType<TouchableOpacityProps | ViewProps>;

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
      <Image
        style={$imageStyle}
        contentFit='contain'
        source={iconTeamRegistry[icon]}
      />
    </Wrapper>
  );
};

export default Icon;
