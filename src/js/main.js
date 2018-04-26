import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'bootstrap';
import '../sass/style.scss';
import 'animate.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


function run() {
  // do something
  console.log(QUIZ);
  
  
  
}

// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
// IE <= 8
else document.attachEvent('onreadystatechange', function () {
  if (document.readyState == 'complete') run();
});