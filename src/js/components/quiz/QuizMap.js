import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuiz } from '../../actions/actions';
import uuidv1 from 'uuid';
// import { Map, List } from 'immutable';

const mapDispatchToProps = dispatch => {
  return {
    addQuiz: quiz => dispatch(addQuiz(quiz))
  }
}

class ConnectedQuizMapRegister extends Component {
  constructor() {
    super();
  }
  
  
  render() {
    
  }
}

const QuizMap = () => {
  // console.log(QUIZ);
  const quizMap = QUIZ.map(el => {
    const answerId = uuidv1();
    const answerEx = el.answer.join();
    const allEx = el.answer.concat(el.example).map((item, idx) => {
      return
      (idx === 0 ?
        { id: answerId, ex: answerEx }
        :
        { id: uuidv1(), ex: item })
    });
    return ({
      id: uuidv1(),
      question: el.question.join(),
      allExs: allEx,
      answer: answerId,
      try: null,
      success: null
    });
  });
  console.log(quizMap);
  return quizMap
}

export default QuizMap;