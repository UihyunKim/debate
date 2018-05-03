import update from 'immutability-helper';

export const getRandomInt = (min, max) => (
  // int min(inclusive), int max(exclusive)
  Math.floor(Math.random() * (max - min)) + min

  // int min(inclusive), int max(inclusive)
  // Math.floor(Math.random() * (max - min + 1)) + min
)

// marking one random quiz's status into try
export const markingNewQuizToTry = (quizzes) => {
  // find new quizzes
  const findNewQs = (quizzes) => {
    return quizzes.filter(quiz => {
      return quiz.status.current === 'new';
    });
  }
  const newQuizzes = findNewQs(quizzes);
  
  // return until new quiz exists
  if (newQuizzes.length) {
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
  
  // NOT having new any more
  return null;
}

// marking one skip quiz's status into try
export const markingSkipQuizToTry = (quizzes) => {
  // find Skip quizzes
  const findSkipQs = (quizzes) => {
    return quizzes.filter(quiz => {
      return quiz.status.current === 'skip';
    });
  }
  const skipQuizzes = findSkipQs(quizzes);
  
  // return until skip quiz exists
  if (skipQuizzes.length) {
    const theSkipIdx = getRandomInt(0, skipQuizzes.length);
    const theSkipId = skipQuizzes[theSkipIdx].id;
    
    // marking the skip quiz as status: try
    const tryQs = quizzes.map(quiz => {
      return quiz.id === theSkipId ?
        update(quiz, { status: { current: { $set: 'retry' } } }) :
        quiz
    });
    
    return tryQs;
  }
  
  // NOT having new any more
  return null;
}