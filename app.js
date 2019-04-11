var dotenv = require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

//var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'app_server' , 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/nav', express.static(__dirname + '/app_client/nav'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

//app.use('/', routes);
app.use('/api', routesApi);

// error handlers
// Catch unauthorized errors
app.use(function (err, req, res, next) {
  if(err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/*
  THINGS TO DO IN BITNAMI AFTER FINISHING LOCALLY:
      - npm install jsonwebtoken --save (pg 358)
      - create JWT_SECRET data (pg 359)
      - npm install dotenv --save (pg 359)
      - npm install passport --save (pg 360)
      - npm install passport-local --save (pg 360)
      - npm install express-jwt --save (pg 368)
*/