var express = require('express');
const User = require('../models/user')
var router = express.Router();

var usersRouter = require('./apiContent/users');

router.use('/users',usersRouter);

module.exports = router;
