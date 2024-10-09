import { useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { prefetchEsports } from '@/core/redux/reducers/esports/esports.thunk';
import { type AppDispatch, type RootState } from '@/core/redux/store';
import { getItem } from '@/core/storage';

import { type RootStackParamList } from '../bottom-navigation';

export const useInitializationNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialization } = useSelector((state: RootState) => state.esports);

  const [hasToCompleteOnboarding, setHasToCompleteOnboarding] =
    useState<boolean>(false);

  const initialRouteName: keyof RootStackParamList = useMemo(() => {
    return !hasToCompleteOnboarding ? 'Onboarding' : 'Root';
  }, [hasToCompleteOnboarding]);

  useLayoutEffect(() => {
    dispatch(prefetchEsports()).finally(() => {
      setHasToCompleteOnboarding(getItem<boolean>('hasToCompleteOnboarding'));
    });
  }, [dispatch]);

  return { initialRouteName, initialization };
};
