import { ADD_ARTICLE, ADD_QUIZ } from '../constants/action-types';

const initialState = {
  articles: [],
  quizzes: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.payload] };
    case ADD_QUIZ:
      return { ...state, quizzes: [...state.quizzes, action.payload]};
    default:
      return state;
  }
}

export default rootReducer;