<?php get_header();?>

<div id="app"></div>
<div id="ajaxCall">AjaxCall</div>


<?php
$args = array('post_type' => 'quiz01');
$the_query = new WP_Query($args);
?>
<?php if ($the_query->have_posts()): ?>
    <?php while ($the_query->have_posts()): $the_query->the_post(); ?>
        <h2><?php the_title(); ?></h2>
        <?php wp_reset_postdata(); ?>
    <?php endwhile; ?>
<?php else: ?>
    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
<?php endif;?>

<?php
// ajax call activate
jdebate_ajax_calls();
?>

<?php get_footer();?>