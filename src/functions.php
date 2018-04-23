<?php
// enqueue style
function wpa_styles_enqueue() {
  wp_enqueue_style('main-styles', get_template_directory_uri() . '/inc/styles/main.css', array(), filemtime(get_template_directory() . '/inc/styles/main.css'), false);
  wp_enqueue_script( 'bundle-js', get_template_directory_uri() . '/inc/js/bundle.js', array(), '1.0.0', true );
}
add_action('wp_enqueue_scripts', 'wpa_styles_enqueue');

// includes
require get_template_directory() . '/inc/login-style.php'; // Customize login page