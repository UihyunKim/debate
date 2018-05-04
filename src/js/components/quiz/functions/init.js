// functions
import { getRandomInt } from '../../../global-functions/functions';

// utils
import uuidv1 from 'uuid';


// Fetch(or axios) space
export const quizzesInit = () => {
  // marking one quiz as try:true ===>> CHNAGE;
  const i = getRandomInt(0, QUIZ.length);

  const quizzes = QUIZ.map((el, elIdx) => {
    const answerId = uuidv1();
    const answerEx = el.answer.join();

    const allExs = el.answer
      .concat(el.example)
      .map((item, idx) => {
        return (
          idx === 0 ?
            { id: answerId, ex: answerEx } :
            { id: uuidv1(), ex: item }
        )
      });

    return ({
      id: uuidv1(),
      question: el.question.join(),
      allExams: allExs,
      answer: answerId,
      explanation: el.explanation.join(),
      history: {
        new: true,
        try: false,
        reTry: false,
        done: false,
        skip: false
      },
      success: null
    });
  });
  return quizzes;
}