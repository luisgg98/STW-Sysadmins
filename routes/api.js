const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const companiesRouter = require('./companies')
const healthZoneRouter = require('./healthzone')
const adminRouter = require('./admin')
const captchaRouter = require('./captcha')
const webpushRouter = require('./webpush')
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
router.use('/healthzone',healthZoneRouter)

/**
 *
 */
router.use('/admin', adminRouter)

/**
 *
 */
router.use('/captcha',captchaRouter)

/**
 *
 */
router.use('/webpush',webpushRouter)

module.exports = router;
