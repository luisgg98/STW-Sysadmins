const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const companiesRouter = require('./companies')

router.use('/users', usersRouter);
router.use('/companies', companiesRouter)

module.exports = router;
