import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Root: NavigatorScreenParams<HomeTabParamList>;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type OnboardingStackScreenProps<
  T extends keyof OnboardingStackParamList,
> = NativeStackScreenProps<OnboardingStackParamList, T>;

export type OnboardingStackParamList = {
  Onboarding: undefined;
  OnboardingSettings: undefined;
};

export type HomeTabParamList = {
  Feed: undefined;
  Matches: undefined;
  Community: undefined;
  Shop: undefined;
  Profil: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
