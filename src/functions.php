<?php
// includes
require get_template_directory() . '/inc/functions/enqueue.php'; // enqueue scripts & styles
require get_template_directory() . '/inc/functions/logged-in-only.php'; // logged in users only


function login_redirect( $redirect_to, $request, $user ){
    return home_url();
}
add_filter( 'login_redirect', 'login_redirect', 10, 3 );