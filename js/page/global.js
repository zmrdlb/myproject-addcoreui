/**
 * @fileoverview 所有页面全局js
 * @version 1.0 | 2016-05-22 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */

/**
 * requirejs配置
 */
var __coreuibaseurl = '../../coreui/js'; //相对于baseUrl

requirejs.config({
    baseUrl: '../js',
    paths: {
        'text': __coreuibaseurl + '/widget/lib/require.text',
        'css': __coreuibaseurl + '/widget/lib/require-css/css',

        'jquery': __coreuibaseurl + '/widget/lib/jquery-3.1.1',
        'migrate': __coreuibaseurl + '/widget/lib/jquery-migrate-3.0.0',
        'libio': __coreuibaseurl + '/widget/io',
        'libjson': __coreuibaseurl + '/widget/util/json',
        'libchannel': __coreuibaseurl + '/widget/util/channel',
        'liblayers': __coreuibaseurl + '/widget/ui/layer',
        'libinherit': __coreuibaseurl + '/widget/util/inherit',
        'libevt': __coreuibaseurl + '/widget/util/evt',
        'libdom': __coreuibaseurl + '/widget/util/dom',
        'libcompatible': __coreuibaseurl + '/widget/util/compatible',
        'libload': __coreuibaseurl + '/widget/util/load',
        'libbase': __coreuibaseurl + '/widget/util/base',
        'libstr': __coreuibaseurl + '/widget/util/str',
        'libclassdesign': __coreuibaseurl + '/widget/util/classdesign',
        'libtpl': __coreuibaseurl + '/widget/util/tpl',
        'libpage': __coreuibaseurl + '/widget/ui/page',
        'libtab': __coreuibaseurl + '/widget/ui/tab',

        //当前业务公共组件库路径

        'COREUI': __coreuibaseurl + '/ui',
        'CORECOMMON': __coreuibaseurl + '/common'
    },
    shim: {
		'migrate': ['jquery']
	}
});

define('$',['jquery','migrate'],function($){
    return $;
});
