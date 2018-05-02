import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuiz } from '../../actions/actions';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  const thisQuiz = state.quizzes.filter(q => q.try);
  const quizzes = state.quizzes;
  return {
    tryQuiz: thisQuiz,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuiz: select => dispatch(updateQuiz(select))
  }
}

class ConnectedSelect extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({...this.props.tryQuiz[0]}, () => {
      // console.log(this.state);
      // console.log(this.props);      
    });
  }

  handleChange(e) {
    // this.setState({ id: e.target.value }, () => {
    //   console.log(this.state);
    // })
    this.setState(
      update(
        this.state, 
        {tryAnswer: {$set: e.target.value}}
      ), 
      () => {
        // console.log(this.state);
      }
    );
    // console.log(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.answer === this.state.tryAnswer) {
      console.log("success")
      this.props.updateQuiz({id: this.props.tryQuiz[0].id, todo: 'success' })
    } else {
      console.log("fail")
    }
  }

  render() {
    const tryQuiz = this.props.tryQuiz[0];
    return (
      <div>
        {/* EXAMPLES */}
        <form id="selectForm" onSubmit={this.handleSubmit}>
          {
            tryQuiz.allExs.map(ex => (
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
          <button className="btn btn-primary">
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

const QuizSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSelect);

export default QuizSelect;

// ConnectedQuiz.propTypes = {
//   tryQuiz: PropTypes.array.isRequired,
// }

