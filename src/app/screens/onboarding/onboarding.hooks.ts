import { useEffect } from "react";
import { Gesture } from "react-native-gesture-handler";
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
  selectedLeagues: Leagues[];
}) => {
  const progress = useSharedValue<number>(300);
  const pressed = useSharedValue<boolean>(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedViewStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        { translateY: progress.value },
        {
          scale: withTiming(pressed.value ? 1.2 : 1),
        },
      ],
    };
  });

  useEffect(() => {
    if (enrolledTeam && selectedLeagues.length > 0) {
      progress.value = withTiming(0, { duration: 300 });
    }
  }, [enrolledTeam, selectedLeagues]);

  return { tap, animatedViewStyle };
};
