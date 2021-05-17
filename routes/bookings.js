const express = require('express')
const ControllerBooking = require('../controllers/user/booking')
const router = express.Router()

/*
 */
router.get("/:id", ControllerBooking.fetchBooking)


module.exports = router