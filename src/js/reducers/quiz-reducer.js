import update from 'immutability-helper';


const initialState = {
  session: 0,     // a session per week
  score: 0,       // ex. 10 is goal for this session
  flow: '',       // quiz flow: start -> select -> check -> result -> start
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
          update(quiz, { result: { $set: 'success' } })
          : quiz
      ));
      return update(state, { quizzes: { $set: upSuQuizzes } });

    case 'FAIL_QUIZ':
      const upFaQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { result: { $set: 'fail' } })
          : quiz
      ));
      return update(state, { quizzes: { $set: upFaQuizzes } });

    case 'SKIP_QUIZ':
      const upSkQuizzes = state.quizzes.map(quiz => (
        quiz.id === payload.id ?
          update(quiz, { result: { $set: 'skip' } })
          : quiz
      ));
      return update(state, { quizzes: { $set: upSkQuizzes } });

    case 'NEXT_QUIZ':
      break;


    default:
      return state;
  }
}

export default quizReducer;