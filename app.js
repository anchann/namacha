var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , namacha = require('./dist/lib.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.compress());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.post('/scrape', namacha.routes.scrape);
app.get(namacha.config.get('basePath'), namacha.routes.serve);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
