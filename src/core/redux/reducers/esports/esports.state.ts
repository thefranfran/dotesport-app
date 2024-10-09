import { type Team } from '@/types';

interface League {}

type EsportsStateType = {
  teams: Team[];
  leagues: League[];
  initialization: boolean;
};

const initialState: EsportsStateType = {
  teams: [],
  leagues: [],
  initialization: true,
};

export { EsportsStateType, initialState, League };
