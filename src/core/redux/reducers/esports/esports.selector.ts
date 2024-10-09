import { createSelector } from 'reselect';

import { type RootState } from '@/core/redux/store';

const esportSelector = (state: RootState) => state.esports;

export const selectTeams = createSelector(
  [esportSelector],
  (esport) => esport.teams,
);
