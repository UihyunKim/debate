import update from 'immutability-helper';
import { markingNewQuizToTry, markingSkipQuizToTry } from '../constants/functions';

const initialState = {
  session: {
    stage: 0,
    end: false,
    result: ''
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

    case 'INIT_QUIZ_APP': {
      return update(state, { $set: payload });
    }

    case 'SUCCESS_QUIZ': {
    
      // update THE QUIZ
      const theQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { status: { result: { $set: 'success' } } }, )
          : quiz
      ))

      // update TOTAL QUIZAPP
      const newState = update(state, {
        quizzes: { $set: theQuizzes },
        flow: { $set: 'result' },
        score: { current: { $apply: x => ++x } }
      });
      
      return newState;

      // END QUIZ
      // if (!(state.score.goal - state.score.current)) {
      //   const newState = update(state, {
      //     quizzes: { $set: upSuQuizzes },
      //     score: { current: { $apply: x => ++x } },
      //     session: { end: { $set: true } }
      //   })
      //   return newState;
      // }
    }
    
    case 'FAIL_QUIZ': {
      const theQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, {status: {result: { $set: 'fail' } } } )
          : quiz
      ));
      
      const newState = update(state, {
        quizzes: { $set: theQuizzes },
        flow: { $set: 'result' }
      });
      
      return newState;
    }
    
    case 'SKIP_QUIZ': {
      // marking the quiz's result as 'skip'
      const newQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { status: { current: { $set: 'skip' } } } )
          : quiz
      ))
      
      // marking next quiz as 'try'
      const nextTryQuizzes = 
        markingNewQuizToTry(newQuizzes) ||
        markingSkipQuizToTry(newQuizzes);
      
      const newState = update(state, {
        quizzes: { $set: nextTryQuizzes },
      })  
  
      return newState; 
    }
    
    case 'NEXT_QUIZ': {
      // update the quiz status as done
      const newQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { status: { current: { $set: 'done' } } } )
          : quiz
      ))
      
      // marking next quiz as 'try'
      const nextTryQuizzes = 
        markingNewQuizToTry(newQuizzes) ||
        markingSkipQuizToTry(newQuizzes) ||
        null;  // no more quizzes, fail session
      
      // SUCCESS SESSION
      if (state.score.goal === state.score.current) {
        const newState = update(state, {
          session: {
            end: { $set: true },
            result: { $set: 'success' }
          }
        });
        
        return newState;
      }
      
      // Ongoing session
      if (nextTryQuizzes) {
        const newState = update(state, { 
          quizzes: { $set: nextTryQuizzes }
        })  
        return newState;
      }
      
      // FAIL SESSION
      const newState = update(state, {
        session: { 
          end: { $set: true },
          result: { $set: 'fail' }
        }
      })
      return newState;
    }
    
    default: {
      return state;
    }
  }
}

export default quizReducer;