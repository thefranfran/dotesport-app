import { useScrollToTop } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  ScrollView,
  View,
  type ViewStyle,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

import { IS_IOS, useSafeAreaInsetsStyle } from '@/ui';

import {
  type AutoScreenProps,
  type ScreenProps,
  type ScrollScreenProps,
} from './screen.props';

type ScreenPreset = 'fixed' | 'scroll' | 'auto';

/**
 * @param {ScreenPreset?} preset - The preset to check.
 * @returns {boolean} - Whether the preset is non-scrolling.
 */
const isNonScrolling = (preset?: ScreenPreset) => {
  return !preset || preset === 'fixed';
};

/**
 * Custom hook that handles the automatic enabling/disabling of scroll ability based on the content size and screen size.
 * @param {UseAutoPresetProps} props - The props for the `useAutoPreset` hook.
 * @returns {{boolean, Function, Function}} - The scroll state, and the `onContentSizeChange` and `onLayout` functions.
 */
const useAutoPreset = (
  props: AutoScreenProps,
): {
  scrollEnabled: boolean;
  onContentSizeChange: (w: number, h: number) => void;
  onLayout: (e: LayoutChangeEvent) => void;
} => {
  const { preset, scrollEnabledToggleThreshold } = props;
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {};

  const scrollViewHeight = useRef<null | number>(null);
  const scrollViewContentHeight = useRef<null | number>(null);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  function updateScrollState() {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    )
      return;

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current - point
        );
      } else {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current * percent
        );
      }
    })();

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false);

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true);
  }
  /**
   * @param {number} w - The width of the content.
   * @param {number} h - The height of the content.
   */
  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h;
    updateScrollState();
  }

  /**
   * @param {LayoutChangeEvent} e = The layout change event.
   */
  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout;
    // update scroll-view  height
    scrollViewHeight.current = height;
    updateScrollState();
  }

  // update scroll state on every render
  if (preset === 'auto') updateScrollState();

  return {
    scrollEnabled: preset === 'auto' ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
};

/**
 * @param {ScreenProps} props - The props for the `ScreenWithoutScrolling` component.
 * @returns {JSX.Element} - The rendered `ScreenWithoutScrolling` component.
 */
const ScreenWithoutScrolling = (props: ScreenProps) => {
  const { style, contentContainerStyle, children } = props;
  return (
    <View style={[$outerStyle, style]}>
      <View style={[$innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  );
};

/**
 * @param {ScreenProps} props - The props for the `ScreenWithScrolling` component.
 * @returns {JSX.Element} - The rendered `ScreenWithScrolling` component.
 */
const ScreenWithScrolling = (props: ScreenProps) => {
  const {
    children,
    keyboardShouldPersistTaps = 'handled',
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(
    props as AutoScreenProps,
  );

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <ScrollView
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e);
        ScrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        ScrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[$outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[
        $innerStyle,
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
};

/**
 * Represents a screen component that provides a consistent layout and behavior for different screen presets.
 * The `Screen` component can be used with different presets such as "fixed", "scroll", or "auto".
 * It handles safe area insets, status bar settings, keyboard avoiding behavior, and scrollability based on the preset.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Screen/}
 * @param {ScreenProps} props - The props for the `Screen` component.
 * @returns {JSX.Element} The rendered `Screen` component.
 */
export const Screen = (props: ScreenProps) => {
  const { theme } = useStyles();

  const {
    backgroundColor = theme.colors.background,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps,
    statusBarStyle = 'dark',
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View style={[$containerStyle, { backgroundColor }, $containerInsets]}>
      <StatusBar style={statusBarStyle} {...StatusBarProps} />

      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}
      >
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const $containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};

const $outerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const $innerStyle: ViewStyle = {
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};
