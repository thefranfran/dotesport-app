import React from 'react';
import { type StyleProp, Text as RNText, type TextStyle } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { translate } from '@/core/i18n';
import { typography } from '@/ui';

import { type TextProps } from './text.props';
import {
  $fontWeightStyles,
  $presets,
  $rtlStyle,
  type Presets,
} from './text.styles';

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
const Text = (props: TextProps) => {
  const { theme } = useStyles();

  const {
    weight,
    size,
    tx,
    txOptions,
    color,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const preset: Presets = props.preset ?? 'default';
  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,
    $presets[preset],
    { color: color ?? theme.colors.text },
    weight && $fontWeightStyles[weight],
    size && typography.sizes[size],
    $styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
};

export default Text;
