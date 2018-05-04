<?
function jdebate_login_redirect( $redirect_to, $request, $user ){
    return home_url();
}
add_filter( 'login_redirect', 'jdebate_login_redirect', 10, 3 );