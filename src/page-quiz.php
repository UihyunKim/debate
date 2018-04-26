<?php get_header(); ?>
<?php
// The Query
$the_query = new WP_Query( array( 'category_name' => 'quiz' ) ); 

if ( $the_query->have_posts() ) {
    $q_data = array();
    
    while ( $the_query->have_posts() ) {
        $the_query->the_post();
        $meta = get_post_meta($post->ID);
        $matches = preg_grep('/^[[:alpha:]]/', array_keys($meta));
        $matches = array_intersect_key($meta, array_flip($matches));
        array_push($q_data, $matches);
    }
	wp_reset_postdata();
} else {
    echo 'no posts';
}

echo"<script type=\"text/javascript\">
        const QUIZ = " . json_encode($q_data) . ";
    </script>";
?>

<div id="root"></div>

<?php get_footer(); ?>