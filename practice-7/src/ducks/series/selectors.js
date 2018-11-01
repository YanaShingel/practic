import { LOADING_STATE } from './reducer';
import { createSelector } from 'reselect';

export const getLoadingState = state => state.series.loadingState;
export const getError = state => state.series.error;
export const getSeries = createSelector(
  state => state.series.entities,
  entities =>
    entities.map(ep => ({
      id: ep.id,
      name: ep.name,
      image: ep.image.original,
      summary: ep.summary,
    })),
);

export const isLoaded = state =>
  getLoadingState(state) !== LOADING_STATE.success &&
  getLoadingState(state) !== LOADING_STATE.loading;

export const isError = state =>
  getLoadingState(state) === LOADING_STATE.failure;

export const isLoading = state =>
  getLoadingState(state) === LOADING_STATE.loading;
