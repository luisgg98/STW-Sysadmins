var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
// Necessary to communicate to the frontend
const cors = require('cors')
//Necessary for the use of JWT
// Authentication
const passport = require('passport')
// Link to the swagger configuration
const swaggerSpec = require('./config/swagger')
require('./config/database');

//Loading the models
//require('./models/*')

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

//Passport is required to authentication
//require('./config/passport')(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

// Using morgan, module for logging
app.use(morgan('dev'));
//Format indicates how we want to see the logging

// Allow nodejs to use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());

// Necessary to use the interface of Swagger
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// server swagger
app.get('/swagger.json',function (req,res) {
  res.setHeader('Content-Type','application/json');
  res.send(swaggerSpec);
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
