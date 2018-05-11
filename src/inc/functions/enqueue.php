<?php
// enqueue style
function jdebate_styles_enqueue() {
  wp_enqueue_style (
    'main-styles', 
    get_template_directory_uri() . '/inc/styles/main.css' ,
    array(), 
    filemtime(get_template_directory() . '/inc/styles/main.css'), 
    false
  );
  wp_enqueue_script( 
    'bundle-js', 
    get_template_directory_uri() . '/inc/js/bundle.js', 
    array(), 
    '1.0.0', 
    true 
  );
}
add_action('wp_enqueue_scripts', 'jdebate_styles_enqueue');

