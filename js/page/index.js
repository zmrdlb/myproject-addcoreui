requirejs(['$','COREUI/ui.alert'],function($,Alert){
    $('#btn-alert').on('click',function(e){
        Alert.show({
            content: '您还未登陆',
            ok: '好的'
        },{
            ok: function(){
                console.log('点击好的');
            }
        });
    });
});
