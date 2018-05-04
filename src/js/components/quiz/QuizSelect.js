import React, { Component } from 'react';
import { connect } from 'react-redux';
import { successQuiz, failQuiz, skipQuiz, nextQuiz } from '../../actions/quiz-actions';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  const current =
    state.quizApp.quizzes.filter(quiz => (quiz.history.try))[0] ||
    state.quizApp.quizzes.filter(quiz => (quiz.history.reTry))[0];
  return {
    curQuiz: current
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSuccessQuiz: select => dispatch(successQuiz(select)),
    onFailQuiz: select => dispatch(failQuiz(select)),
    onSkipQuiz: select => dispatch(skipQuiz(select)),
    onNextQuiz: select => dispatch(nextQuiz(select)),
  }
}

class ConnectedSelect extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleSkip(e) {
    this.props.onSkipQuiz({ id: this.props.curQuiz.id });
    this.setState( 
      update(this.state, { select: {$set: null}}) 
    )
  }
  
  handleNext(e) {
    this.props.onNextQuiz({ id: this.props.curQuiz.id });
    this.setState(
      update(this.state, { select: { $set: null } })
    );
  }

  handleChange(e) {
    // prevent change radio button AFTER quiz result
    if (this.props.curQuiz.success !== null) return false;
    
    this.setState(
      update(this.state, { select: { $set: e.target.value } })
    );
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.curQuiz.answer === this.state.select) {
      this.props.onSuccessQuiz({ id: this.props.curQuiz.id })
    } else {
      this.props.onFailQuiz({ id: this.props.curQuiz.id })
    }
  }
  
  
  
  render() {
    const curQuiz = this.props.curQuiz;
    
    const skipBtn = () => {
      if (curQuiz.success === null) {
        return (
          <button 
            className="btn btn-primary"
            onClick={this.handleSkip} 
            disabled={this.props.curQuiz.history.try ? false : true}
          >
            건너띄기
          </button>
        )
      }
    }
    
    const checkBtn = () => {
      if (curQuiz.success === null) {
        return (
          <button
            className="btn btn-primary"
            type="submit"
            form="selectForm"
            disabled={!this.state.select}
          >
            확인
          </button>
        )
      }
    }
    
    const nextBtn = () => {
      if (curQuiz.success !== null) {
        return (
          <button
            className="btn btn-primary"
            onClick={this.handleNext}
            disabled={this.props.curQuiz.success === null}
          >
            다음
          </button>
        )
      }
    }
    
    return (
      <div>
        {/* EXAMPLES */}
        <form id="selectForm" onSubmit={this.handleSubmit}>
          {
            curQuiz.allExams.map(ex => (
              <div className="form-check" key={ex.id}>
                <input
                  className="form-check-input" 
                  type="radio" 
                  name="examples" 
                  id={ex.id} 
                  value={ex.id} 
                  onChange={this.handleChange} 
                  checked={ex.id === this.state.select} 
                />
                <label
                  className="form-check-label"
                  htmlFor={ex.id}>
                  {ex.ex}
                </label>
              </div>
            ))
          }
        </form>

        {/* CHECK PANNEL */}
        <div>
          {skipBtn()}
          {checkBtn()}
          {nextBtn()}
        </div>

      </div>
    );
  }
}

const QuizSelect = connect( mapStateToProps, mapDispatchToProps )(ConnectedSelect);

export default QuizSelect;

// ConnectedQuiz.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }

