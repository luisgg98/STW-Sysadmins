const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const companiesRouter = require('./companies')
const healthZoneRouter = require('./healthzone')
const adminRouter = require('./admin')
const captchaRouter = require('./captcha')
const accessKeyRouter = require('./accessKey')
const notificationRouter = require('./notifications')
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
router.use('/accesskey',accessKeyRouter)

/**
 *
 */
router.use('/notifications',notificationRouter)

module.exports = router;
