<?php get_header();?>

<div class="login-form-container">
    <?php
        wp_login_form(
            array(
                'label_username' => __( '이메일', '' ),
                'label_password' => __('패스워드', ''),
                'label_log_in' => __( '로그인', '' ),
                'label_remember' => __('로그인 저장', ''),
                'redirect' => $attributes['redirect'],
            )
        );
    ?>
     
    <a class="forgot-password" href="<?php echo wp_lostpassword_url(); ?>">
        <?php _e( '패스워드 찾기', '' ); ?>
    </a> <br/>
</div>

<?php get_footer();
