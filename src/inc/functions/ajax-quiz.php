<?php

// ajax call test function
function jdebate_ajax_calls()
{
    do_action('jdebate_ajax_calls');

    // TEMP button
    $get_data = '<button id="get-data" class="btn btn-primary">
                    get data
                </button>';
    echo $get_data;

}

function get_quizzes()
{
    if (defined('DOING_AJAX') && DOING_AJAX) {
        $the_query = new WP_Query(array('category_name' => 'quiz'));
        // echo json_encode($the_query);
        if ($the_query->have_posts()) {
            $q_data = array();

            while ($the_query->have_posts()) {
                $the_query->the_post();
                $meta = get_post_meta($the_query->post->ID);
                $matches = preg_grep('/^[[:alpha:]]/', array_keys($meta));
                $matches = array_intersect_key($meta, array_flip($matches));
                array_push($q_data, $matches);
            }
            wp_reset_postdata();
        } else {
            echo 'no posts';
        }

        echo json_encode($q_data);
    }

    die();
}
add_action('wp_ajax_nopriv_get_quizzes', 'get_quizzes');
add_action('wp_ajax_get_quizzes', 'get_quizzes');