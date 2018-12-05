<?php
function themeoptions_admin_menu() {
	// 在控制面板的侧边栏添加设置选项页链接
	add_theme_page('xuan主题设置', 'xuan主题设置','edit_themes', basename(__FILE__), 'themeoptions_page');
}
if ( isset($_POST['update_themeoptions']) && $_POST['update_themeoptions'] == 'true' ) themeoptions_update();
function themeoptions_page() {
  // 获取提交的数据
  $a_options = get_option('xm_vue_options');
  //加载上传图片的js(wp自带)
  wp_enqueue_script('thickbox');
  //加载css(wp自带)
  wp_enqueue_style('thickbox');
?>
  <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/include/css/set.css">
  <div class="wrap">
    <h2>主题设置</h2>
    <ul class="nav-wrap clearfix">
      <li class="nav-list on">基本</li>
      <li class="nav-list">SEO</li>
      <li class="nav-list">图片</li>
      <li class="nav-list">社交</li>
      <li class="nav-list">自定义代码</li>
    </ul>
    <form method="post" action="">
      <input type="hidden" name="update_themeoptions" value="true">
      <!-- 内容一 基本 -->
      <div class="content-wrap content1">
        <div class="row clearfix">
          <label class="fl left-wrap">侧边栏统计功能：</label>
          <div class="fr right-wrap">
            <label for="aside-count-on">开</label>
            <input
              type="radio"
              id="aside-count-on"
              name="aside-count"
              value="on" <?php if($a_options['aside_count'] == 'on') echo 'checked'; ?>
            >
            <label for="aside-count-off">关</label>
            <input
              type="radio"
              id="aside-count-off"
              name="aside-count"
              value="off" <?php if($a_options['aside_count'] == 'off' || $a_options['aside_count'] == '') echo 'checked'; ?>
            >
          </div>
        </div>
        <div class="row clearfix">
          <label class="fl left-wrap">是否开启文字头像：</label>
          <div class="fr right-wrap">
            <label for="text-pic-on">开</label>
            <input
              type="radio"
              id="text-pic-on"
              name="text-pic"
              value="on" <?php if($a_options['text_pic'] == 'on') echo 'checked'; ?>
            >
            <label for="text-pic-off">关</label>
            <input
              type="radio"
              id="text-pic-off"
              name="text-pic"
              value="off" <?php if($a_options['text_pic'] == 'off' || $a_options['text_pic'] == '') echo 'checked'; ?>
            >
          </div>
        </div>

        <div class="row clearfix">
          <label for="sidebar-notice" class="fl left-wrap">侧边栏公告：</label>
          <div class="fr right-wrap">
            <textarea id="sidebar-notice" name="sidebar-notice" rows="5" cols="100"><?php echo $a_options['sidebar_notice']; ?></textarea>
          </div>
        </div>

        <div class="row clearfix">
          <label for="footer-copyright" class="fl left-wrap">底部版权文字：</label>
          <div class="fr right-wrap">
            <textarea id="footer-copyright" name="footer-copyright" rows="5" cols="100"><?php echo $a_options['footer_copyright']; ?></textarea>
          </div>
        </div>

        <div class="row clearfix">
          <label for="footer-txt" class="fl left-wrap">网站底部一句话：</label>
          <div class="fr right-wrap">
            <textarea id="footer-txt" name="footer-txt" rows="8" cols="100"><?php echo $a_options['footer_text'] ?></textarea>
          </div>
        </div>

        <div class="row clearfix">
					<label for="not-found" class="fl left-wrap">404页面：</label>
          <div class="fr right-wrap">
            <textarea id="not-found" name="not-found" rows="8" cols="100"><?php echo $a_options['not_found'] ?></textarea>
          </div>
        </div>
      </div>
      <!-- 内容二 SEO -->
      <div class="content-wrap content2">
        <div class="row clearfix">
          <label for="keywords" class="fl left-wrap">首页关键词(keywords)：</label>
          <div class="fr right-wrap">
            <textarea id="keywords" name="keywords" rows="8" cols="100"><?php echo $a_options['keywords'] ?></textarea>
          </div>
        </div>
        <div class="row clearfix">
          <label for="description class=" fl left-wrap"">首页描述(description)：</label>
          <div class="fr right-wrap">
            <textarea id="description" name="description" rows="8" cols="100"><?php echo $a_options['description'] ?></textarea>
          </div>
        </div>
      </div>
			<!-- 内容三 图片设置 -->
      <div class="content-wrap content3">
				<div class="row clearfix">
          <label class="fl left-wrap">评论区vip等级样式：</label>
          <div class="fr right-wrap">
            <label for="vip-style-1" class="vip-style" style="display: inline-block; width: 15px; height: 15px; background: url(<?php bloginfo('template_url'); ?>/static/images/vip.png) -147px -70px;"></label>
            <input
              type="radio"
              id="vip-style-1"
              name="vip-style"
              value="vip-style-1" <?php if($a_options['vip_style'] == 'vip-style-1' || $a_options['vip_style'] == '') echo 'checked'; ?>
            >

            <label for="vip-style-2" class="vip-style" style="display: inline-block; width: 42px; height: 15px; background: url(<?php bloginfo('template_url'); ?>/static/images/vip.png) -2px -2px;"></label>
            <input
              type="radio"
              id="vip-style-2"
              name="vip-style"
              value="vip-style-2" <?php if($a_options['vip_style'] == 'vip-style-2') echo 'checked'; ?>
            >
          </div>
        </div>
				<div class="row">
          <div class="margin-top-15 clearfix">
            <label class="fl left-wrap" for="">后台登录logo：</label>
            <div class="fr right-wrap">
              <input
                type="text"
                class="url-inp"
                name="login-logo"
                id="login-logo"
                value="<?php echo $a_options['login_logo']; ?>"
              >
              <input type="button" name="img-upload" value="选择文件">
            </div>
          </div>
          <div class="margin-top-15 clearfix">
            <div class="fl left-wrap">
              后台登录图标预览：
            </div>
            <div class="fr right-wrap">
              <img src="<?php echo $a_options['login_logo']; ?>" class="preview-img" style="max-width: 100px;" alt="">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="margin-top-15 clearfix">
            <label class="fl left-wrap" for="">窗口小图标：</label>
            <div class="fr right-wrap">
              <input
                type="text"
                class="url-inp"
                name="favicon-img"
                id="favicon-img"
                value="<?php echo $a_options['favicon']; ?>"
              >
              <input type="button" name="img-upload" value="选择文件">
            </div>
          </div>
          <div class="margin-top-15 clearfix">
            <div class="fl left-wrap">
              窗口小图标预览：
            </div>
            <div class="fr right-wrap">
              <img src="<?php echo $a_options['favicon']; ?>" class="preview-img" style="max-width: 100px;" alt="">
            </div>
          </div>
        </div>
				<div class="row">
          <div class="margin-top-15 clearfix">
            <label class="fl left-wrap" for="">默认缩略图：</label>
            <div class="fr right-wrap">
              <input
                type="text"
                class="url-inp"
								name="thumbnail-img"
                id="thumbnail-img"
                value="<?php echo $a_options['thumbnail']; ?>">
              <input type="button" name="img-upload" value="选择文件">
            </div>
          </div>
          <div class="margin-top-15 clearfix">
            <div class="fl left-wrap">
              默认缩略图预览：
            </div>
            <div class="fr right-wrap">
              <img src="<?php echo $a_options['thumbnail']; ?>" class="preview-img" style="max-width: 100px;" alt="">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="margin-top-15 clearfix">
            <label class="fl left-wrap" for="">页面大图：</label>
            <div class="fr right-wrap">
              <input
                type="text"
                class="url-inp"
                name="big-banner"
                id="big-banner"
                value="<?php echo $a_options['big_banner']; ?>"
              >
              <input type="button" name="img-upload" value="选择文件">
            </div>
          </div>
          <div class="margin-top-15 clearfix">
            <div class="fl left-wrap">
              页面大图预览：
            </div>
            <div class="fr right-wrap">
              <img src="<?php echo $a_options['big_banner']; ?>" class="preview-img" style="max-width: 400px;" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 内容四 社交 -->
      <div class="content-wrap content4">
        <div class="row clearfix">
          <label class="fl left-wrap" for="link">友情链接：</label>
          <div class="fr right-wrap">
            <textarea id="link" name="link" rows="15" cols="100"><?php echo $a_options['link']; ?></textarea>
          </div>
        </div>
      </div>
      <!-- 内容五 自定义代码 -->
      <div class="content-wrap content5">
				<div class="row clearfix">
					<label class="fl left-wrap" for="all-head">自定义head标签：</label>
					<div class="fr right-wrap">
						<textarea id="all-head" name="all-head" rows="8" cols="100"><?php echo $a_options['all_head']; ?></textarea>
					</div>
				</div>
        <div class="row clearfix">
          <label class="fl left-wrap" for="login-css">后台登录页面css（不需要style标签）：</label>
          <div class="fr right-wrap">
            <textarea id="login-css" name="login-css" rows="8" cols="100"><?php echo $a_options['login_css']; ?></textarea>
          </div>
        </div>
        <div class="row clearfix">
          <label class="fl left-wrap" for="common-css">页面公用css（不需要style标签）：</label>
          <div class="fr right-wrap">
            <textarea id="common-css" name="common-css" rows="8" cols="100"><?php echo $a_options['common_css']; ?></textarea>
          </div>
        </div>
        <div class="row clearfix">
          <label class="fl left-wrap" for="footer-js">页面公用js（不需要script标签）：</label>
          <div class="fr right-wrap">
            <textarea id="footer-js" name="footer-js" rows="8" cols="100"><?php echo $a_options['footer_js']; ?></textarea>
          </div>
        </div>
      </div>
      <div class="row btn-wrap">
        <input type="submit" class="submit-btn" name="bcn-admin-options" value="保存更改">
      </div>
    </form>
  </div>
  <script src="<?php bloginfo('template_url'); ?>/include/js/set.js"></script>
<?php
	}
	function themeoptions_update() {
		// 数据提交
    $options = array(
      'update_themeoptions' => 'true',
      'login_logo'          => $_POST['login-logo'],
      'aside_count'         => $_POST['aside-count'],
      'text_pic'            => $_POST['text-pic'],
      'favicon'             => $_POST['favicon-img'],
      'thumbnail'           => $_POST['thumbnail-img'],
      'big_banner'          => $_POST['big-banner'],
      'not_found'           => $_POST['not-found'],
      'sidebar_notice'      => $_POST['sidebar-notice'],
      'footer_copyright'    => $_POST['footer-copyright'],
      'footer_text'         => $_POST['footer-txt'],
      'login_css'           => $_POST['login-css'],
      'all_head'            => $_POST['all-head'],
      'common_css'          => $_POST['common-css'],
      'footer_js'           => $_POST['footer-js'],
      'keywords'            => $_POST['keywords'],
      'description'         => $_POST['description'],
      'link'                => $_POST['link'],
      'vip_style'           => $_POST['vip-style']
    );
    update_option('xm_vue_options', stripslashes_deep($options));
	}
	add_action('admin_menu', 'themeoptions_admin_menu');
?>
