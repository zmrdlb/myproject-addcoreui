/**
 * @fileoverview 简单测试
 * @version 1.0 | 2017-01-10 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */

requirejs(['$','CORECOMMON/base.view'],function($,BaseView){
    BaseView.register({
        _init: function(){
            $('#btn-alert').on('click',function(e){
                _APP.Alert.show({
                    content: '您还未登陆',
                    ok: '好的'
                },{
                    ok: function(){
                        console.log('点击好的');
                    }
                });
            });
        }
    });
});
