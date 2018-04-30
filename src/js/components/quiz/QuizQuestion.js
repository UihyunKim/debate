import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuidv1 from 'uuid';
import { Map, List } from 'immutable';

const mapStateToProps = state => {
  return { quizzes: state.quizzes };
}

const ConnectedQuiz = ({ quizzes }) => (
  <ul>
    {
      quizzes[0].map(quiz => (
        <li key={quiz.id}>
          {quiz.question}
        </li>
      ))
    }
  </ul>
)

const QuizQuestion = connect(mapStateToProps)(ConnectedQuiz);

export default QuizQuestion;