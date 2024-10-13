import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PixelRatio } from 'react-native';

import { typography } from '@/ui';

import { getItem, setItem } from './storage';

type FontSizes = typeof typography.sizes;
export const MAX_FONT_MULTIPLIER: number = 1.3;

export type FontSizeContextType = {
  fontSizes: FontSizes;
  currentFontSize: number;
  changeFontSize: (multiplier: number) => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined,
);

const fontSizeKey = 'userFontSizeMultiplier';

const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFontSize, setCurrentFontSize] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const savedMultiplier = await getItem(fontSizeKey);
      if (savedMultiplier) {
        setCurrentFontSize(Number(savedMultiplier));
      } else {
        setCurrentFontSize(
          PixelRatio.getFontScale() > MAX_FONT_MULTIPLIER
            ? MAX_FONT_MULTIPLIER
            : PixelRatio.getFontScale(),
        );
      }
    })();
  }, []);

  const fontSizes = Object.keys(typography.sizes)?.reduce((acc, key) => {
    acc[key as keyof FontSizes] = {
      fontSize: Math.round(
        PixelRatio.roundToNearestPixel(
          typography.sizes[key as keyof FontSizes].fontSize * currentFontSize,
        ),
      ),
      lineHeight: Math.round(
        PixelRatio.roundToNearestPixel(
          typography.sizes[key as keyof FontSizes].lineHeight * currentFontSize,
        ),
      ),
    };
    return acc;
  }, {} as FontSizes);

  const changeFontSize = async (multiplier: number) => {
    if (multiplier > MAX_FONT_MULTIPLIER) {
      return;
    }

    setCurrentFontSize(multiplier);
    await setItem(fontSizeKey, multiplier?.toString());
  };

  return (
    <FontSizeContext.Provider
      value={{
        fontSizes,
        changeFontSize,
        currentFontSize,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);

  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }

  return context;
};

export default FontSizeProvider;
