import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  const current = 
    state.quizApp.quizzes.filter(quiz => (quiz.history.try))[0] ||
    state.quizApp.quizzes.filter(quiz => (quiz.history.reTry))[0];
  return { 
    curQuiz: current 
  };
}

const ConnectedQuiz = ({ curQuiz }) => {
  const result = (res => {
    if (res === null) {
      return '...';
    }
    else if (res) {
      return 'O';
    }
    else {
      return 'X';
    }
  })(curQuiz.success)
  
  return (
    <div>
      <h3>정답: {result}</h3>
      <h3>해설: {curQuiz.explanation}</h3>
    </div>
  )
}

const QuizResult = connect(mapStateToProps)(ConnectedQuiz);

export default QuizResult;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }