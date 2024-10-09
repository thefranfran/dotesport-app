import { clear } from '../storage';
import { storePersistor } from './store';

export const resetStore = () => {
  storePersistor.purge();
  storePersistor.persist();
  clear();
};
