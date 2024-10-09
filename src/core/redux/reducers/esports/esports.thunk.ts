import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiManager from '@/api';

const prefetchEsports = createAsyncThunk('esports/prefetch', async () => {
  try {
    const [leagues, teams] = await Promise.all([
      ApiManager.getLeagues(),
      ApiManager.getTeams(),
    ]);

    return {
      leagues: leagues.data,
      teams: teams.data,
    };
  } catch (error) {
    throw error;
  }
});

export { prefetchEsports };
