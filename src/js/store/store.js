import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/reducers';

const store = createStore(
  rootReducer,
  { articles: [], quizzes: [] },
  applyMiddleware(logger)
);

export default store;