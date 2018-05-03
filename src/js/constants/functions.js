import update from 'immutability-helper';

export const getRandomInt = (min, max) => (
  // int min(inclusive), int max(exclusive)
  Math.floor(Math.random() * (max - min)) + min

  // int min(inclusive), int max(inclusive)
  // Math.floor(Math.random() * (max - min + 1)) + min
)

// marking one random quiz's status into try
export const markingTheQuizTry = (quizzes) => {
  // find new quizzes
  const findNewQs = (quizzes) => {
    return quizzes.filter(quiz => {
      return quiz.status.current === 'new';
    });
  }
  const newQuizzes = findNewQs(quizzes);
  const theNewIdx = getRandomInt(0, newQuizzes.length);
  const theNewId = newQuizzes[theNewIdx].id;
  
  // marking the new quiz as status: try
  const tryQs = quizzes.map(quiz => {
    return quiz.id === theNewId ?
      update(quiz, { status: { current: { $set: 'try' } } }) :
      quiz
  });
  
  return tryQs;
}