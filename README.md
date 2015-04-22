# baiduCom
部署方法

API接口可以直接使用nginx反向代理，请求相对路径

npm install 安装前端库依赖

template/jade/里面写jade代码，使用gulp jade编译jade脚本

static/public/js-modify/书写js代码，使用gulp js-observe编译出未压缩版js代码，使用gulp js编译出uglify版js代码

static/public/css-modify/书写sass代码，使用gulp sass编译出压缩版css代码

项目里所有跳转链接后缀名改写为.do如/mob/index.do，开发时可以在nginx中rewrite掉

使用bower安装包依赖，从bower.json安装

提交代码时，注意jade文件的头include的header文件为header.polish.jade，然后重新编译提交代码
