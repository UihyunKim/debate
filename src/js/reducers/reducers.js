// import { ADD_ARTICLE, ADD_QUIZ } from '../constants/action-types';
import update from 'immutability-helper';

const initialState = {
  articles: [],
  quizzes: [],
}

const rootReducer = (
  state = initialState, 
  {type, payload}
  ) => {
    switch (type) {
      case 'ADD_ARTICLE':
        return { 
          ...state, 
          articles: [...state.articles, payload] 
        };
      case 'ADD_QUIZ':
        return { 
          ...state, 
          // quizzes: [...state.quizzes, payload]
          quizzes: update(state.quizzes, {$push: payload})
        };
      case 'UPDATE_QUIZ':
        const id = payload.id; // the question id
        
        if (payload.todo === 'success') {
          const newQuizzes = state.quizzes.map((quiz) => {
            if(quiz.id === id) {
              return update( quiz, { success: { $set: true } });
            }
            return quiz;
          })
          
          return { 
            ...state, 
            quizzes: newQuizzes
          };
        }
      default:
        return state;
    }
  }

export default rootReducer;