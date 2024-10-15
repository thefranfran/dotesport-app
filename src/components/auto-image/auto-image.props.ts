import { type ImageProps } from "expo-image";

export interface AutoImageProps extends ImageProps {
    /**
     * How wide should the image be?
     */
    maxWidth?: number;
    /**
     * How tall should the image be?
     */
    maxHeight?: number;
}
