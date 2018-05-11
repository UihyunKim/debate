import update from 'immutability-helper';
import { nextNewQuiz, nextSkipQuiz } from '../components/quiz/functions/button';

const initialState = {
  session: {
    stage: 0,
    error: null,
    isLoaded: false,
    start: false,
    end: false,
    success: null,
  },     // a session per week
  score: {
    goal: 0,
    current: 0,
  },       // ex. 10 is goal for this session
  quizzes: [],    // quizzes by one session (ex, 15)
}

const quizReducer = (state = initialState, { type, payload }) => {

  switch (type) {

    case 'INIT_QUIZ_APP': {
      return update(state, { $set: payload });
    }
    
    case 'START_QUIZ': {
      const newState = update(state, {
        session: {
          start: {$set: false}
        }
      })
      
      return newState;
    }

    case 'SUCCESS_QUIZ': {
    
      // update THE QUIZ
      const updateQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { 
            success:  { $set: true  } 
          })
          : quiz
      ))

      // update TOTAL QUIZAPP
      const newState = update(state, {
        quizzes: { $set: updateQuizzes },
        score: { current: { $apply: x => ++x } }
      });
      
      return newState;
    }
    
    case 'FAIL_QUIZ': {
      const updateQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { 
            success:  { $set: false } 
          })
          : quiz
      ));
      
      const newState = update(state, {
        quizzes: { $set: updateQuizzes },
      });
      
      return newState;
    }
    
    case 'SKIP_QUIZ': {
      // marking the quiz's result as 'skip'
      const updateQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { history: { 
            new:    { $set: false },
            try:    { $set: false },
            reTry:  { $set: false },
            done:   { $set: false },
            skip:   { $set: true  }
          } } )
          : quiz
      ))
      
      // marking next quiz as 'try'
      const findNextQuiz = 
        nextNewQuiz(updateQuizzes) ||
        nextSkipQuiz(updateQuizzes);
      
      const newState = update(state, {
        quizzes: { $set: findNextQuiz },
      })  
  
      return newState; 
    }
    
    case 'NEXT_QUIZ': {
      // update the quiz history as done
      const updateQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { 
            history: {
              new:    { $set: false },
              try:    { $set: false },
              reTry:  { $set: false },
              done:   { $set: true  },
              skip:   { $set: false } 
            }
          })
          : quiz
      ))
      
      // FIND next(new and then, skip) quiz
      const nextTryQuizzes = 
        nextNewQuiz(updateQuizzes) ||
        nextSkipQuiz(updateQuizzes) ||
        null;  // no more quizzes, fail session
      
      // SUCCESS SESSION
      if (state.score.goal === state.score.current) {
        const newState = update(state, {
          session: {
            end:      { $set: true },
            success:  { $set: true }
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
          end:      { $set: true  },
          success:  { $set: false }
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