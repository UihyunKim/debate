import update from 'immutability-helper';
import { markingNewQuizToTry, markingSkipQuizToTry } from '../constants/functions';

const initialState = {
  session: {
    stage: 0,
    end: false,
  },     // a session per week
  score: {
    goal: 0,
    current: 0,
  },       // ex. 10 is goal for this session
  flow: '',       // quiz flow: start(select+check) -> result
  quizzes: [],    // quizzes by one session (ex, 15)
  curQuiz: {},    // current trying quiz
}

const quizReducer = (state = initialState, { type, payload }) => {

  switch (type) {

    case 'INIT_QUIZ_APP':
      return update(state, { $set: payload });

    case 'SUCCESS_QUIZ':
      const upSuQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, {status: {result: { $set: 'success' }} })
          : quiz
      ))

      // NEXT QUIZ
      if (!!(state.score.goal - state.score.current)) {
        const newState = update(state, {
          quizzes: { $set: upSuQuizzes },
          flow: { $set: 'result' },
          score: { current: { $apply: x => ++x } }
        });
        return newState;
      }

      // END QUIZ
      if (!(state.score.goal - state.score.current)) {
        const newState = update(state, {
          quizzes: { $set: upSuQuizzes },
          score: { current: { $apply: x => ++x } },
          session: { end: { $set: true } }
        })
        return newState;
      }

    case 'FAIL_QUIZ':
      const upFaQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, {status: {result: { $set: 'fail' }} })
          : quiz
      ));
      return update(state, {
        quizzes: { $set: upFaQuizzes },
        flow: { $set: 'result' }
      });

    case 'SKIP_QUIZ':
      // marking the quiz's result as 'skip'
      const upSkQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, {status: { current: { $set: 'skip' }} })
          : quiz
      ));
      
      // marking next quiz as 'try'
      
      const nextTryQuizzes = 
        markingNewQuizToTry(upSkQuizzes) ||
        markingSkipQuizToTry(upSkQuizzes);
      
      const newState = update(state, { 
        quizzes: { $set: nextTryQuizzes },
        
      })  
      return newState;

    case 'NEXT_QUIZ':
      break;


    default:
      return state;
  }
}

export default quizReducer;