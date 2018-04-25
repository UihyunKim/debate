<?php get_header(); ?>

<?php $login  = (isset($_GET['login']) ) ? $_GET['login'] : 0; ?>

<?php if ( $login === "failed" ): ?>
  <p class="login-msg"><strong>오류:</strong> 아이디 혹은 패스워드를 다시 확인해 주세요.</p>
<?php elseif ( $login === "empty" ): ?>
  <p class="login-msg"><strong>오류:</strong> 아이디 혹은 패스워드를 입력하지 않았어요.</p>
<?php elseif ( $login === "false" ): ?>
  <p class="login-msg"><strong>오류:</strong> 로그아웃 되었어요.</p>
<?php endif; ?>

<form method="post" action="<?php bloginfo('url') ?>/wp-login.php" class="wp-user-form">
  <div class="username">
    <label for="user_login">아이디: </label>
    <input  type="text" 
            name="log" 
            value="<?php echo esc_attr(stripslashes($user_login)); ?>" 
            size="20" 
            id="user_login" 
            tabindex="11" />
  </div>
  <div class="password">
    <label for="user_pass">패스워드: </label>
    <input type="password" 
           name="pwd" 
           value="" 
           size="20" 
           id="user_pass" 
           tabindex="12" />
  </div>
  <div class="login_fields">
    <div class="rememberme">
      <label for="rememberme">
        <input  type="checkbox" 
                name="rememberme" 
                value="forever" 
                checked="checked" 
                id="rememberme" 
                tabindex="13" /> 로그인 기억
      </label>
    </div>
    <?php do_action('login_form'); ?> 
    <input type="submit" name="user-submit" value="<?php _e('Login'); ?>" tabindex="14" class="user-submit" />
    <input type="hidden" name="redirect_to" value="<?php bloginfo('url'); ?>" />
    <input type="hidden" name="user-cookie" value="1" />
  </div>
</form>

<?php get_footer(); ?>