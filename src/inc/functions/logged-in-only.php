<?php
// Redirect users who arent logged in...
function jdebate_logged_in_only()
{
    $allowed = preg_match('/\/member-/', $_SERVER['REQUEST_URI']) ? true : false;

    if (!is_user_logged_in() && !$allowed) {
        wp_redirect(home_url('member-login'));
        die;
    }

}
add_action('template_redirect', 'jdebate_logged_in_only');
