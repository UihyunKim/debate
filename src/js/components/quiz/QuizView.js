import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addQuiz } from '../../actions/actions';
import QuizMap from './QuizMap';
import QuizQuestion from './QuizQuestion';
import { getRandomInt } from '../../constants/functions';

import uuidv1 from 'uuid';
import { Map, List } from 'immutable';

const mapDispatchToProps = dispatch => {
  return {
    addQuiz: select => dispatch(addQuiz(select))
  }
}

class QuizInit extends Component {
  constructor() {
    super();
  }
  
  componentWillMount() {
    // Here is fetch(or axios) space
    const QuizMap = () => {
      
      // marking one quiz as try:true
      const i = getRandomInt(0, QUIZ.length);
      
      const quizMap = QUIZ.map((el, elIdx) => {
        const answerId = uuidv1();
        const answerEx = el.answer.join();
        
        const allEx = el.answer.concat(el.example).map((item, idx) => {
          return
          (idx === 0 ?
            { id: answerId, ex: answerEx }
            :
            { id: uuidv1(), ex: item })
        });
        
        return ({
          id: uuidv1(),
          question: el.question.join(),
          allExs: allEx,
          answer: answerId,
          try: elIdx === i ? true : false,
          success: null
        });
      });
      
      return quizMap
    }
    const quizzes = QuizMap()
    
    console.log(quizzes);
    
    
    this.props.addQuiz(quizzes);
  }
  
  render() {
    return (
      <div>
        <QuizQuestion />
        {/* <QuizSelect />
        <QuizResult /> */}
      </div>
    );
  }
}

const QuizView = connect(null, mapDispatchToProps)(QuizInit);

export default QuizView;