// import { ADD_ARTICLE, ADD_QUIZ } from '../constants/action-types';
import { combineReducers } from 'redux';
import quizReducer from './quiz-reducer';
import articleReducer from './article-reducer';

import update from 'immutability-helper';

const rootReducer = combineReducers({
  articles: articleReducer,
  quizApp: quizReducer
});

export default rootReducer;