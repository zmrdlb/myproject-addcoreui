/**
 * @fileoverview 简单测试
 * @version 1.0 | 2017-01-10 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */

requirejs(['$','CORECOMMON/base.view','comp/index.comp'],function($,BaseView,IndexComp){
    BaseView.register({
        _init: function(){
            IndexComp.init();
        }
    });
});
