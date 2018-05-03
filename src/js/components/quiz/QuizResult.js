import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  const current = 
    state.quizApp.quizzes.filter(quiz => (quiz.status.current === 'try'))[0] ||
    state.quizApp.quizzes.filter(quiz => (quiz.status.current === 'retry'))[0];
  return { 
    curQuiz: current 
  };
}

const ConnectedQuiz = ({ curQuiz }) => (
  <div>
    <h3>정답: {curQuiz.status.result}</h3>
    <h3>해설: {curQuiz.explanation}</h3>
  </div>
)

const QuizResult = connect(mapStateToProps)(ConnectedQuiz);

export default QuizResult;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }