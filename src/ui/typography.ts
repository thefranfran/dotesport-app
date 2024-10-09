import {
  Inter_300Light as interLight,
  Inter_400Regular as interRegular,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
} from '@expo-google-fonts/inter';
import { Platform, type TextStyle } from 'react-native';

export const customFontsToLoad = {
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
};

const fonts = {
  inter: {
    // Cross-platform Google font.
    light: 'interLight',
    normal: 'interRegular',
    medium: 'interMedium',
    semiBold: 'interSemiBold',
    bold: 'interBold',
  },
  helveticaNeue: {
    // iOS only font.
    thin: 'HelveticaNeue-Thin',
    light: 'HelveticaNeue-Light',
    normal: 'Helvetica Neue',
    medium: 'HelveticaNeue-Medium',
  },
  courier: {
    // iOS only font.
    normal: 'Courier',
  },
  sansSerif: {
    // Android only font.
    thin: 'sans-serif-thin',
    light: 'sans-serif-light',
    normal: 'sans-serif',
    medium: 'sans-serif-medium',
  },
  monospace: {
    // Android only font.
    normal: 'monospace',
  },
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.inter,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({
    ios: fonts.helveticaNeue,
    android: fonts.sansSerif,
  }),
  /**
   * The font size scales in a linear way, but you can adjust the sizes as needed.
   */
  sizes: {
    xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
    xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
    lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
    md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
    sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
    xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
    xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
  },
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
};
