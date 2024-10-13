import { type LayoutRectangle } from "react-native";

export interface FontScalingProps {
    /**
     * Font scaling visibility
     * @type boolean
     */
    visible: boolean;
    /**
     * Position of the font scaling button
     * @type LayoutRectangle
     */
    position: LayoutRectangle | undefined;
    /**
     * Toggle font scaling visibility
     * @returns void
     */
    toggleFontScaling: () => void;
}
