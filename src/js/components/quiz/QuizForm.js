import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid';
import { addArticle } from '../../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  }
}

class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }
  
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <div>
          <label htmlFor="title">Title</label>
          <input 
            type="text"
            id="title"
            value={title}
            onChange={this.handleChange}
            />
        </div>
        <button type="submit">
          SAVE
        </button>
      </form>
    );
  }
}

const QuizForm = connect(null, mapDispatchToProps)(ConnectedForm);

export default QuizForm;