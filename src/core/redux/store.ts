import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import {
  AUTH,
  authenticationPersistReducer,
} from './reducers/authentication/authentication.index';
import { ESPORTS } from './reducers/esports/esports.index';
import esportsReducer from './reducers/esports/esports.reducer';

export const store = configureStore({
  reducer: {
    [AUTH]: authenticationPersistReducer,
    [ESPORTS]: esportsReducer,
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
  //@ts-ignore
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const storePersistor = persistStore(store);
