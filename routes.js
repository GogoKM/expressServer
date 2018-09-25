var fortune = require('./lib/fortune.js');

module.exports = function(app){
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
  app.get('/newsletter',function(req,res){
    res.render('newsletter',{csrf: 'CSFR token goes here'});
  });
  app.post('/process',function(req,res){
    console.log('form (from querystring):' + req.query.form);
    console.log('csrf token (from hidden form field):' + req.body._csrf);
    console.log('name token (from visible form field):' + req.body.name);
    console.log('email token (from visible form field):' + req.body.email);
    res.redirect(303,'/thank-you');
  });
  app.get('/contest/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contest/vacation-photo',{
      year: now.getFullYear(), month: now.getMonth()
    });
  });
  app.post('/contest/vacation-photo/:year/:month',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
      if(err) return res.redirect(303,'/error');
      console.log('received fields:');
      console.log(fields);
      console.log('received files:');
      console.log(files);
      res.redirect(303,'/thank-you');
    });
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
};