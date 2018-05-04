import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuizSessionSuccess from './QuizSessionSuccess';
import QuizSessionFail from './QuizSessionFail';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  return {
    quizApp: state.quizApp
  };
}

const ConnectedQuiz = ({ quizApp }) => {
  const sessionEnd = ((session) => {
    if (session) {
      return <QuizSessionSuccess />;
    } 
    else if (!session) {
      return <QuizSessionFail />;
    }
    else {
      return 'session end view error';
      }
    })(quizApp.session.success)
  
  return (
    <div>
      {sessionEnd}
    </div>
  )
}
const QuizSessionEnd = connect(mapStateToProps)(ConnectedQuiz);

export default QuizSessionEnd;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }