module.exports = function(grunt) {
    grunt.file.setBase(__dirname);
    var packdir = '../tool/'; //package.json所在的目录
    var npmdir = '../tool/node_modules/'; //npm模块路径
    var __coreuibaseurl = '../../coreui/js'; //相对于baseUrl
	/**
	 * requirejs优化经验说明：
	 * 1. requirejs优化，最好不要用jquery的压缩后的插件，因为会重复压缩。实在不行配合参数skipDirOptimize: true，让不在modules里面的文件不进行优化
	 */
	//requirejs用户自定义扩展配置项，非官方标准配置。为了实现智能简便配置
	/**
	 * 关于配置项路径的写法有以下重要说明：
	 * 1. mfolder里写成相对路径，基于appDir和baseUrl下
	 * 2. 如果在paths中给路径设置了别名，exclude里的key(除了all)和value都写成别名，没有则写成正常的相对路径（类似于mfolder）
	 */
	var requirejsconfig = {

		//必填项
		appDir: ".", //将appDir下的代码全部压缩复制到dir参数指定的目录中，路径指向同requirejs.config的baseUrl相同的路径
		dir: "../dist/myproject-addcoreui", //目标文件夹
		baseUrl: "js",
		lastDir: 'js', //appDir和baseUrl指向路径的最后一个文件夹名称
		mfolder: ['page'], //待打包的文件夹，默认此文件夹下的所有Js都打包。文件夹基于appDir和baseUrl下
		modules: [], //modules项初始化

		paths: {
            'text': __coreuibaseurl + '/widget/lib/require.text',
            'css': __coreuibaseurl + '/widget/lib/require-css/css',

            '$': 'empty:',
            'jquery': 'empty:',
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
            'libform': __coreuibaseurl + '/widget/ui/form',

            //当前业务公共组件库路径

            'COREUI': __coreuibaseurl + '/ui',
            'CORECOMMON': __coreuibaseurl + '/common'
        },
        shim: {
    		'migrate': ['jquery']
    	},
        map: {
        },
        /**
		* 给每个待打包的文件，指定不需要打包的文件.
		* @param {name: ['file']} 打包name文件或文件夹下的所有文件，排除对指定file列表的文件的打包
		* 配置情况举例说明如下：
		* {
			'all': ['api1'] 所有的modules不打包模块依赖api1
			'page': ['api1'] page文件夹下的所有文件都不打包模块依赖api1
		*	'page/main1': ['api1'] page/main1.js不打包模块依赖api1
		* }
		* 不需要此项，则为{}
		*
		注意：如果指定了exclude，如'page/home/main1': ['api1']，那么page/home/main1.js将会打包所有的依赖，但不包括api1及api1的依赖。
		  所以api1也应该配置加入mfolder:['third/api1']。但是如果api1和main1有相同的依赖，那么main1则不包括与api1中共同的依赖
	    *
	    *  如果shim配置项依赖项是cdn加载方式，那么build后会出错。具体原因可以参加requirejs官网“"shim"配置的优化器重要注意事项:”
	    *  解决方案有以下几种（优先级从高到低排列）：
	    * 	  1. 将shim配置项改成AMD写法，不需要shim配置
	    *     2. 设置build时不将shim配置项打包
	    *     3. shim配置项依赖项不采用cdn方式加载，并且build时默认打包
	    */
		exclude: {
		    'all':[__coreuibaseurl + '/widget/lib/require-css/normalize']
		}
	};
	var version = new Date().getTime();

	grunt.initConfig({
		pkg: grunt.file.readJSON(packdir+'package.json'),
		requirejs: {},
		//把web/html里面的页面里面js和css加上版本号
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: version
                        }
                    ]
                },
                expand: true,
                cwd: '../dist/myproject-addcoreui/section/',
                src: ['*.html'],
                dest: '../dist/myproject-addcoreui/section/'

           }
        },
        //build里的html压缩
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '../dist/myproject-addcoreui/section/',
                src: ['*.html'],
                dest: '../dist/myproject-addcoreui/section/'
            }
       },
       includes: {
            html: {
                options: {
                    includePath: './sectiontpl/include'
                },
                files: [{
                    expand: true,
                    cwd: './sectiontpl/',
                    src: '*.html',
                    dest: './section/',
                }],
            }
       },
       watch: {
            includes: {
                files: ["./sectiontpl/**/*.html"],
                tasks: ["includes:html"]
            }
       },
	   clean: {
		    options: {
		        force: true
		    },
		    nouse: ["../dist/myproject-addcoreui/css/**/*.less","../dist/myproject-addcoreui/build.txt"], //删除无用文件
            dist: ["../dist/myproject-addcoreui/*","!../dist/myproject-addcoreui/.git"]
        }
	});

	//配置requirejs的任务
	grunt.task.registerTask('addfiles','config',function(){
		/**
		 * 数组中是否存在某值
		 */
		Array.prototype.inArray = function(val){
			var result = false;
			for(var i = 0, len = this.length; i < len; i++){
				if(this[i] == val){
					result = true;
					break;
				}
			}
			return result;
		};

		/**
		 * 对于 requirejsconfig.paths别名首次匹配数据获取
		 */
		var pathskeys = []; //匹配requirejsconfig.paths中设置的别名的首次判断关键字
		if(requirejsconfig.paths){
			for(var name in requirejsconfig.paths){
				if(requirejsconfig.paths[name] != 'empty:'){
                    var matcharr = requirejsconfig.paths[name].match(/([^\/]+)(\/|\b)/);
                    if(matcharr && matcharr[1] != 'http:' && !pathskeys.inArray(matcharr[1])){
                        pathskeys.push(matcharr[1]);
                    }
                }
			}
			pathskeys = pathskeys.join('|');
		}

		/**
		 * 根据grunt file读取的完整路径返回处理后的filepath(处理包括只获取相对于baseUrl中的路径，和对于paths设置中有别名的返回别名)
		 */
		function getfilepath(filesrc){
			var filepath = filesrc.match(getfilepath.reg)[1];
			var patharr = filepath.split('/');
			if(requirejsconfig.paths && pathskeys != ''){
				var reg = new RegExp(pathskeys);
				if(reg.test(patharr[0])){ //匹配首个关键字，则继续查找是否有别名
					var change = false;
					for(var name in requirejsconfig.paths){
						var _fulpath = requirejsconfig.paths[name];
						if(_fulpath != 'empty:' && _fulpath.indexOf('http:') < 0){
							var reg1 = new RegExp(_fulpath+'\\b');
							filepath = filepath.replace(reg1,function(){change = true; return name;});
							if(change){break;}
						}
					}
				}
			}
			return filepath;
		}
		getfilepath.reg = new RegExp('.*'+requirejsconfig.lastDir+'\/(.*).js');

		/**
		* 根据文件完整相对路径filesrc，从变量requirejsconfig.exclude中获取当前文件的完整exclude配置项
		*/
		function getexclude(filesrc){
			var excludeobj = requirejsconfig.exclude;
			var result = [];
			if(excludeobj){
				//获取检测键值数组
				var keyarr = ['all'];
				var patharr = filesrc.split('/');
				var begin = patharr[0];
				keyarr.push(begin);
				for(var i = 1, len = patharr.length; i < len; i++){
					begin += '/'+patharr[i];
					keyarr.push(begin);
				}
				for(var i = 0, len = keyarr.length; i < len; i++){
				   if(excludeobj[keyarr[i]]){
					  result = result.concat(excludeobj[keyarr[i]]);
				   }
				}
			}
			return result;
		}

		//requirejs打包处理程序
		//对于mfolder中的处理
		for(var i = 0, len = requirejsconfig.mfolder.length; i < len; i++){
			var folder = requirejsconfig.mfolder[i];
			var files = grunt.file.expand(requirejsconfig.appDir+'/'+requirejsconfig.baseUrl+'/'+folder+'/**/*.js');
			files.forEach(function(file) {
				var filesrc = getfilepath(file); //获取文件相对路径
				var opt = {
					name: filesrc
				};
				requirejsconfig.modules.push(opt);
			});
		}
		//设置exclude
		for(var i = 0, len = requirejsconfig.modules.length; i < len; i++){
			var opt = requirejsconfig.modules[i];
			var path = opt.name;
			if(path){
				var exclude = getexclude(path);
				if(exclude.length > 0){
					opt.exclude = exclude;
				}
			}
			console.log(opt);
		}
		grunt.config.set('requirejs',{
			compile: { //requirejs官方标准配置
				options: {
				    appDir: requirejsconfig.appDir, //将appDir下的代码全部压缩复制到dir参数指定的目录中
					baseUrl: requirejsconfig.baseUrl,
					dir: requirejsconfig.dir, //目标文件夹
					keepBuildDir: true, //设置为false,则会先清空dir里面的文件
					optimizeCss: 'standard', //压缩css
					//skipDirOptimize: true, 默认为false。为true则除了modules里声明的文件，其他文件未进行优化和压缩，也就是说和执行requirejs优化前是一样的
					/*用正则表达式声明指定不复制到dir指定文件夹的文件。如果modules里面的文件依赖于此声明的文件，则不要使用此配置，否则会报错。原因如下：
					  requirejs打包原理：
					  1. 所有代码复制到dir；
					  2. 压缩所有代码；
					  3. 按照引用对modules里声明的文件进行打包；
					*/
					fileExclusionRegExp: /^(.git|html|sectiontpl|Gruntfile\.js)$/, //不复制到dist的文件
					//stubModules: ['api1'], //这个配置项有问题，api1压缩后正常，但是在打包后的main1.js里内容被清空define("api1",{})
					//配置文件中相关路径的配置项
					paths: requirejsconfig.paths || {},
					map: requirejsconfig.map || {},
					shim: requirejsconfig.shim || {},
					//需要打包（优化）的文件 exclude不打包此文件，但是得每个module项都得有配置
					modules: requirejsconfig.modules
				}
		  	}
		});
	});
	grunt.loadTasks(npmdir+'grunt-replace/tasks');
    grunt.loadTasks(npmdir+'grunt-contrib-htmlmin/tasks');
	grunt.loadTasks(npmdir+'grunt-contrib-clean/tasks');
	grunt.loadTasks(npmdir+'grunt-contrib-requirejs/tasks');
	grunt.loadTasks(npmdir+'grunt-includes/tasks');
    grunt.loadTasks(npmdir+'grunt-contrib-watch/tasks');
    grunt.loadTasks(npmdir+'grunt-contrib-copy/tasks');
    grunt.loadTasks(npmdir+'grunt-contrib-cssmin/tasks');

    /*******开发时运行*********/
    // 把tpl中的模板合并成真正的页面到section
    grunt.registerTask('develop',['includes','watch:includes']);
    //如果不想watch，直接合并tpl到section。则运行grunt includes:html --base=**

    /*******提测或上线执行*********/
    // 打包压缩
	grunt.registerTask('default', 'default', function(){
		grunt.task.run(['clean:dist','includes','addfiles','requirejs','replace','htmlmin','clean:nouse']);
	});
};
