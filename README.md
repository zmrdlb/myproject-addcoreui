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

同https://github.com/zmrdlb/projectdemo中2.4第4条说明，此处运行grunt develop --base=D:\mycoderoot\project-frame\tool\node_modules

# 运行

http://web.dev.net/pc/myproject-addcoreui/section/index.html

# 提测或上线前代码编译

1 . 打开myproject-addcoreui/Gruntfile.js，我们可以看到编译的配置。在底部可以看到以下两行代码：

- grunt.task.run(['includes','addfiles','requirejs','replace','htmlmin','clean']);
> 平常仅仅修改了myproject-addcoreui，则只需要打开此配置

- grunt.task.run(['copy','cssmin','includes','addfiles','requirejs','replace','htmlmin','clean']);
> 首次编译或修改了coreui，则需注释掉第一个配置，打开此配置。比第一个多了copy和cssmin，就是对coreui的编译。

2 . 在myproject-addcoreui下运行grunt -v --base=D:\mycoderoot\project-frame\tool\node_modules，则可看到同级多了个dist。将fiddler配置修改成D:\mycoderoot\project-frame\dist,
再次访问http://web.dev.net/pc/myproject-addcoreui/section/index.html，恭喜你，访问到了编译后的代码。

# ps

如果你的工程名称不叫myproject-addcoreui，则把Gruntfile.js里面的名称换成你当前的项目名，同样如果coreui的名称也变了，那么page/js/global.js，sectiontpl/include，Gruntfile.js里面的名称也要换。




