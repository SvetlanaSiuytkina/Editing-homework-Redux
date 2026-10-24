import { createStore, combineReducers } from 'redux';
import { servicesReducer, formReducer } from './reducers';
import type { RootState } from './types';

const rootReducer = combineReducers({
  services: servicesReducer,
  form: formReducer,
});

export const store = createStore(rootReducer);

export type { RootState };