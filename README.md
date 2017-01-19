# 前言

阅读之前，请先阅读：[业务核心库](https://github.com/zmrdlb/myproject-addcoreui)

此项目是使用[业务核心库](https://github.com/zmrdlb/myproject-addcoreui)的具体业务工程demo。即我们开发项目的时候工程目录设计如下：

- 业务核心库

- 具体业务项目（会使用业务核心库里面的代码）

# 搭建环境

1 . 在D:\mycoderoot\project-frame（可自行更改）下，git clone 

- https://github.com/zmrdlb/coreui.git

- https://github.com/zmrdlb/myproject-addcoreui.git

- https://github.com/zmrdlb/tool.git

2 . fiddler配置

REGEX:http://web.dev.net/pc/*

D:\mycoderoot\project-frame\

3 . requirejs配置

在myproject-addcoreui/js/page/global.js中，可看见，我们把coreui/js/global.js里面的配置copy过来进行了修改。对于coreui/js/里面的代码引用，使用的是相对路径。
我们也可以增加自己的paths等配置。

4 . 开发时sectiontpl编译

同https://github.com/zmrdlb/projectdemo中2.4第4条说明，在myproject-addcoreui下运行grunt develop -v --base=D:\mycoderoot\project-frame\tool\node_modules

# 运行

http://web.dev.net/pc/myproject-addcoreui/section/index.html

# 提测或上线前代码编译

1 . 在D:\mycoderoot\project-frame下新建dist目录，切换到：D:\mycoderoot\project-frame\dist

2 . 在dist下，git clone coreui和myproject-addcoreui，分别新建并切换到dist分支。我们规定dist分支存放提测线上代码。后续大家可以根据需要自由发挥。(实际中，提测和线上应该是两个不同的分支)

> 此处有个坑，因为coreui默认做了git add submodule 引用，所以从master新建dist分支后，先把.gitmodules里面的内容清空，注意不是删除。因为不这样子，运行grunt编译后的js无法提交，因为会识别成submodule里引用的另外一个项目的提交。

3 . 如果首次载入coreui，或者修改了coreui，先切换到coreui下，运行：grunt -v --base=D:\mycoderoot\project-frame\tool\node_modules

4 . 在myproject-addcoreui下运行grunt -v --base=D:\mycoderoot\project-frame\tool\node_modules，则可看到同级多了个dist。将fiddler配置修改成D:\mycoderoot\project-frame\dist,
再次访问http://web.dev.net/pc/myproject-addcoreui/section/index.html，恭喜你，访问到了编译后的代码。

5. coreui中有一些ui的模板是通过require-text插件引用的，未打包压缩前，myproject-addcoreui对coreui中的资源访问必须是同域。当然执行了grunt编译后，myproject-addcoreui对coreui资源的引用可以不是同域，这个时候对sectiontpl/include/css.html和js.html中，coreui资源的引用改成绝对路径即可。

# ps

如果你的工程名称不叫myproject-addcoreui，则把Gruntfile.js里面的名称换成你当前的项目名，同样如果coreui的名称也变了，那么page/js/global.js，sectiontpl/include，Gruntfile.js里面的名称也要换。
# 小贴士
实际在业务开发中，应用环境会比较复杂，比如

1. 对myproject-addcoreui要进行独立的域名设置，和coreui不一样；

- coreui: web.dev.com

- myproject-addcoreui: my.dev.com

2. 提测或上线时对myproject-addcoreui/section/index.html进行路径映射

- 访问http://my.dev.com/直接映射到index.html

3. 不同环境域名不一样

- 测试环境coreui: web.dev.com

- 线上环境coreui: web.com

这个时候就没那么轻松了，那其实就是不同情况，不同环境，会有不同的设置。比如我首次用到实际项目中，本地 | 测试 | 线上，3者的页面路径和coreui资源的访问路径都不一样，那么我的解决方法就是针对sectiontpl中的变量进行替换，如：

Gruntfile.js

''''

    if(_env == '--dev'){
        var __corehost = 'http://web.dev.com';
    }else{
        var __corehost = 'http://web.com';
    }
    //本地开发coreui文件对应的域名
    var __corehost_qa = 'http://web.dev.com';
    
''''

grunt.initConfig中的配置：

'''

    replace: {
          dist: {
              options: {
                  patterns: [{
                      match: 'corehost',
                      replacement: __corehost
                  }]
              },
              expand: true,
              flatten: true,
              cwd: '../dist/open/section/',
              src: ['*.html'],
              dest: '../dist/open/section/'

         },
         src: {
             options: {
                 patterns: [{
                     match: 'corehost',
                     replacement: __corehost_qa
                 }]
             },
             expand: true,
             flatten: true,
             cwd: './section/',
             src: ['*.html'],
             dest: './section/'
         }
      }
      
'''

任务配置：

- 本地开发时:

> grunt.registerTask('develop',['includes:src','replace:src','watch:includes']);

- 提测或上线:

> grunt.registerTask('default', 'default', function(){
  grunt.task.run(['clean:dist','addfiles','requirejs','includes:dist','replace:dist','htmlmin','clean:nouse']);
});
  

命名执行：

本地开发：grunt develop -v --base=D:\mycoderoot\project-frame\tool\node_modules

提测：grunt -v --dev --base=D:\mycoderoot\project-frame\tool\node_modules

上线：grunt -v --base=D:\mycoderoot\project-frame\tool\node_modules
