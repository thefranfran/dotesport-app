import { type TextStyle } from "react-native";

import { isRTL } from "@/core/i18n";
import { typography } from "@/ui";

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } };
  },
  {},
) as Record<Weights, TextStyle>;

export const $presets = {
  default: typography.sizes.sm,
  bold: [typography.sizes.sm, $fontWeightStyles.bold],
  underline: [typography.sizes.sm, { textDecorationLine: "underline" }],
  required: [
    typography.sizes.sm,
    $fontWeightStyles.bold,
    { color: "red" },
  ] as TextStyle,
  heading: [],
  subheading: [],
  formLabel: [],
  formHelper: [],
} as const;

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {};

export { $fontWeightStyles, $rtlStyle };
export type Weights = keyof typeof typography.primary;
export type Presets = keyof typeof $presets;
export type Sizes = keyof typeof typography.sizes;
