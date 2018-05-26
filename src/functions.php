<?php
/**
 * SETTINGS
 * 
 */
require get_template_directory() . '/inc/functions/enqueue.php'; // enqueue scripts & styles
require get_template_directory() . '/inc/functions/disable-admin-bar.php';


/**
 * AJAX
 * 
 */
require get_template_directory() . '/inc/functions/ajax-quiz.php';
require get_template_directory() . '/inc/functions/ajax-vote-teacher.php';

/**
 * REDIRECTS
 * 
 */
require get_template_directory() . '/inc/functions/logged-in-only.php';


/**
 * CUSTOMIZE LOGIN / PASSWORD
 * 
 */
require get_template_directory() . '/inc/functions/customize-login.php';
require get_template_directory() . '/inc/functions/customize-lostpassword.php';


/**
 * CUSTOM POST TYPE
 * 
 */
require get_template_directory() . '/inc/functions/custom-post-type-quiz01.php';
require get_template_directory() . '/inc/functions/custom-post-type-vote.php';