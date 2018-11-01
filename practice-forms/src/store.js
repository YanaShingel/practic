import { compose, createStore } from 'redux';
import rootReducer from './reducers';

const createAppStore = () => {
  const enhancer = compose(
    window['__REDUX_DEVTOOLS_EXTENSION__'](),
  );
  const store = createStore(rootReducer, enhancer);

  return store;
};

export default createAppStore;
