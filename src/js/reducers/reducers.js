// import { ADD_ARTICLE, ADD_QUIZ } from '../constants/action-types';
import update from 'immutability-helper';

// const initialState = {
//   articles: [],
//   quizzes: [],
// }
const initialState = {
  articles: [],
  quizApp: {
    session: 0,     // a session per week
    score: 0,       // ex. 10 is goal for this session
    flow: '',       // quiz flow: start -> select -> check -> result -> start
    quizzes: [],    // quizzes by one session (ex, 15)
    curQuiz: {},        // current trying quiz
  }
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_ARTICLE':
      return {
        ...state,
        articles: [...state.articles, payload]
      };
    case 'INIT_QUIZ_APP':
      return {
        ...state,
        quizApp: update(state.quizApp, { $set: payload })
      };
    case 'UPDATE_QUIZ':
      const id = payload.id; // the question id
      
      // result: {success, fail, skip}
      const updatedQuizzes = state.quizApp.quizzes.map((quiz) => {
        if (quiz.id === id) {
          return update(quiz, { result: { $set: payload.result } });
        }
        return quiz;
      })
      
      return {
        ...state,
        quizApp: update(state.quizApp, { quizzes: { $set: updatedQuizzes }})
      };
      
      
    default:
      return state;
  }
}

export default rootReducer;