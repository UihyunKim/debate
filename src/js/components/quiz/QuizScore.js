import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  return { 
    score: state.quizApp.score.current
  };
}

const ConnectedScore = ({ score }) => (
  <div key={uuidv1()}>
    SCORE: {score}
  </div>
)

const QuizScore = connect(mapStateToProps)(ConnectedScore);

export default QuizScore;

// ConnectedScore.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }