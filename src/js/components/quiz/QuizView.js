import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { initQuizApp } from '../../actions/quiz-actions';

import QuizQuestion from './QuizQuestion';
import QuizSelect from './QuizSelect';
import QuizScore from './QuizScore';
import QuizResult from './QuizResult';
import QuizSessionEnd from './QuizSessionEnd';

// import { getRandomInt, nextNewQuiz } from '../../constants/functions';

import uuidv1 from 'uuid';
import update from 'immutability-helper';

const mapStateToProps = state => {
  const current =
    state.quizApp.quizzes.filter(quiz => (quiz.history.try))[0] ||
    state.quizApp.quizzes.filter(quiz => (quiz.history.reTry))[0];
  return {
    curQuiz: current
  };
}

const connectedQuizView = ({ curQuiz }) => {
  console.log(curQuiz.history)
  const view = (quiz => {
    let current = [<QuizScore key='quizScore'/>];
    
    // initial state
    if (quiz.history.try || quiz.history.reTry) {
      current.push([
        <QuizQuestion key='quizQuestion'/>,
        <QuizSelect key='quizSelect'/>
      ]);
    }
      
    // when click Confirm
    if (quiz.success !== null) {
      current.push([
        <QuizResult key='quizResult'/>
      ])
    }
    
    return current;
  })(curQuiz);
  
  // console.log(view);
  return view;
}

const QuizView = connect(mapStateToProps)(connectedQuizView);

export default QuizView;