import { type Colors } from "@/types";

import { darkPalette, lightPalette } from "./palette";

export const teamsColors = {
  "g2-esports": "#000",
  "fnatic": "#FF5900",
  "team-bds": "#FF0074",
  "mad-lions-koi": "#C5AA76",
  "vitality": "#FFFF00",
  "rogue": "#01B0FE",
};

export const leaguesColors = {
  "lec": "#00E5BF",
  "lck": "#FF0074",
  "lpl": "#C5AA76",
  "lcs": "#6360F0",
};

export const lightColors: Colors = {
  text: "#000000",
  background: "#ffffff",
  transparent: "rgba(0, 0, 0, 0)",
  palette: lightPalette,
  riot: {
    primary: "#EB0029",
    secondary: "#EB0029",
  },
} as const;

export const darkColors: Colors = {
  text: "#ffffff",
  background: "#000000",
  transparent: "rgba(0, 0, 0, 0)",
  palette: darkPalette,
  riot: {
    primary: "#EB0029",
    secondary: "#EB0029",
  },
} as const;
