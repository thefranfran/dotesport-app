interface User {}

type AuthenticationStateType = {
  token: string;
  user?: User;
};

const initialState: AuthenticationStateType = {
  token: '',
  user: undefined,
};

export { AuthenticationStateType, initialState, User };
