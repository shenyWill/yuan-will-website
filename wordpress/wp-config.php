<?php
/**
 * WordPress基础配置文件。
 *
 * 这个文件被安装程序用于自动生成wp-config.php配置文件，
 * 您可以不使用网站，您需要手动复制这个文件，
 * 并重命名为“wp-config.php”，然后填入相关信息。
 *
 * 本文件包含以下配置选项：
 *
 * * MySQL设置
 * * 密钥
 * * 数据库表名前缀
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/zh-cn:%E7%BC%96%E8%BE%91_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress数据库的名称 */
define('DB_NAME', 'sdm563651653_db');

/** MySQL数据库用户名 */
define('DB_USER', 'sdm563651653');

/** MySQL数据库密码 */
define('DB_PASSWORD', 'Yuanaifei1314');

/** MySQL主机 */
define('DB_HOST', 'sdm563651653.my3w.com');

/** 创建数据表时默认的文字编码 */
define('DB_CHARSET', 'utf8');

/** 数据库整理类型。如不确定请勿更改 */
define('DB_COLLATE', '');

/**#@+
 * 身份认证密钥与盐。
 *
 * 修改为任意独一无二的字串！
 * 或者直接访问{@link https://api.wordpress.org/secret-key/1.1/salt/
 * WordPress.org密钥生成服务}
 * 任何修改都会导致所有cookies失效，所有用户将必须重新登录。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'm?/22jid5RX-5OcrFjAWt%To[:IP[~Gc~4O=M<HEy5VDs+t.W+7JfXJ6VNBB9;sC');
define('SECURE_AUTH_KEY',  'bC/$|u:OW4wBhrHd/?iFJ4~rE6+>usaG]`kzPi5_26q7YpYRPIhM-vZB=s+,h)%?');
define('LOGGED_IN_KEY',    'GRu+}spT~+PTbh)F>d5Dx|U )@vc7FXN2H(B1./z81TX|d1p{`vpYq0#jVx|lcNO');
define('NONCE_KEY',        'vxlq50,vb>[:8$^G(%<VlTR|/ u(nYW6|6g!Jy?`hq+&vb|OHEbu|T=R{f1`,bk}');
define('AUTH_SALT',        'Jg*]_6iCZ9%4k1ZauRl]:R@LNyLiV8PJ%LdO9ona#q@<0inhOUd99]P=uDi:e+u9');
define('SECURE_AUTH_SALT', '@B.0L,^=D|(R/%Kb`-6>Mqt&=)x9%?_|DS%=ejv0M#&6r,P|x}GyJv 9qW&`Yb,%');
define('LOGGED_IN_SALT',   'OvN#3UpYX`&m]__LdRWsnapPNdwO9S[8Zmd)rONKYkp*Km:mvI=z qAd,4!/: *v');
define('NONCE_SALT',       'i f47/*6y-`gcbLucNwO5F PEda$*v;SL_t;J8uNPWSkDElOEB;+ @J`;/y^[lhi');

/**#@-*/

/**
 * WordPress数据表前缀。
 *
 * 如果您有在同一数据库内安装多个WordPress的需求，请为每个WordPress设置
 * 不同的数据表前缀。前缀名只能为数字、字母加下划线。
 */
$table_prefix  = 'test';

/**
 * 开发者专用：WordPress调试模式。
 *
 * 将这个值改为true，WordPress将显示所有用于开发的提示。
 * 强烈建议插件开发者在开发环境中启用WP_DEBUG。
 *
 * 要获取其他能用于调试的信息，请访问Codex。
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/**
 * zh_CN本地化设置：启用ICP备案号显示
 *
 * 可在设置→常规中修改。
 * 如需禁用，请移除或注释掉本行。
 */
define('WP_ZH_CN_ICP_NUM', true);

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */

/** WordPress目录的绝对路径。 */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** 设置WordPress变量和包含文件。 */
require_once(ABSPATH . 'wp-settings.php');
