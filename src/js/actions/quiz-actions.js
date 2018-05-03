export const initQuizApp = quiz => (
  {
    type: 'INIT_QUIZ_APP', payload: quiz
  }
)

export const successQuiz = quiz => (
  {
    type: 'SUCCESS_QUIZ', payload: quiz
  }
)

export const failQuiz = quiz => (
  {
    type: 'FAIL_QUIZ', payload: quiz
  }
)

export const skipQuiz = quiz => (
  {
    type: 'SKIP_QUIZ', payload: quiz
  }
)

export const nextQuiz = quiz => (
  {
    type: 'NEXT_QUIZ', payload: quiz
  }
)