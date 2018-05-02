import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import uuidv1 from 'uuid';
import { Map, List } from 'immutable';

const mapStateToProps = state => {
  return { tryQuiz: state.quizzes[0].filter(q => q.try) };
}

const ConnectedQuiz = ({ tryQuiz }) => (
  <div>
    Q: {tryQuiz[0].question}
  </div>
)

const QuizQuestion = connect(mapStateToProps)(ConnectedQuiz);

export default QuizQuestion;

ConnectedQuiz.propTypes = {
  tryQuiz: PropTypes.array.isRequired,
}