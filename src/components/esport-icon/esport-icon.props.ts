import { type ImageStyle } from "expo-image";
import {
  type StyleProp,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";

export type EsportsIconTypes = keyof typeof esportsTeamRegistry;

export interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: EsportsIconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"];
}

export const esportsTeamRegistry = {
  "g2-esports": require("@/ui/images/esports/teams/g2-esports.png"),
  "fnatic": require("@/ui/images/esports/teams/fnatic.png"),
  "karmine-corp": require("@/ui/images/esports/teams/karmine-corp.png"),
  "rogue": require("@/ui/images/esports/teams/rogue.png"),
  "sk-gaming": require("@/ui/images/esports/teams/sk-gaming.png"),
  "vitality": require("@/ui/images/esports/teams/vitality.png"),
  "mad-lions-koi": require("@/ui/images/esports/teams/mad-lions-koi.png"),
  "team-bds": require("@/ui/images/esports/teams/team-bds.png"),
  "team-heretics": require("@/ui/images/esports/teams/team-heretics.png"),
  "giantx": require("@/ui/images/esports/teams/giantx.png"),
};
