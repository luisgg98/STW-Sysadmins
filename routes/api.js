const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const companiesRouter = require('./companies')
const healthZoneRouter = require('./healthzone')
const adminRouter = require('./admin')
const captchaRouter = require('./captcha')
/**
 *
 */
router.use('/users', usersRouter)

/**
 *
 */
router.use('/companies', companiesRouter)

/**
 *
 */
router.use('/healthzone', healthZoneRouter)

/**
 *
 */
router.use('/admin', adminRouter)

/**
 *
 */
router.use('/captcha', captchaRouter)

module.exports = router;
