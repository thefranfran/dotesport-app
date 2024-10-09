import { persistReducer } from 'redux-persist';

import { reduxStorage } from '@/core/storage';

import { AUTH } from './authentication.constants';
import reducer from './authentication.reducer';
import { type AuthenticationStateType } from './authentication.state';

const persistConfig = {
  key: AUTH,
  storage: reduxStorage,
  whitelist: ['token'],
};

const authenticationPersistReducer = persistReducer<AuthenticationStateType>(
  persistConfig,
  reducer,
);

export { authenticationPersistReducer };
