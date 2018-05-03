import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  return { 
    score: state.quizApp.score.current
  };
}

const ConnectedQuiz = ({ score }) => (
  <div>
    SCORE: {score}
  </div>
)

const QuizScore = connect(mapStateToProps)(ConnectedQuiz);

export default QuizScore;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }