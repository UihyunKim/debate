<?php

// 
// GET CURRENT STATUS OF VOTE
// 

// ajax call test function
function jdebate_ajax_vote_teacher()
{
    do_action('jdebate_ajax_vote_teacher');

    // TEMP button
    $get_data = '<button id="get-vote-teacher" class="btn btn-primary">
                    get vote teacher
                </button>';
    echo $get_data;

}

function jdebate_get_current_vote()
{
    if (defined('DOING_AJAX') && DOING_AJAX) {
        $the_query = new WP_Query(array('post_type' => 'vote'));
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
add_action('wp_ajax_nopriv_jdebate_get_current_vote', 'jdebate_get_current_vote');
add_action('wp_ajax_jdebate_get_current_vote', 'jdebate_get_current_vote');



// 
// ADD AGENDA
// 

// ajax add agenda button
function jdebate_ajax_add_agenda()
{
    do_action('jdebate_ajax_add_agenda');

    // TEMP button
    $get_data = '<button id="add-agenda" class="btn btn-primary">
                    add agenda
                </button>';
    echo $get_data;

}

// jdebate_add_vote_agenda()
function jdebate_add_agenda()
{
    $meta = $_POST['meta'];
    $post = array(
        'post_status' => 'publish',
        'post_author' => get_current_user_id(),
        'post_type' => 'vote',
        'meta_input' => array(
            'v10_agenda_vote' => 'agenda',
            'v20_title' => 'post from Front End Ajax',
            'v30_before_open_close' => 'open',
            'v35_after_open_close' => 'close',
            'v40_members' => '1,2,3',
            'v50_voter_ID' => '---',
            'v60_before_after' => '---',
            'v70_yeas_nays' => '---',
        ),
    );
    wp_insert_post($post);
    
    echo 'update success: ' . $meta;
    die();
}
add_action('wp_ajax_nopriv_jdebate_add_agenda', 'jdebate_add_agenda');
add_action('wp_ajax_jdebate_add_agenda', 'jdebate_add_agenda');

// jdebate_update_vote_agenda()
// jdebate_delete_vote_agenda()
