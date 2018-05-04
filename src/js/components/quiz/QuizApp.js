import React, { Component } from "react";
import { connect } from 'react-redux';

// actions
import { initQuizApp } from '../../actions/quiz-actions';

// functions
import { nextNewQuiz } from './functions/button';
import { quizzesInit } from './functions/init';

// components
import QuizSessionStart from "./QuizSessionStart";
import QuizView from "./QuizView";
import QuizSessionEnd from "./QuizSessionEnd";

// utils
import uuidv1 from 'uuid';


const mapStateToProps = state => {
  return {
    quizApp: state.quizApp
  };
}

const mapDispatchToProps = dispatch => {
  return {
    initQuizApp: select => dispatch(initQuizApp(select))
  }
}

class connectedQuizInit extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    /**
      * @todo need to get value from back end
      */
    const sessionNo = 1;
    /**
     *  @todo need to get value from back end
     */
    const goalNo = 2;

    // init quizzes structure
    const quizzesValue = quizzesInit();

    // marking one quiz's status as try
    const qsTryValue = nextNewQuiz(quizzesValue);

    const quizAppValue = {
      session: {
        stage: sessionNo,
        start: true,
        end: false,
        success: null,
      },
      score: {
        goal: goalNo,
        current: 0
      },
      quizzes: qsTryValue
    };

    this.props.initQuizApp(quizAppValue);
  } // end componentWillMount()

  render() {
    // WATCHOUT here renders twice, because of componentWillMount
    if (this.props.quizApp.quizzes.length) {
      // console.log(this.props.quizApp)
    }

    const view = ((session) => {
      if (session.start) {
        return <QuizSessionStart />;
      }
      else if (!(session.start) && !(session.end)) {
        return <QuizView />;
      }
      else if (session.end) {
        return <QuizSessionEnd />;
      }
      else {
        return '<h1>session view error</h1>';
      }
    })(this.props.quizApp.session);

    return view;
  }

}

const QuizApp = connect(mapStateToProps, mapDispatchToProps)(connectedQuizInit);

export default QuizApp;