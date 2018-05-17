import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import TeacherVoteBeforePrepare from './TeacherVoteBeforePrepare';

import uuidv1 from 'uuid';

class TeacherVoteBeforeApp extends Component {
  render() {
    return (
      <div>
        <h1>디베이트 전 찬/반 투표</h1>
        <h3>온에어 스위치((===))</h3>
        <hr/>
        <h5>투표 준비</h5>
        <TeacherVoteBeforePrepare/>
        <hr/>
        
        <h5>투표 결과</h5>
        
      </div>
    );
  }
}

export default TeacherVoteBeforeApp;

// ConnectedScore.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }