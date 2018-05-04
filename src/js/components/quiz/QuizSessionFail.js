import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv1 from 'uuid';

const mapStateToProps = state => {
  return {
    quizApp: state.quizApp
  };
}

const ConnectedQuiz = ({ quizApp }) => {
  const sessionEnd = ((session) => {
    if (session === null) {
      return 'not end';
    }
    else if (session) {
      return 'session success!';
    }
    else {
      return 'session fail!';
    }
  })(quizApp.session.success)


  return (
    <div>
      <h3>SESSION FAIL COMPONENT</h3>
    </div>
  )
}
const QuizSessionFail = connect(mapStateToProps)(ConnectedQuiz);

export default QuizSessionFail;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }