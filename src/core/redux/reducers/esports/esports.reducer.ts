import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { ESPORTS } from "./esports.constants";
import { type EsportsStateType, initialState } from "./esports.state";
import { prefetchEsports } from "./esports.thunk";

const esportsSlice = createSlice({
  name: ESPORTS,
  initialState,
  reducers: {
    finallyInitialization: (state) => {
      state.initialization = false;
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
      state.teams = action.payload.teams as EsportsStateType["teams"];
      state.leagues = action.payload.leagues as EsportsStateType["leagues"];
    });
  },
});

export const { finallyInitialization } = esportsSlice.actions;
export default esportsSlice.reducer;
