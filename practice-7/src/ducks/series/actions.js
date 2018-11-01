import { createActions } from 'redux-actions';

const {
  series: {
    getRequest: getSeriesRequest,
    getSuccess: getSeriesSuccess,
    getFailure: getSeriesFailure,
  },
} = createActions({
  SERIES: {
    GET_REQUEST: null,
    GET_SUCCESS: null,
    GET_FAILURE: null,
  },
});

export { getSeriesRequest, getSeriesSuccess, getSeriesFailure };
