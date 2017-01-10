/**
 * @fileoverview index.html的一个模块
 * @version 1.0 | 2017-01-10 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */
 define(function(){
     return {
         init: function(){
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
     }
 });
