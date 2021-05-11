/* istanbul ignore file */
const createError = require('http-errors');
const express = require('express');
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
const passport = require('passport');
const path = require('path');
// Fav icon, required to avoid an error in terminal
const favicon = require('serve-favicon');


require('./config/database');
require('./config/passport');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
// This allows us to do cron scheduled activities
const cron = require('node-cron');
const ta=require('./services/transparency_aragon')
const app = express();

// Add  fav icon
app.use(favicon(path.join(__dirname,'icon','favicon.ico')));
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

const loadDistrict =require('./scripts/loadDistrict');

//  In order not to duplicate the information about the
// health zones is required to delete first the whole collection
loadDistrict.loadCouncilInfo();

// Schedule tasks to be run on the server.
// Two in the morning '*/25 * * * *'
// Due to covid most business close at the hour
cron.schedule('*/25 * * * *', async function() {
  console.log('Starting to update Health Zone information');
  await ta.getCasesFile().then(r => {
    console.log('Information updated working correctly');
  }).catch((error) => {
    console.log('Updating error, something goes wrong');
    console.log('Error: '+ error );
  });
});

const { exec } = require('child_process');
// Updating our keys
cron.schedule('11 23 * * *', async function() {
  exec('node ./scripts/getKeys.js ', (err, stdout, stderr) => {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

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
