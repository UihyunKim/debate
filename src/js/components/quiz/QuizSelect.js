import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuiz } from '../../actions/actions';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  console.log('State -> props');
  return {
    tryQuiz: state.quizzes.filter(q => {
      return q.try
    })[0],
  };
}

const mapDispatchToProps = dispatch => {
  console.log('Dispatch -> props');
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
    this.setState({id: this.props.tryQuiz.id}, () => {
      console.log("=== componentWillMount ===");
      console.log(this.state);
      
    })
    
    // this.setState({ ...this.props.tryQuiz }, () => {
    // });
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
    if (this.props.tryQuiz.answer === this.state.tryAnswer) {
      this.props.updateQuiz({ id: this.props.tryQuiz.id, result: 'success' })
    } else {
      this.props.updateQuiz({ id: this.props.tryQuiz.id, result: 'fail' })
    }
    console.log('=== handle Submit ========')
    console.log('----------- this.props ---')
    console.log(this.props);
    console.log('----------- this.state ---')
    console.log(this.state);
  }

  render() {
    const tryQuiz = this.props.tryQuiz;
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

const QuizSelect = connect( mapStateToProps, mapDispatchToProps )(ConnectedSelect);

export default QuizSelect;

// ConnectedQuiz.propTypes = {
//   tryQuiz: PropTypes.array.isRequired,
// }

