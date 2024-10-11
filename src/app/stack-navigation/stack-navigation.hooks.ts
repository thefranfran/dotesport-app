import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { finallyInitialization } from "@/core/redux/reducers/esports/esports.reducer";
import { prefetchEsports } from "@/core/redux/reducers/esports/esports.thunk";
import { type AppDispatch, type RootState } from "@/core/redux/store";
import { getItem } from "@/core/storage";

export const useInitializationNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialization } = useSelector((state: RootState) => state.esports);

  const [hasToCompleteOnboarding, setHasToCompleteOnboarding] = useState<
    boolean
  >(true);

  useLayoutEffect(() => {
    dispatch(prefetchEsports()).finally(() => {
      setHasToCompleteOnboarding(
        getItem<boolean>("hasToCompleteOnboarding") !== undefined,
      );
      dispatch(finallyInitialization());
    });
  }, [dispatch]);

  return { hasToCompleteOnboarding, initialization };
};
