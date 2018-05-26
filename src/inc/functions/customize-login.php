<?
add_filter( 'login_redirect', 'jdebate_redirect_after_login' );
function jdebate_redirect_after_login()
{
    if ( ! defined( 'DOING_AJAX' ) ) {

        $current_user   = wp_get_current_user();
        $role_name      = $current_user->roles[0];

        if ( !('administrator' === $role_name) ) {
            wp_redirect(home_url());
            exit;
        } // if $role_name
    } // if DOING_AJAX

} // jdebate_redirect_users_by_role

/**
 * Redirect guest to login page
 *
 */
add_action('login_form_login', 'jdebate_redirect_to_custom_login');
function jdebate_redirect_to_custom_login()
{
    if ('GET' === $_SERVER['REQUEST_METHOD']) {
        $redirect_to = isset($_REQUEST['redirect_to']) ? $_REQUEST['redirect_to'] : null;

        if (is_user_logged_in()) {
            jdebate_redirect_users_by_role();
            exit;
        }

        // The rest are redirected to the login page
        $login_url = home_url('member-login');
        if (!empty($redirect_to)) {
            $login_url = add_query_arg('redirect_to', $redirect_to, $login_url);
        }

        wp_redirect($login_url);
        exit;
    }

}

/**
 * Redirect the user after authentication if there were any errors.
 *
 * @param Wp_User|Wp_Error  $user       The signed in user, or the errors that have occurred during login.
 * @param string            $username   The user name used to log in.
 * @param string            $password   The password used to log in.
 *
 * @return Wp_User|Wp_Error The logged in user, or error information if there were errors.
 */
add_filter('authenticate', 'jdebate_maybe_redirect_at_authenticate', 101, 3);
function jdebate_maybe_redirect_at_authenticate($user, $username, $password)
{
    // Check if the earlier authenticate filter (most likely,
    // the default WordPress authentication) functions have found errors
    if ('POST' === $_SERVER['REQUEST_METHOD']) {
        if (is_wp_error($user)) {
            $error_codes = join(',', $user->get_error_codes());

            $login_url = home_url('member-login');
            // http: //localhost/wp-rest/member-login/?login=invalid_username
            $login_url = add_query_arg('login', $error_codes, $login_url);

            wp_redirect($login_url);
            exit;
        }
    }
    return $user;
}

/**
 * Redirect after logout
 *
 */
add_action('wp_logout', 'jdebate_redirect_after_logout');
function jdebate_redirect_after_logout()
{
    $redirect_url = home_url('member-login?logged_out=true');
    wp_safe_redirect($redirect_url);
    exit;
}
    