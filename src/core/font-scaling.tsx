import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
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

interface initialStateType {
  currentFontSize: number;
}

const reducer = (
  state: initialStateType,
  action: { type: string; payload: number },
) => {
  switch (action.type) {
    case 'CHANGE_FONT_SIZE':
      return {
        ...state,
        currentFontSize: action.payload,
      };
    default:
      return state;
  }
};

const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { currentFontSize: 1 });

  useEffect(() => {
    (async () => {
      const savedMultiplier = await getItem(fontSizeKey);
      if (savedMultiplier) {
        dispatch({
          type: 'CHANGE_FONT_SIZE',
          payload: Number(savedMultiplier),
        });
      } else {
        dispatch({
          type: 'CHANGE_FONT_SIZE',
          payload:
            PixelRatio.getFontScale() > MAX_FONT_MULTIPLIER
              ? MAX_FONT_MULTIPLIER
              : PixelRatio.getFontScale(),
        });
      }
    })();
  }, []);

  const fontSizes = useMemo(() => {
    return Object.keys(typography.sizes)?.reduce((acc, key) => {
      acc[key as keyof FontSizes] = {
        fontSize: Math.round(
          PixelRatio.roundToNearestPixel(
            typography.sizes[key as keyof FontSizes].fontSize *
              state.currentFontSize,
          ),
        ),
        lineHeight: Math.round(
          PixelRatio.roundToNearestPixel(
            typography.sizes[key as keyof FontSizes].lineHeight *
              state.currentFontSize,
          ),
        ),
      };
      return acc;
    }, {} as FontSizes);
  }, [state.currentFontSize]);

  const changeFontSize = useCallback((multiplier: number) => {
    if (multiplier > MAX_FONT_MULTIPLIER) {
      return;
    }

    dispatch({
      type: 'CHANGE_FONT_SIZE',
      payload: multiplier,
    });
    setItem(fontSizeKey, multiplier?.toString());
  }, []);

  const store = useMemo(
    () => ({
      fontSizes,
      currentFontSize: state.currentFontSize,
      changeFontSize,
    }),
    [state.currentFontSize, fontSizes, changeFontSize],
  );

  return (
    <FontSizeContext.Provider value={store}>
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
