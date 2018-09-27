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

// routes
require('./routes.js')(app);

// // apis
// var Attraction = require('./models/attraction.js');
// var rest = require('connect-rest');

// rest.get('/attractions', function(req, content, cb){
//   Attraction.find({ approved: true }, function(err, attractions){
//       if(err) return cb({ error: 'Internal error.' });
//       cb(null, attractions.map(function(a){
//           return {
//               name: a.name,
//               description: a.description,
//               location: a.location,
//           };
//       }));
//   });
// });

// rest.post('/attraction', function(req, content, cb){
//   var a = new Attraction({
//       name: req.body.name,
//       description: req.body.description,
//       location: { lat: req.body.lat, lng: req.body.lng },
//       history: {
//           event: 'created',
//           email: req.body.email,
//           date: new Date(),
//       },
//       approved: false,
//   });
//   a.save(function(err, a){
//       if(err) return cb({ error: 'Unable to add attraction.' });
//       cb(null, { id: a._id });
//   }); 
// });

// rest.get('/attraction/:id', function(req, content, cb){
//   Attraction.findById(req.params.id, function(err, a){
//       if(err) return cb({ error: 'Unable to retrieve attraction.' });
//       cb(null, { 
//           name: a.name,
//           description: a.description,
//           location: a.location,
//       });
//   });
// });

// // API configuration
// var apiOptions = {
//   context: '/',
//   domain: require('domain').create(),
// };

// apiOptions.domain.on('error', function(err){
//   console.log('API domain error.\n', err.stack);
//   setTimeout(function(){
//       console.log('Server shutting down after API domain error.');
//       process.exit(1);
//   }, 5000);
//   server.close();
//   var worker = require('cluster').worker;
//   if(worker) worker.disconnect();
// });

// // link API into pipeline
// app.use(vhost('api.*', rest.rester(apiOptions)));


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


