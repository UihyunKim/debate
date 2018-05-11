// functions
import { getRandomInt } from '../../../global-functions/functions';
import { nextNewQuiz } from './button';

// utils
import uuidv1 from 'uuid';

export const quizAppInit = (ajaxData) => {
  /**
      * @todo need to get value from back end
      */
  const sessionNo = 1;
  /**
   *  @todo need to get value from back end
   */
  const goalNo = 2;

  // init quizzes structure
  const quizzesValue = quizzesInit(ajaxData);

  // marking one quiz's status as try
  const qsTryValue = nextNewQuiz(quizzesValue);

  const quizAppValue = {
    session: {
      stage: sessionNo,
      error: null,
      isLoaded: true,
      start: true,
      end: false,
      success: null,
    },
    score: {
      goal: goalNo,
      current: 0
    },
    quizzes: qsTryValue
  };

  return quizAppValue;
  // this.props.initQuizApp(quizAppValue);
}

const quizzesInit = (ajaxData) => {
  // marking one quiz as try:true ===>> CHNAGE;
  const i = getRandomInt(0, ajaxData.length);

  const quizzes = ajaxData.map((el, elIdx) => {
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