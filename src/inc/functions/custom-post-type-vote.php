<?php
function jdebate_custom_post_type_vote()
{
    $labels = array(
        'name' => 'Vote',
        'singular_name' => 'Vote',
        'menu_name' => 'Vote',
        'add_new' => 'Add Vote',
        'all_items' => 'All Vote',
        'add_new_item' => 'Add Vote',
        'edit_item' => 'Edit Vote',
        'update_item' => 'Update Vote',
        'view_item' => 'View Vote',
        'new_item' => 'New Vote',
        'search_item' => 'Search Vote',
        'not_found' => 'No Vote found',
        'not_found_in_trash' => 'No Vote found in trash',
        'parent_item_colon' => 'Parent Vote',
    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'publicly_queryable' => true,
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'page',
        'hierarchical' => false,
        'supports' => array(
            // 'title',
            // 'editor',
            'author',
            'revisions',
            'custom-fields',
        ),
        'label' => 'Vote',
        'description' => 'Vote',
        'menu_position' => 6,
        'exclude_from_search' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_in_admin_bar' => true,
        'can_export' => true,
        // 'taxonomies' => array('category', 'post_tag'),
    );
    register_post_type('vote', $args);
}
add_action('init', 'jdebate_custom_post_type_vote');

// Column view in admin pannel
function jdebate_vote_columns($columns)
{
    $columns = array(
        'cb' => $columns['cb'],
        'session' => 'Session',
        'type' => 'Type',
        'title_meta' => 'Title',
        'before' => 'Before open',
        'after' => 'After open',
        'members' => 'Members IDs',
        'voter' => 'Voter ID',
        'when' => 'When',
        'result' => 'Result',
    );
    return $columns;
}
add_filter('manage_vote_posts_columns', 'jdebate_vote_columns');

// Column data in admin pannel
function jdebate_vote_column($column, $post_id)
{
    // No. column
    if ('session' === $column) {
        $session = get_post_meta($post_id, 'v05_session_no', true);
        echo $session;
    }
    
    // No. column
    if ('type' === $column) {
        $agenda = get_post_meta($post_id, 'v10_agenda_vote', true);
        echo $agenda;
    }

    // Title_meta column
    if ('title_meta' === $column) {
        $title_meta = get_post_meta($post_id, 'v20_title', true);
        echo $title_meta;
    }

    // Before debate open column
    if ('before' === $column) {
        $before = get_post_meta($post_id, 'v30_before_open_close', true);
        echo $before;
    }
    
    // After debate open column
    if ('after' === $column) {
        $after = get_post_meta($post_id, 'v35_after_open_close', true);
        echo $after;
    }

    // Target column
    if ('members' === $column) {
        $voters = get_post_meta($post_id, 'v40_members', true);
        echo $voters;
    }

    // Voter column
    if ('voter' === $column) {
        $voter = get_post_meta($post_id, 'v50_voter_ID', true);
        echo $voter;
    }

    // Before column
    if ('when' === $column) {
        $before = get_post_meta($post_id, 'v60_before_after', true);
        echo $before;
    }
    
    // Vote column
    if ('result' === $column) {
        $vote = get_post_meta($post_id, 'v70_yeas_nays', true);
        echo $vote;
    }
}
add_action('manage_vote_posts_custom_column', 'jdebate_vote_column', 10, 2);
