<?php
// settings
require get_template_directory() . '/inc/functions/enqueue.php'; // enqueue scripts & styles
require get_template_directory() . '/inc/functions/login-redirect.php';
require get_template_directory() . '/inc/functions/disable-admin-bar.php';

// ajax
require get_template_directory() . '/inc/functions/ajax-quiz.php';
require get_template_directory() . '/inc/functions/ajax-vote-teacher.php';


// admin page
require get_template_directory() . '/inc/functions/admin.php';
require get_template_directory() . '/inc/functions/custom-post-type-quiz01.php';
require get_template_directory() . '/inc/functions/custom-post-type-vote.php';





// require get_template_directory() . '/inc/functions/logged-in-only.php'; // logged in users only