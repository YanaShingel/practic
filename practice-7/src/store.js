import { createStore, compose, applyMiddleware } from 'redux';
import { tvmazeFetchMiddleware, execTime } from './middlewares';
import rootReducer from './ducks';

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(tvmazeFetchMiddleware),
      applyMiddleware(execTime),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  return store;
};

export default createAppStore;

// state0 ->  reducers -> state1
//              ↑
//         middleware 2
//              ↑
//         middleware 1
//              ↑
// action ->  store
