var bodyParser = require('body-parser');
var formidable = require('formidable');
var express = require('express');
var app = express();
// 设置handlebars 视图引擎
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 检测查询字符串中test=1
app.use(function(req,res,next){
  res.locals.showTests = app.get('env') !== app.get('production') && req.query.test === '1';
  next();
});

// 链入路由
require('./routes.js')(app);

app.listen(app.get('port'),function(){
  console.log(' express started on http://localhost:'+ app.get('port'));
});


