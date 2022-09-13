var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var authRouter = require('./routes/auth');

var app = express();

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:4200/', 
    'http://localhost:4200',
    'http://localhost:8100',
    'http://cmms-mabini.com',
    'capacitor://localhost',
    'http://localhost'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.status(401)
  }

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, AuthorizationToken'); 
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//API Endpoints
app.use('/', authRouter);

// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
