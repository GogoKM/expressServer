module.exports = function(grunt) {
  // 加载插件
  ['grunt-cafe-mocha',
  'grunt-contrib-jshint',
  'grunt-exec'].forEach(function(task){
    grunt.loadNpmTasks(task);
  });
  // 配置插件
  grunt.initConfig({
    cafemocha:{
      all: {src: 'qa/test-*.js',options:{ui:'tdd'},}
    },
    jshint: {
      app:['meadowlark.js','public/js/**/*.js','lib/**/*.js'],
      qa: ['Gruntfile.js','public/qa/**/*.js','qa/**/*.js'],
    },
  });
  // 注册任务
  grunt.registerTask('default',['cafemocha','jshint']);
};