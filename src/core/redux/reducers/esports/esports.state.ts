import { type Leagues, type Team } from "@/types";

type EsportsStateType = {
  teams: Team[];
  leagues: Leagues[];
  initialization: boolean;
};

const initialState: EsportsStateType = {
  teams: [],
  leagues: [],
  initialization: true,
};

export { EsportsStateType, initialState };
