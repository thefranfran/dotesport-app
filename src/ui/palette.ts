import { type Palette } from "@/types";

export const lightPalette: Palette = {
    neutral: "#000000",
    neutral100: "#ffffff",
    neutral200: "#f8f8f8",
    neutral300: "#f0f0f0",
    neutral400: "#e1e1e1",
    neutral500: "#c7c7c7",
    neutral600: "#a5a5a5",
    neutral700: "#7a7a7a",
    neutral800: "#525252",
} as const;

export const darkPalette: Palette = {
    neutral: "#ffffff",
    neutral100: "#000000",
    neutral200: "#121212",
    neutral300: "#1e1e1e",
    neutral400: "#2f2f2f",
    neutral500: "#4b4b4b",
    neutral600: "#6d6d6d",
    neutral700: "#929292",
    neutral800: "#bababa",
} as const;
