const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const companiesRouter = require('./companies')
const healthZoneRouter = require('./healthzone')

router.use('/users', usersRouter);
router.use('/companies', companiesRouter);
router.use('/healthzone',healthZoneRouter);

module.exports = router;
