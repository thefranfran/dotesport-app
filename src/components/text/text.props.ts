import type i18n from 'i18n-js';
import type React from 'react';
import {
  type StyleProp,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';

import { type TxKeyPath } from '@/core/i18n';

import { type Presets, type Sizes, type Weights } from './text.styles';
import { Color } from '@/ui';

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Color of the text.
   */
  color?: Color;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
}
