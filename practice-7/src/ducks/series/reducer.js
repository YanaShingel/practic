import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  getSeriesRequest,
  getSeriesSuccess,
  getSeriesFailure,
} from './actions';

export const LOADING_STATE = {
  idle: 'IDLE',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

const entities = handleActions(
  {
    [getSeriesSuccess.toString()]: (_state, action) => action.payload
  },
  [],
);

const loadingState = handleActions(
  {
    [getSeriesRequest.toString()]: () => LOADING_STATE.loading,
    [getSeriesSuccess.toString()]: () => LOADING_STATE.success,
    [getSeriesFailure.toString()]: () => LOADING_STATE.failure,
  },
  LOADING_STATE.idle,
);

const error = handleActions(
  {
    [getSeriesFailure.toString()]: (_state, action) => action.payload,
  },
  null,
);

export default combineReducers({
  entities,
  loadingState,
  error,
});



// const initialState = {
//   series: [],
//   loadingState: LOADING_STATE.idle,
//   error: null,
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case getSeriesRequest.toString():
//       return { ...state, loadingState: LOADING_STATE.loading };

//     case getSeriesSuccess.toString():
//       return {
//         ...state,
//         series: action.payload,
//         loadingState: LOADING_STATE.success,
//       };

//     case getSeriesFailure.toString():
//       return {
//         ...state,
//         error: action.payload,
//         loadingState: LOADING_STATE.failure,
//       };

//     default:
//       return state;
//   }
// };
