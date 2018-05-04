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
      <h3>SESSION SUCCESS COMPONENT</h3>
    </div>
  )
}
const QuizSessionSuccess = connect(mapStateToProps)(ConnectedQuiz);

export default QuizSessionSuccess;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }