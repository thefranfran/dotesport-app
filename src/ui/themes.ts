import { darkColors, lightColors } from '@/ui/colors';
import { margins, radius } from '@/ui/sizes';
import { typography } from '@/ui/typography';

const defaultTheme = {
  sizes: margins,
  spacing: margins,
  radius: radius,
};

export const lightTheme = {
  ...defaultTheme,
  colors: lightColors,
  components: {
    typography: typography,
  },
} as const;

export const darkTheme = {
  ...defaultTheme,
  colors: darkColors,
  components: {
    typography: typography,
  },
} as const;
