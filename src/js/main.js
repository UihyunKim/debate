import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'bootstrap';
import '../sass/style.scss';
import 'animate.css';
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

(function ($) {

  let windowWidth = $(window).width();

  const device = {
    sm: 576,
    md: 768
  }

  const resize = function () {
    $(window)
      .resize(function (e) {
        windowWidth = $(window).width();
        navColor();
        imgCrop();
        owl();
        navToggle('resize');
      });
  }

  const scrollTop = function () {
    $("a[href='#top']")
      .click(function () {
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
        return false;
      });
  }

  $(document).ready(function () {
    resize();
    $('#bootstrap-overrides').css('visibility', 'visible');
    scrollTop();
  });
})(jQuery);