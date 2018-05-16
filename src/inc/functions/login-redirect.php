<?
// function jdebate_login_redirect( $redirect_to, $request, $user ) {
//     return home_url();
// }
// add_filter( 'login_redirect', 'jdebate_login_redirect', 10, 3 );


function jdebate_redirect_users_by_role() {
 
    if ( ! defined( 'DOING_AJAX' ) ) {
 
        $current_user   = wp_get_current_user();
        $role_name      = $current_user->roles[0];
 
        if ( !('administrator' === $role_name) ) {
            wp_redirect(home_url());
        } // if $role_name
    } // if DOING_AJAX
 
} // jdebate_redirect_users_by_role
add_action( 'admin_init', 'jdebate_redirect_users_by_role' );