import * as Haptics from "expo-haptics";
import { useCallback, useMemo } from "react";

type FeedbackType =
    | "light"
    | "medium"
    | "heavy"
    | "selection"
    | "success"
    | "warning"
    | "error";

export const useHaptic: Function = (
    feedbackType: FeedbackType = "selection",
) => {
    const createHapticHandler = useCallback(
        (type: Haptics.ImpactFeedbackStyle) => {
            return Haptics.impactAsync(type);
        },
        [],
    );
    const createNotificationFeedback = useCallback(
        (type: Haptics.NotificationFeedbackType) => {
            return Haptics.notificationAsync(type);
        },
        [],
    );

    const hapticHandlers = useMemo(
        () => ({
            light: createHapticHandler(Haptics.ImpactFeedbackStyle.Light),
            medium: createHapticHandler(Haptics.ImpactFeedbackStyle.Medium),
            heavy: createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy),
            selection: Haptics.selectionAsync,
            success: createNotificationFeedback(
                Haptics.NotificationFeedbackType.Success,
            ),
            warning: createNotificationFeedback(
                Haptics.NotificationFeedbackType.Warning,
            ),
            error: createNotificationFeedback(
                Haptics.NotificationFeedbackType.Error,
            ),
        }),
        [createHapticHandler, createNotificationFeedback],
    );

    return hapticHandlers[feedbackType];
};
