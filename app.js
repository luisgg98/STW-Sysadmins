const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// Necessary to communicate to the frontend
const cors = require('cors')
// Link to the swagger configuration
const swaggerUi = require('swagger-ui-express');
let YAML=require('yamljs');
const swaggerDocument = YAML.load('./config/swagger.yaml');
//Necessary for the use of JWT
// Authentication
const passport = require('passport')

require('./config/database');
require('./config/passport');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

//Passport is required to authentication
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
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
