// import { ADD_ARTICLE, ADD_QUIZ } from '../constants/action-types';

export const addArticle = article => (
  {
    type: 'ADD_ARTICLE', payload: article
  }
)

export const addQuiz = quiz => (
  {
    type: 'ADD_QUIZ', payload: quiz
  }
)

export const updateQuiz = quiz => (
  {
    type: 'UPDATE_QUIZ', payload: quiz
  }
)