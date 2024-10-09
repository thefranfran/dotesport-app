import { Image, type ImageStyle } from 'expo-image';
import { type ComponentType } from 'react';
import {
  type StyleProp,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewProps,
} from 'react-native';

import { esportsTeamRegistry, type IconProps } from './esport-icon.props';

const EsportIcon = (props: IconProps) => {
  const {
    icon,
    color,
    size,
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
        source={esportsTeamRegistry[icon]}
      />
    </Wrapper>
  );
};

export default EsportIcon;
