import type React from "react";
import { type ComponentType } from "react";
import {
    type PressableProps,
    type PressableStateCallbackType,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from "react-native";

import { type TextProps } from "@/components/text/text.props";
import { type Presets as TextPresets } from "@/components/text/text.styles";

const $viewPresets = {
    default: [] as StyleProp<ViewStyle>,
    filled: [] as StyleProp<ViewStyle>,
    transparent: [] as StyleProp<ViewStyle>,
    reversed: [] as StyleProp<ViewStyle>,
};

type Presets = keyof typeof $viewPresets;

export interface ButtonAccessoryProps {
    style: StyleProp<any>;
    pressableState: PressableStateCallbackType;
    disabled?: boolean;
}

export interface ButtonProps extends PressableProps {
    /**
     * Text which is looked up via i18n.
     */
    tx?: TextProps["tx"];
    /**
     * The text to display if not using `tx` or nested components.
     */
    text?: TextProps["text"];
    /**
     * Optional options to pass to i18n. Useful for interpolation
     * as well as explicitly setting locale or translation fallbacks.
     */
    txOptions?: TextProps["txOptions"];
    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * An optional style override for the "pressed" state.
     */
    pressedStyle?: StyleProp<ViewStyle>;
    /**
     * An optional style override for the "disabled" state.
     */
    pressedEnabled?: boolean;
    /**
     * An optional style override for the button text.
     */
    textStyle?: StyleProp<TextStyle>;
    /**
     * An optional style override for the button text when in the "pressed" state.
     */
    pressedTextStyle?: StyleProp<TextStyle>;
    /**
     * An optional style override for the button text when in the "disabled" state.
     */
    disabledTextStyle?: StyleProp<TextStyle>;
    /**
     * One of the different types of button presets.
     */
    preset?: Presets;
    /**
     * One of the different types of text presets.
     */
    presetText?: TextPresets;
    /**
     * An optional component to render on the right side of the text.
     * Example: `RightAccessory={(props) => <View {...props} />}`
     */
    RightAccessory?: ComponentType<ButtonAccessoryProps>;
    /**
     * An optional component to render on the left side of the text.
     * Example: `LeftAccessory={(props) => <View {...props} />}`
     */
    LeftAccessory?: ComponentType<ButtonAccessoryProps>;
    /**
     * Children components.
     */
    children?: React.ReactNode;
    /**
     * disabled prop, accessed directly for declarative styling reasons.
     * https://reactnative.dev/docs/pressable#disabled
     */
    disabled?: boolean;
    /**
     * An optional style override for the disabled state
     */
    disabledStyle?: StyleProp<ViewStyle>;
    /**
     * An optional onPress function.
     * @returns {void}
     */
    onPress?: () => void;
}
