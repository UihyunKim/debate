    <?php if (is_user_logged_in()) : ?> 
      <div class="mt-5">
        <a href="<?php echo wp_logout_url(); ?>">logout</a>
      </div>
    <?php endif; ?>

    <?php wp_footer();?>
  </body>
</html>