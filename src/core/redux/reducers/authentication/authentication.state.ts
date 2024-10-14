interface User {}

type AuthenticationStateType = {
  token: string;
  user?: User;
  hasToCompleteOnboarding: boolean;
};

const initialState: AuthenticationStateType = {
  token: "",
  user: undefined,
  hasToCompleteOnboarding: true,
};

export { AuthenticationStateType, initialState, User };
