<?php

// ============
// QUIZ 01
// ============
function jdebate_custom_post_type_quiz01()
{
    $labels = array(
        'name' => 'Quiz01',
        'singular_name' => 'Quiz01',
        'menu_name' => 'Quiz01',
        'add_new' => 'Add Quiz',
        'all_items' => 'All Quizzes',
        'add_new_item' => 'Add Quiz',
        'edit_item' => 'Edit Quiz',
        'update_item' => 'Update Quiz',
        'view_item' => 'View Quiz',
        'new_item' => 'New Quiz',
        'search_item' => 'Search Quiz01',
        'not_found' => 'No Quizzes found',
        'not_found_in_trash' => 'No Quizzes found in trash',
        'parent_item_colon' => 'Parent Quiz',
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
            // 'author',
            'revisions',
            'custom-fields',
        ),
        'label' => 'Quiz01',
        'description' => 'Quiz level 1',
        'menu_position' => 5,
        'exclude_from_search' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_in_admin_bar' => true,
        'can_export' => true,
        // 'taxonomies' => array('category', 'post_tag'),
    );
    register_post_type('quiz01', $args);
}
add_action('init', 'jdebate_custom_post_type_quiz01');

// Column view in admin pannel
function jdebate_quiz01_columns($columns)
{
    $columns = array(
        'cb' => $columns['cb'],
        // 'title' => __('Title'),
        'number' => 'No.',
        'question' => 'Question',
        'answer' => 'Answer',
    );
    return $columns;
}
add_filter('manage_quiz01_posts_columns', 'jdebate_quiz01_columns');

// Column data in admin pannel
function jdebate_quiz01_column($column, $post_id)
{
    // No. column
    if ('number' === $column) {
        $number = get_post_meta($post_id, 'q10_number', true);
        if (!$number) {
            _e('n/a');
        } else {
            echo $number;
        }
    }
    
    // Question column
    if ('question' === $column) {
        $question = get_post_meta($post_id, 'q30_question', true);
        if (!$question) {
            _e('n/a');
        } else {
            echo $question;
        }
    }
    
    // Answer column
    if ('answer' === $column) {
        $answer = get_post_meta($post_id, 'q50_answer', true);
        if (!$answer) {
            _e('n/a');
        } else {
            echo $answer;
        }
    }
}
add_action('manage_quiz01_posts_custom_column', 'jdebate_quiz01_column', 10, 2);

// Sortable column
function jdebate_quiz01_sortable_columns($columns)
{
    $columns['number'] = 'number';
    return $columns;
}
add_filter('manage_edit-quiz01_sortable_columns', 'jdebate_quiz01_sortable_columns');

function jdebate_quiz01_orderby($query)
{
    if (!is_admin() || !$query->is_main_query()) {
        return;
    }
    
    if ('number' === $query->get('orderby')) {
        $query->set('orderby', 'meta_value');
        $query->set('meta_key', 'q10_number');
        $query->set('meta_type', 'numeric');
    }
}
add_action('pre_get_posts', 'jdebate_quiz01_orderby');