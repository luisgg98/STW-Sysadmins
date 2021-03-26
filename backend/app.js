var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var swaggerJSDoc = require('swagger-jsdoc');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

var swaggerport = (process.env.PORT || '3000');
var nodeSwagger = `localhost:${swaggerport}`;

var swaggerDefinition = {
  info:{
    title:' Zitations web application API',
    version:'1.0.0',
    description:'API for the web application Zitations'
  },
  host:nodeSwagger,
  basePath:'/api/', //where the services are
  schemes:['http','https'] //working on http, in heroku we have to add https
};

var options = {
  swaggerDefinition:swaggerDefinition,
  // path to the API docs
  apis:['./routes/*']

};

// initialize swagger jsdoc
var swaggerSpec = swaggerJSDoc(options);


// server swagger
app.get('/swagger.json',function (req,res) {
  res.setHeader('Content-Type','application/json');
  res.send(swaggerSpec);
});

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'pug');

// Using morgan, module for logging
app.use(morgan('dev'));
//Format indicates how we want to see the logging

// Allow nodejs to use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Necessary to use the interface of Swagger
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
