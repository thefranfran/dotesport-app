import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ESPORTS } from './esports.constants';
import { type EsportsStateType, initialState } from './esports.state';
import { prefetchEsports } from './esports.thunk';

const esportsSlice = createSlice({
  name: ESPORTS,
  initialState,
  reducers: {
    updateTeams: (state, action: PayloadAction<EsportsStateType>) => {
      state.teams = action.payload.teams;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(prefetchEsports.pending, (state) => {
      state.initialization = true;
    });
    builder.addCase(prefetchEsports.rejected, (state) => {
      state.leagues = [];
      state.teams = [];
      state.initialization = false;
    });
    builder.addCase(prefetchEsports.fulfilled, (state, action) => {
      state.teams = action.payload.teams as EsportsStateType['teams'];
      state.leagues = action.payload.leagues as EsportsStateType['leagues'];
      state.initialization = false;
    });
  },
});

export const { updateTeams } = esportsSlice.actions;
export default esportsSlice.reducer;
