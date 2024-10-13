import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateOnboarding } from "@/core/redux/reducers/authentication/authentication.reducer";
import { finallyInitialization } from "@/core/redux/reducers/esports/esports.reducer";
import { prefetchEsports } from "@/core/redux/reducers/esports/esports.thunk";
import { type AppDispatch, type RootState } from "@/core/redux/store";
import { getItem } from "@/core/storage";

export const useInitializationNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialization } = useSelector((state: RootState) => state.esports);
  const { hasToCompleteOnboarding } = useSelector((state: RootState) =>
    state.authentication
  );

  useLayoutEffect(() => {
    dispatch(prefetchEsports()).finally(() => {
      dispatch(
        updateOnboarding(getItem<boolean>("hasToCompleteOnboarding") ?? false),
      );
      dispatch(finallyInitialization());
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { hasToCompleteOnboarding, initialization };
};
