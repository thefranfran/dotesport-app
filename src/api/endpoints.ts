const ENDPOINTS = {
  ESPORTS: {
    GET_LEAGUES: () => "/esports/leagues",
    GET_TEAMS: () => "/esports/teams",
  },
  FEED: (page: number, locale: string, search: string) =>
    `/articles/all?page=${page}&locale=${locale}&search=${search}`,
} as const;

export default ENDPOINTS;
