const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const companiesRouter = require('./companies')
const healthZoneRouter = require('./healthzone')
const adminRouter = require('./admin')
const captchaRouter = require('./captcha')
const StatsBRouter = require('./statsBooking')
const StatsCRouter = require('./statsCompany')
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


/**
 *
 */
router.use('/statsBooking', StatsBRouter)


/**
 *
 */
router.use('/statsCompanies', StatsCRouter)

module.exports = router;
