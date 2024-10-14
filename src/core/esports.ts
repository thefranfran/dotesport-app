import { leaguesColors, teamsColors } from "@/ui";

const DEFAULT_COLORS = {
    background: "#000",
    icon: "#fff",
    text: "#fff",
};

const LEAGUES_ADAPTIVE_TINT: Record<
    string,
    Record<"background" | "icon" | "text", string>
> = {
    lec: {
        background: leaguesColors["lec"],
        icon: "#fff",
        text: "#fff",
    },
    lcs: {
        background: leaguesColors["lcs"],
        icon: "#fff",
        text: "#fff",
    },
    lck: DEFAULT_COLORS,
    lpl: DEFAULT_COLORS,
};

const TEAMS_ADAPTIVE_TINT: Record<
    string,
    Record<"background" | "icon" | "text", string>
> = {
    "g2-esports": DEFAULT_COLORS,
    "fnatic": {
        background: teamsColors["fnatic"],
        icon: "#fff",
        text: "#fff",
    },
    "karmine-corp": DEFAULT_COLORS,
    "rogue": {
        background: teamsColors["rogue"],
        icon: "white",
        text: "white",
    },
    "sk-gaming": DEFAULT_COLORS,
    "vitality": {
        background: teamsColors["vitality"],
        icon: "#000",
        text: "#000",
    },
    "mad-lions-koi": {
        background: teamsColors["mad-lions-koi"],
        icon: "white",
        text: "white",
    },
    "team-bds": {
        background: teamsColors["team-bds"],
        icon: "#fff",
        text: "#fff",
    },
    "team-heretics": {
        background: "#000",
        icon: "",
        text: "#fff",
    },
    "giantx": DEFAULT_COLORS,
};

const TEAMS_ADJUSTED_TINT = [
    "karmine-corp",
    "g2-esports",
    "sk-gaming",
    "giantx",
];
const LEAGUES_ADJUSTED_TINT = ["lck"];

export {
    LEAGUES_ADAPTIVE_TINT,
    LEAGUES_ADJUSTED_TINT,
    TEAMS_ADAPTIVE_TINT,
    TEAMS_ADJUSTED_TINT,
};
