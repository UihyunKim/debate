import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import uuidv1 from 'uuid';

const mapStateToProps = state => {
  return {
    tryQuiz: state.quizzes[0].filter(q => q.try)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addQuiz: select => dispatch(addQuiz(select))
  }
}

class ConnectedSelect extends Component {
  constructor() {
    super();
    this.state = {
      id: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({id: e.target.value}, () => {
      console.log(this.state);
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log(`selected: ${this.state.id}`)
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
                <label className="form-check-label" htmlFor={ex.id}>
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
            disabled={!this.state.id}
          >
            확인
          </button>
        </div>

      </div>
    );
  }
}

const QuizSelect = connect(mapStateToProps, mapDispatchToProps)(ConnectedSelect);

export default QuizSelect;

// ConnectedQuiz.propTypes = {
//   tryQuiz: PropTypes.array.isRequired,
// }

