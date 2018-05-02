// import { ADD_ARTICLE, ADD_QUIZ } from '../constants/action-types';

export const addArticle = article => (
  {
    type: 'ADD_ARTICLE', payload: article
  }
)

export const initQuizApp = quiz => (
  {
    type: 'INIT_QUIZ_APP', payload: quiz
  }
)

export const updateQuiz = quiz => (
  {
    type: 'UPDATE_QUIZ', payload: quiz
  }
)