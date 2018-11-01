import {
  getSeriesRequest,
  getSeriesFailure,
  getSeriesSuccess,
} from './ducks/series/actions';

export const tvmazeFetchMiddleware = store => next => action => {
  if (action.type === getSeriesRequest.toString()) {
    fetch(`http://api.tvmaze.com/shows/${action.payload}/episodes`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(series => {
        console.log(series);
        store.dispatch(getSeriesSuccess(series, series.length));
      })
      .catch(error => {
        store.dispatch(getSeriesFailure(error));
      });
  }

  return next(action);
};

export function execTime(store) {
  return function(next) {
    return function(action) {
      console.log(action.type);
      console.time('redux exec');
      const result = next(action);
      console.timeEnd('redux exec');
      return result;
    };
  };
}
