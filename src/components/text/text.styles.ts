import { type StyleProp, type TextStyle } from 'react-native';

import { isRTL } from '@/core/i18n';
import { typography } from '@/ui';

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } };
  },
  {},
) as Record<Weights, TextStyle>;

const $baseStyle: StyleProp<TextStyle> = [
  typography.sizes.sm,
  $fontWeightStyles.normal,
];

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [
    $baseStyle,
    typography.sizes.xxl,
    $fontWeightStyles.bold,
  ] as StyleProp<TextStyle>,

  subheading: [
    $baseStyle,
    typography.sizes.lg,
    $fontWeightStyles.medium,
  ] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formHelper: [
    $baseStyle,
    typography.sizes.sm,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,
};

const $rtlStyle: TextStyle = isRTL ? { writingDirection: 'rtl' } : {};

export { $baseStyle, $fontWeightStyles, $presets, $rtlStyle };
export type Weights = keyof typeof typography.primary;
export type Presets = keyof typeof $presets;
export type Sizes = keyof typeof typography.sizes;
