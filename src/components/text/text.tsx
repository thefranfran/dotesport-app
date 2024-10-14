/* eslint-disable max-lines-per-function */
import React from 'react';
import { type StyleProp, Text as RNText, type TextStyle } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { useFontSize } from '@/core/font-scaling';
import { translate } from '@/core/i18n';

import { type TextProps } from './text.props';
import { $fontWeightStyles, $rtlStyle, type Presets } from './text.styles';

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
const Text = (props: TextProps) => {
  const { fontSizes } = useFontSize();
  const { theme } = useStyles();

  const {
    weight,
    size,
    tx,
    txOptions,
    color,
    required,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const $baseStyle: StyleProp<TextStyle> = [
    fontSizes.sm,
    $fontWeightStyles.normal,
  ];

  const $presets = {
    default: $baseStyle,

    bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

    underline: [
      $baseStyle,
      { textDecorationLine: 'underline' },
    ] as StyleProp<TextStyle>,

    required: [
      $baseStyle,
      $fontWeightStyles.bold,
      {
        color: 'red',
        ...fontSizes.lg,
      },
    ] as StyleProp<TextStyle>,

    heading: [
      $baseStyle,
      fontSizes.xxl,
      $fontWeightStyles.bold,
    ] as StyleProp<TextStyle>,

    subheading: [
      $baseStyle,
      fontSizes.lg,
      $fontWeightStyles.medium,
    ] as StyleProp<TextStyle>,

    formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

    formHelper: [
      $baseStyle,
      fontSizes.sm,
      $fontWeightStyles.normal,
    ] as StyleProp<TextStyle>,
  };

  const preset: Presets = props.preset ?? 'default';
  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,
    $presets[preset],
    { color: color ?? theme.colors.text },
    weight && $fontWeightStyles[weight],
    size && fontSizes[size],
    $styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles} maxFontSizeMultiplier={1.3}>
      {content}
      {!!required && <RNText style={$presets['required']}>*</RNText>}
    </RNText>
  );
};

export default Text;
