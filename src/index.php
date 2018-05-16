<?php get_header();?>



<?php
// login user info
$the_user = wp_get_current_user();
$the_user_role = $the_user->roles[0];
$app_for = 'not signed';
if ($the_user_role === 'contributor') {
    $app_for = 'teacher';
} else if ($the_user_role === 'subscriber') {
    $app_for = 'student';
}

echo 'ID: ' . $the_user->user_login;
echo ' / ';
echo 'role: ' . $the_user_role;
echo ' / ';
echo 'email: ' . $the_user->user_email;
echo '<h3>' . $app_for . '</h3>';
echo '<hr/>';
?>

<?php

?>
<div id="<?php echo $app_for; ?>-app"></div>
<!-- <div id="ajaxCall">AjaxCall</div> -->


<!-- GET custom post type test -->
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
<!-- END GET custom post type test -->




<?php
// ajax call activate test
jdebate_ajax_calls();

// ajax vote teacher test
jdebate_ajax_vote_teacher();

// add agenda(custom post type vote) test
jdebate_ajax_add_agenda();
?>





<?php get_footer();?>