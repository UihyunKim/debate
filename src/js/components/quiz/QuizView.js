import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { initQuizApp } from '../../actions/quiz-actions';
// import QuizMap from './QuizMap';
import QuizQuestion from './QuizQuestion';
import QuizSelect from './QuizSelect';
import QuizScore from './QuizScore';
import QuizResult from './QuizResult';
import { getRandomInt, markingNewQuizToTry } from '../../constants/functions';

import uuidv1 from 'uuid';
import update from 'immutability-helper';


const mapDispatchToProps = dispatch => {
  return {
    initQuizApp: select => dispatch(initQuizApp(select))
  }
}

// Fetch(or axios) space
const quizzesMap = () => {

  // marking one quiz as try:true ===>> CHNAGE;
  const i = getRandomInt(0, QUIZ.length);
  
  const quizMap = QUIZ.map((el, elIdx) => {
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
      try: elIdx === i ? true : false,
      status: {
        current: 'new',  // current: 'new', 'try', 'done', 'skip'
        result: '',   // result: '', 'success', 'fail'
      },
      // result: '',
    });
  });
  return quizMap;
}

class QuizInit extends Component {
  constructor() {
    super();
  }

  componentWillMount() {

    /**
      * @todo need to get value from back end
      */
    const sessionNo = 1;
    /**
     *  @todo need to get value from back end
     */
    const goalNo = 2;
    
    // init quizzes structure
    const quizzesValue = quizzesMap();
    
    // marking one quiz's status as try
    const qsTryValue = markingNewQuizToTry(quizzesValue);
    
    const quizAppValue = {
      session: {
        stage: sessionNo,
        end: false,
        result: ''
      },
      score: {
        goal: goalNo,
        current: 0
      },
      // flow: start -> select -> check -> result -> start
      flow: 'start',
      quizzes: qsTryValue,
      // curQuiz: quizzesValue.filter(q => q.try)[0]
    };

    this.props.initQuizApp(quizAppValue);
  }

  render() {
    return (
      <div>
        <QuizScore />
        <QuizQuestion />
        <QuizSelect />
        <QuizResult />
      </div>
    );
  }
}

const QuizView = connect(null, mapDispatchToProps)(QuizInit);

export default QuizView;