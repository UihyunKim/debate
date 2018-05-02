import React, { Component } from 'react';
import { connect } from 'react-redux';
import { successQuiz, failQuiz, skipQuiz } from '../../actions/quiz-actions';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  console.log('State -> props');
  return {
    curQuiz: state.quizApp.curQuiz,
  };
}

const mapDispatchToProps = dispatch => {
  console.log('Dispatch -> props');
  return {
    onSuccessQuiz: select => dispatch(successQuiz(select)),
    onFailQuiz: select => dispatch(failQuiz(select)),
    onSkipQuiz: select => dispatch(skipQuiz(select)),
  }
}

class ConnectedSelect extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  componentWillMount() {
    this.setState({id: this.props.curQuiz.id}, () => {
      console.log("=== componentWillMount ===");
      console.log(this.state);
    })
  }
  
  
  handleSkip(e) {
    this.props.onSkipQuiz({ id: this.props.curQuiz.id });
  }

  handleChange(e) {
    this.setState(
      update(this.state, { tryAnswer: { $set: e.target.value } }), () => {
        console.log('=== handle Change ========')
        console.log('----------- this.props ---')
        console.log(this.props);
        console.log('----------- this.state ---')
        console.log(this.state);
      }
    );
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.curQuiz.answer === this.state.tryAnswer) {
      this.props.onSuccessQuiz({ id: this.props.curQuiz.id })
    } else {
      this.props.onFailQuiz({ id: this.props.curQuiz.id })
    }
    console.log('=== handle Submit ========')
    console.log('----------- this.props ---')
    console.log(this.props);
    console.log('----------- this.state ---')
    console.log(this.state);
  }

  render() {
    const curQuiz = this.props.curQuiz;
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
                // checked={}
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
          <button 
            className="btn btn-primary"
            onClick={this.handleSkip}>
            건너띄기
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            form="selectForm"
            disabled={!this.state.tryAnswer}
          >
            확인
          </button>
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

