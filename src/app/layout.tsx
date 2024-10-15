import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { type ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner-native';

import FontSizeProvider from '@/core/font-scaling';
import { store, storePersistor } from '@/core/redux/store';
import { customFontsToLoad } from '@/ui';

import { StackNavigation } from './stack-navigation';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts(customFontsToLoad);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={container} onLayout={onLayoutRootView}>
        <KeyboardProvider>
          <StoreProvider store={store}>
            <PersistGate loading={null} persistor={storePersistor}>
              <QueryClientProvider client={queryClient}>
                <FontSizeProvider>
                  <BottomSheetModalProvider>
                    <NavigationContainer ref={navigationRef}>
                      {children}
                    </NavigationContainer>
                  </BottomSheetModalProvider>
                </FontSizeProvider>
              </QueryClientProvider>
            </PersistGate>
          </StoreProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export const RootLayout = () => {
  return (
    <Providers>
      <StackNavigation />
    </Providers>
  );
};

const container = {
  flex: 1,
} satisfies ViewStyle;
