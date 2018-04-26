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
        // var_dump($matches);
        array_push($q_data, $matches);
    }
    // var_dump($q_data);
    $q_JSON = json_encode($q_data);
    echo '<!--JSON[' . $q_JSON . ']JSON-->';
    var_dump($q_JSON);
	wp_reset_postdata();
} else {
    echo 'no posts';
}

echo"<script type=\"text/javascript\">
        const QUIZ = " . $q_JSON . ";
    </script>";
?>




<?php get_footer(); ?>