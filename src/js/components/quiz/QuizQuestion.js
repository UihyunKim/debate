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

const ConnectedQuestion = ({ curQuiz }) => (
  <div>
    Q: {curQuiz.question}
  </div>
)

const QuizQuestion = connect(mapStateToProps)(ConnectedQuestion);

export default QuizQuestion;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }