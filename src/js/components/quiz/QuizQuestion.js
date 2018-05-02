import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  return { curQuiz: state.quizApp.curQuiz };
}

const ConnectedQuiz = ({ curQuiz }) => (
  <div>
    Q: {curQuiz.question}
  </div>
)

const QuizQuestion = connect(mapStateToProps)(ConnectedQuiz);

export default QuizQuestion;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }