<?php
function jdebate_login_style() {
  echo '<link rel="stylesheet" type="text/css" href="' . 
    get_template_directory_uri() . 
    '/inc/styles/custom-login-style.css" />';
}
add_action('login_head', 'jdebate_login_style');