import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startQuiz } from '../../actions/quiz-actions';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid';

const mapStateToProps = state => {
  return {
    quizApp: state.quizApp
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onStartQuiz: select => dispatch(startQuiz(select))
  }
}

class ConnectedStart extends Component {
  constructor() {
    super();
    
    this.handleStart = this.handleStart.bind(this);
  }
  
  handleStart(e) {
    this.props.onStartQuiz();
  }
  
  render() {
    const view = (start => {
      if (start) {
        return (
          <div>
            <h3>퀴즈를 시작해 볼까요?</h3>
            <button
              className="btn btn-primary"
              onClick={this.handleStart}
              disabled={!this.props.quizApp.session.start}
            >
              시작
        </button>
          </div>
        )
      }
      else {
        return '';
      }
    })(this.props.quizApp.session.start);
    
    return view;
  }
  
}

const QuizSessionStart = connect(mapStateToProps, mapDispatchToProps )(ConnectedStart);

export default QuizSessionStart;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }