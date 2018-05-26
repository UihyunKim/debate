<?php

/**
 * Redirects the user to the custom "Forgot your password?" page instead of
 * wp-login.php?action=lostpassword.
 */
add_action('login_form_lostpassword', 'jdebate_redirect_to_custom_lostpassword');
function jdebate_redirect_to_custom_lostpassword()
{
    if ('GET' == $_SERVER['REQUEST_METHOD']) {
        if (is_user_logged_in()) {
            $this->redirect_logged_in_user();
            exit;
        }

        wp_redirect(home_url('member-lostpassword'));
        exit;
    }
}

/**
 * Initiates password reset.
 */
add_action('login_form_lostpassword', 'jdebate_do_password_lost');
function do_password_lost()
{
    if ('POST' === $_SERVER['REQUEST_METHOD']) {
        $errors = retrieve_password();
        if (is_wp_error($errors)) {
            // Errors found
            $redirect_url = home_url('member-lostpassword');
            $redirect_url = add_query_arg('errors', join(',', $errors->get_error_codes()), $redirect_url);
        } else {
            // Email sent
            $redirect_url = home_url('member-login');
            $redirect_url = add_query_arg('checkemail', 'confirm', $redirect_url);
        }

        wp_redirect($redirect_url);
        exit;
    }
}
