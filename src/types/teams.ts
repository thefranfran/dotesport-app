import { type EsportsIconTypes } from "@/components/esport-icon";

export enum Role {
  JUNGLE = "JUNGLE",
  MID = "MID",
  ADC = "ADC",
  SUPPORT = "SUPPORT",
  TOP = "TOP",
}

export enum League {
  LEC = "LEC",
  LCS = "LCS",
  LCK = "LCK",
  LPL = "LPL",
  LFL = "LFL",
}

export type Players = {
  id: number;
  team_id: number;
  role: Role;
  league: League;
  user: {
    avatar: string;
    summonerName: string;
    firstName: string;
    lastName: string;
    nationality: string;
  };
  updated_at: string;
};

export type Leagues = {
  id: number;
  name: string;
  is_available: boolean;
};

export type Team = {
  id: number;
  name: string;
  slug: EsportsIconTypes;
  players: Players[];
};
