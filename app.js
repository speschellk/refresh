
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var home = require('./routes/home');
var profile = require('./routes/profile');
var http = require('http');
var path = require('path');
var exphbs = require('express3-handlebars');
var app = express();
var cons = require('consolidate');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dqoghmerz', 
  api_key: '584839643982217', 
  api_secret: 'vLp3SltT9L9TkQGbhiZwNUOytAw' 
});
// all environments
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/home', home.index);
app.get('/profile', profile.getUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
