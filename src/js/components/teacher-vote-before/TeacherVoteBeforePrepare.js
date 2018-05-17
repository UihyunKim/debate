import React, { Component } from 'react';
import PropTypes from 'prop-types';

// utils
import uuidv1 from 'uuid';
import axios from 'axios';
import Qs from 'qs';
import update from 'immutability-helper';

class TeacherVoteBeforePrepare extends Component {

  render() {

    return (
      <div>
        <div>
          <h5>안건: </h5>
          <p>...안건 내용 ajax call...</p>
          <button className="btn btn-primary">완료</button>
        </div>
        <div className="mt-5">
          <h5>투표 대상자 목록</h5>
          <h6>총 ..00..명</h6>
          <div>투표 명단 ajax call</div>
        </div>
      </div>
    );
  }
}

export default TeacherVoteBeforePrepare;

// ConnectedScore.propTypes = {
//   curQuiz: PropTypes.array.isRequired,
// }