/* istanbul ignore file */
const mongoose = require('mongoose');

// Define a database connection string
//const uri = process.env.MONGODB_URI;
//TODO CHANGE DEPENDING ON WHERE IS DEPLOYED

const database = process.env.DOCKER || `localhost`;
let mongo_uri = `mongodb://${database}/zitation`;
const dbURI = process.env.MONGODB_URI || mongo_uri;

// Opened a Mongoose connection at application startup
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Monitored the Mongoose connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

require('../models/user');
require('../models/company');
require('../models/healthzone');
require('../models/vote');
require('../models/opinions');

// Monitored some Node process events so that we can close the Mongoose connection when the application ends
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});