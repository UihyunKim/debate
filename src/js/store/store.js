import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/reducers';

const store = createStore(
  rootReducer,
  { articles: [] },
  applyMiddleware(logger)
);

export default store;