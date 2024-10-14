type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Colors = {
    text: Color;
    background: Color;
    transparent: Color;
    palette: Palette;
};

export type Palette = {
    neutral: Color;
    neutral100: Color;
    neutral200: Color;
    neutral300: Color;
    neutral400: Color;
    neutral500: Color;
    neutral600: Color;
    neutral700: Color;
    neutral800: Color;
};
