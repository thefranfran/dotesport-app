import * as React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export interface FlexProps extends React.PropsWithChildren {
  align?: ViewStyle['alignItems'];
  direction?: ViewStyle['flexDirection'];
  flex?: ViewStyle['flex'];
  gap?: ViewStyle['gap'];
  justify?: ViewStyle['justifyContent'];
  wrap?: ViewStyle['flexWrap'];
  backgroundColor?: ViewStyle['backgroundColor'];
  style?: ViewStyle;
}

export function Flex({
  align: alignItems,
  children,
  direction: flexDirection,
  flex,
  gap,
  justify: justifyContent,
  wrap: flexWrap,
  backgroundColor,
  style,
}: FlexProps) {
  const { theme } = useStyles();

  return (
    <View
      style={{
        alignItems,
        display: 'flex',
        flex,
        flexDirection,
        flexWrap,
        gap,
        justifyContent,
        backgroundColor: backgroundColor ?? theme.colors.background,
        ...style,
      }}
    >
      {children}
    </View>
  );
}

export function Row(props: Omit<FlexProps, 'direction'>) {
  return <Flex {...props} direction='row' />;
}

export function Stack(props: Omit<FlexProps, 'direction'>) {
  return <Flex {...props} direction='column' />;
}

export interface FlexItemProps {
  align?: ViewStyle['alignSelf'];
  basis?: ViewStyle['flexBasis'];
  children: React.ReactNode;
  flex?: ViewStyle['flex'];
  grow?: ViewStyle['flexGrow'];
  shrink?: ViewStyle['flexShrink'];
  backgroundColor?: ViewStyle['backgroundColor'];
}

function FlexItem({
  align: alignSelf,
  basis: flexBasis,
  children,
  flex,
  grow: flexGrow,
  shrink: flexShrink,
  backgroundColor,
}: FlexItemProps) {
  const { theme } = useStyles();

  return (
    <View
      style={{
        alignSelf,
        flexBasis,
        flex,
        flexGrow,
        flexShrink,
        backgroundColor: backgroundColor ?? theme.colors.background,
      }}
    >
      {children}
    </View>
  );
}

Flex.Item = FlexItem;
Row.Item = FlexItem;
Stack.Item = FlexItem;
