let express = require('express');
let app = express();
// 设置handlebars 视图引擎
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);

let fortunes = [
  'conquer your',
  'river need',
  'do not fear',
  'you will',
  'whenever possible',
]

app.use(express.static(__dirname + '/public'));
// 添加路由
app.get('/',function(req,res){
  res.render('home');
});
app.get('/about',function(req,res){
  let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about',{fortune: randomFortune});
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
})
app.listen(app.get('port'),function(){
  console.log(' express started on http://localhost:'+ app.get('port'));
})
