#介绍
模板框架用的是 Handlebars
为了支持Handlebars 需要用到express3-handlebars包

#运行
npm install
node meadowlark.js

#history
* 添加QA（页面测试和跨页测试）
    1,页面测试
      1,添加测试框架 mocha
      2,提供assert函数-->添加 chai 断言库
      3,http://localhost:3000 会加载首页
        http://localhost:3000/?test=1 回加载包含测试的首页
    2,跨页测试
      1,添加无头浏览器 zombie
    3,Grunt实现自动化
      1,另起终端 输入 grunt 命令

