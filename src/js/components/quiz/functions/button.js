// utils
import update from 'immutability-helper';
// functions
import { getRandomInt } from '../../../global-functions/functions';

// marking one random quiz's status into try
export const nextNewQuiz = (quizzes) => {
  const newQuizzes = (quizzes => (
    quizzes.filter(quiz => quiz.history.new)
  ))(quizzes)

  // return until new quiz exists
  if (newQuizzes.length) {
    const theNewIdx = getRandomInt(0, newQuizzes.length);
    const theNewId = newQuizzes[theNewIdx].id;

    // marking the new quiz.history.try
    const historyTry = quizzes.map(quiz => {
      return quiz.id === theNewId ?
        update(quiz, {
          history: {
            new: { $set: false },
            try: { $set: true },
            reTry: { $set: false },
            done: { $set: false },
            skip: { $set: false }
          }
        })
        : quiz
    });

    return historyTry;
  }

  // NOT having new any more
  return null;
}

// marking one skip quiz's status into try
export const nextSkipQuiz = (quizzes) => {
  const skipQuizzes = (quizzes => (
    quizzes.filter(quiz => quiz.history.skip)
  ))(quizzes)

  // return until skip quiz exists
  if (skipQuizzes.length) {
    const theSkipIdx = getRandomInt(0, skipQuizzes.length);
    const theSkipId = skipQuizzes[theSkipIdx].id;

    // marking the skip quiz as status: try
    const hitoryReTry = quizzes.map(quiz => {
      return quiz.id === theSkipId ?
        update(quiz, {
          history: {
            new: { $set: false },
            try: { $set: false },
            reTry: { $set: true },
            done: { $set: false },
            skip: { $set: false }
          }
        })
        : quiz
    });

    return hitoryReTry;
  }

  // NOT having new any more
  return null;
}