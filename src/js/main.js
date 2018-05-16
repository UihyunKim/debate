import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'bootstrap';
import '../sass/style.scss';
import 'animate.css';

// REACT REDUX
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import QuizApp from './components/quiz/QuizApp';

// import 'fullpage.js'
// import 'fullpage.js/dist/jquery.fullpage.css'
// import Shuffle from 'shufflejs'
// import 'lightgallery'
// import 'lightgallery/dist/css/lightgallery.css';
// import 'jquery-mousewheel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
// import fontawesome from '@fortawesome/fontawesome';
// import faUser from '@fortawesome/fontawesome-free-solid/faUser';
// fontawesome.library.add(faUser);
// import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
// fontawesome.library.add(faUserCircle);

// (function ($) {
//   $(document).ready(function () {
//   });
// })(jQuery);



function run() {
  // do something
  const studentApp = document.getElementById('student-app') || null;
  const teacherApp = document.getElementById('teacher-app') || null;
  
  if (studentApp) {
    render(
      <Provider store={store}>
        <QuizApp />
      </Provider>,
      studentApp
    );
  }
  if (teacherApp) {
    render(
      <Provider store={store}>
        <QuizApp />
      </Provider>,
      teacherApp
    );
  }
  
}

// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);


jQuery(document).on('click', '#get-data', function () {
  jQuery.ajax({
    url: jdebateAjax.ajax_url,
    type: 'post',
    data: {
      action: 'get_quizzes',
    },
    success: function (response) {
      console.log(response)
    }
  });
})

jQuery(document).on('click', '#get-vote-teacher', function () {
  jQuery.ajax({
    url: jdebateAjax.ajax_url,
    type: 'post',
    data: {
      action: 'jdebate_get_current_vote',
    },
    success: function (response) {
      console.log(response)
    }
  });
})

jQuery(document).on('click', '#add-agenda', function () {
  jQuery.ajax({
    url: jdebateAjax.ajax_url,
    type: 'post',
    data: {
      action: 'jdebate_add_agenda',
      meta: 123,
    },
    success: function (response) {
      console.log(response)
    }
  });
})

