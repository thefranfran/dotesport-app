import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { type Leagues, type Team } from "@/types";

export const useSubmitAnimation = ({
  enrolledTeam,
  selectedLeagues,
}: {
  enrolledTeam: Team | undefined;
  selectedLeagues: Leagues | undefined;
}) => {
  const progress = useSharedValue<number>(300);

  const animatedViewStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        { translateY: progress.value },
      ],
    };
  });

  useEffect(() => {
    if (enrolledTeam && selectedLeagues) {
      progress.value = withTiming(0, { duration: 300 });
    } else {
      progress.value = withTiming(300, { duration: 300 });
    }
  }, [enrolledTeam, selectedLeagues]); // eslint-disable-line react-hooks/exhaustive-deps

  return { animatedViewStyle };
};
