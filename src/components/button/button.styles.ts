import { type StyleProp, type TextStyle, type ViewStyle } from "react-native";

import { type Presets } from "@/components/text/text.styles";
import { radius, spacing, typography } from "@/ui";

const BUTTON_HEIGHT = 48;

const $baseViewStyle: StyleProp<ViewStyle> = {
    minHeight: BUTTON_HEIGHT,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
};

const $transparentViewStyle: StyleProp<ViewStyle> = {
    minHeight: BUTTON_HEIGHT,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
};

const $baseTextStyle: StyleProp<TextStyle> = {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: typography.primary.medium,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
};

const $rightAccessoryStyle: ViewStyle = {
    marginStart: spacing.md,
    zIndex: 1,
};
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.md, zIndex: 1 };

const $pressedTextPresets: Record<Presets | string, StyleProp<TextStyle>> = {
    default: { opacity: 0.9 },
    filled: { opacity: 0.9 },
    reversed: { opacity: 0.9 },
};

export {
    $baseTextStyle,
    $baseViewStyle,
    $leftAccessoryStyle,
    $pressedTextPresets,
    $rightAccessoryStyle,
    $transparentViewStyle,
};
