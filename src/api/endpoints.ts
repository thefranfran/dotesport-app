const ENDPOINTS = {
  ESPORTS: {
    GET_LEAGUES: () => '/esports/leagues',
    GET_TEAMS: () => '/esports/teams',
  },
} as const;

export default ENDPOINTS;
