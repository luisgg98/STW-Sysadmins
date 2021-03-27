const express = require('express')
const router = express.Router()

const usersRouter = require('./apiContent/users')
const companiesRouter = require('./apiContent/companies')

router.use('/users', usersRouter);
router.use('/companies', companiesRouter)

module.exports = router;
