import React, { Component } from "react";
import { connect } from 'react-redux';

// actions
import { initQuizApp } from '../../actions/quiz-actions';

// functions
import { quizAppInit } from './functions/init';

// components
import QuizSessionStart from "./QuizSessionStart";
import QuizView from "./QuizView";
import QuizSessionEnd from "./QuizSessionEnd";

// utils
import uuidv1 from 'uuid';
import axios from 'axios';
import Qs from 'qs';
import update from 'immutability-helper';

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

  componentWillMount() {} // end componentWillMount()

  componentDidMount() {
    const data = { action: 'get_quizzes' }
    axios.post(jdebateAjax.ajax_url, Qs.stringify(data))
      .then(response => {
        const newState = quizAppInit(response.data);
        this.props.initQuizApp(newState);
      })
      .catch(error => {
        console.log(error);
        const newState = update(this.props.quizApp, {
          session: {
            error: {
              $set: true
            }
          }
        })
        this.props.initQuizApp(newState);
      });
  }

  render() {
    // WATCHOUT here renders twice, because of componentWillMount
    // if (this.props.quizApp.quizzes.length) {
    //   // console.log(this.props.quizApp)
    // }

    const view = ((session) => {
      const { error, isLoaded, start, end, success } = session;
      if (error) {
        return <h1>error</h1>;
      } else if (!isLoaded) {
        return <h1>Loading...</h1>;
      } else if (start) {
        return <QuizSessionStart />;
      } else if (!start && !end) {
        return <QuizView />;
      } else if (end) {
        return <QuizSessionEnd />;
      } else {
        return <h1>session view error</h1>;
      }
    })(this.props.quizApp.session);

    return view;
  }

}

const QuizApp = connect(mapStateToProps, mapDispatchToProps)(connectedQuizInit);

export default QuizApp;