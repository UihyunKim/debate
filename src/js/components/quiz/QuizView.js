import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { initQuizApp } from '../../actions/actions';
// import QuizMap from './QuizMap';
import QuizQuestion from './QuizQuestion';
import QuizSelect from './QuizSelect';
import { getRandomInt } from '../../constants/functions';

import uuidv1 from 'uuid';
import update from 'immutability-helper';


const mapDispatchToProps = dispatch => {
  return {
    initQuizApp: select => dispatch(initQuizApp(select))
  }
}

// Fetch(or axios) space
const quizzesMap = () => {

  // marking one quiz as try:true
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
      try: elIdx === i ? true : false,
      result: ''
    });
  });

  return quizMap
}

class QuizInit extends Component {
  constructor() {
    super();
  }
  
  componentWillMount() {
    const quizzesValue = quizzesMap();
    const quizAppValue = {
      /**
       * @todo need to get value from back end
       */
      session: 1,
      score: 0,
      // flow: start -> select -> check -> result -> start
      flow: 'start',
      quizzes: quizzesValue,
      curQuiz: quizzesValue.filter(q=>q.try)[0]
    }

    this.props.initQuizApp(quizAppValue);
  }

  render() {
    return (
      <div>
        <QuizQuestion />
        <QuizSelect />
        {/* <QuizResult /> */}
      </div>
    );
  }
}

const QuizView = connect(null, mapDispatchToProps)(QuizInit);

export default QuizView;