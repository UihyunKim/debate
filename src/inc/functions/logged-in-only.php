<?php
// Redirect users who arent logged in...
function jdebate_logged_in_only() {
  global $pagenow;
  var_dump($pagenow);
  var_dump(is_user_logged_in());
  global $wp;
  echo '$wp->request: ' . home_url( $wp->request );

  // Check to see if user in not logged in and not on the login page
  if( !is_user_logged_in() && $pagenow != 'wp-login.php' ) {
    auth_redirect();
  }
}
add_action( 'wp', 'jdebate_logged_in_only' ); 
