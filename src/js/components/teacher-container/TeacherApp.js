import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import TeacherVoteBeforeApp from '../teacher-vote-before/TeacherVoteBeforeApp';

// utils
import uuidv1 from 'uuid';
import axios from 'axios';
import Qs from 'qs';
import update from 'immutability-helper';

export default () => {
  return (
    <div>
      <hr/>
      <TeacherVoteBeforeApp/>
      <hr/>
    </div>
  )
}
