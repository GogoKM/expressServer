var fortune = require('./lib/fortune.js');
var express = require('express');
var app = express();
// 设置handlebars 视图引擎
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// 检测查询字符串中test=1
app.use(function(req,res,next){
  res.locals.showTests = app.get('env') !== app.get('production') && req.query.test === '1';
  next();
});
// 添加路由
app.get('/',function(req,res){
  res.render('home');
});
app.get('/about',function(req,res){
  res.render('about',{
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
});
app.get('/tours/hood-river',function(req,res){
  res.render('tours/hood-river');
});
app.get('/tours/request-group-rate',function(req,res){
  res.render('tours/request-group-rate');
});
// 404
app.use(function(req,res){
  res.status(404);
  res.render('404');
});
// 500
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('404');
});
app.listen(app.get('port'),function(){
  console.log(' express started on http://localhost:'+ app.get('port'));
});
