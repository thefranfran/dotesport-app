import { type ViewProps } from "react-native";

import { type Color } from "@/types";

type SeparatorPresets = "default";

export interface SeparatorProps extends ViewProps {
    /**
     * The preset style of the separator.
     * @default 'default'
     */
    preset?: SeparatorPresets;

    /**
     * The color of the separator.
     * @default 'black'
     */
    color?: Color;
}
