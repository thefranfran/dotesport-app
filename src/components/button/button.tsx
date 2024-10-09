/* eslint-disable max-lines-per-function */
import React, { useMemo } from 'react';
import {
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useStyles } from 'react-native-unistyles';

import Text from '@/components/text';
import { $presets, type Presets } from '@/components/text/text.styles';

import { type ButtonProps } from './button.props';
import {
  $baseTextStyle,
  $baseViewStyle,
  $leftAccessoryStyle,
  $rightAccessoryStyle,
  $transparentViewStyle,
} from './button.styles';

const Button = (props: ButtonProps) => {
  const { theme } = useStyles();

  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    pressedEnabled = true,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    presetText,
    ...rest
  } = props;

  const preset = props.preset || 'default';

  const $viewPresets = useMemo(() => {
    return {
      default: [
        $baseViewStyle,
        {
          borderWidth: 1,
          borderColor: theme.colors.palette.neutral400,
          backgroundColor: theme.colors.palette.neutral100,
        },
      ] as StyleProp<ViewStyle>,

      transparent: [
        $transparentViewStyle,
        {
          backgroundColor: theme.colors.transparent,
        },
      ],

      filled: [
        $baseViewStyle,
        { backgroundColor: theme.colors.palette.neutral300 },
      ] as StyleProp<ViewStyle>,

      reversed: [
        $baseViewStyle,
        { backgroundColor: theme.colors.palette.neutral800 },
      ] as StyleProp<ViewStyle>,
    };
  }, [theme]);

  const $textPresets: Record<
    Presets | string,
    StyleProp<TextStyle>
  > = useMemo(() => {
    return {
      default: $baseTextStyle,
      transparent: $baseTextStyle,
      filled: $baseTextStyle,
      reversed: [$baseTextStyle, { color: theme.colors.palette.neutral100 }],
    };
  }, [theme]);

  const $pressedViewPresets: Record<
    Presets | string,
    StyleProp<ViewStyle>
  > = useMemo(() => {
    return {
      default: { backgroundColor: theme.colors.palette.neutral200 },
      transparent: { backgroundColor: theme.colors.transparent },
      filled: { backgroundColor: theme.colors.palette.neutral400 },
      reversed: { backgroundColor: theme.colors.palette.neutral700 },
    };
  }, [theme]);

  const $pressedTextPresets: Record<
    Presets | string,
    StyleProp<TextStyle>
  > = useMemo(() => {
    return {
      default: { opacity: 0.9 },
      filled: { opacity: 0.9 },
      transparent: { opacity: 0.9 },
      reversed: { opacity: 0.9 },
    };
  }, []);

  function $viewStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed &&
        pressedEnabled && [
          $pressedViewPresets[preset],
          $pressedViewStyleOverride,
        ],
      !!disabled && $disabledViewStyleOverride,
    ];
  }

  function $textStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      presetText ? $presets[presetText] : $textPresets[preset],
      $textStyleOverride,
      !!pressed &&
        pressedEnabled && [
          $pressedTextPresets[preset],
          $pressedTextStyleOverride,
        ],
      !!disabled && $disabledTextStyleOverride,
    ];
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole='button'
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
    >
      {(state) => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory
              style={$leftAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}

          <Text
            tx={tx}
            text={text}
            txOptions={txOptions}
            style={$textStyle(state)}
          >
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  );
};

export default Button;
