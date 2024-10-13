import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { removeItem, setItem } from "@/core/storage";

import { AUTH } from "./authentication.constants";
import {
  type AuthenticationStateType,
  initialState,
} from "./authentication.state";

const authenticationSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthenticationStateType>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      setItem("token", action.payload.token);
    },
    signOut: (state) => {
      state.token = "";
      state.user = undefined;
      removeItem("token");
    },
    updateOnboarding: (state, action: PayloadAction<boolean>) => {
      setItem("hasToCompleteOnboarding", action.payload);
      state.hasToCompleteOnboarding = action.payload;
    },
  },
});

export const { updateOnboarding } = authenticationSlice.actions;
export default authenticationSlice.reducer;
