const express = require('express')
const ControllerUser = require('../controllers/user/access')
const ControllerBooking = require('../controllers/user/booking')
const router = express.Router()
const jwt_login_strategy = require('../config/passport');

router.get("/", ControllerUser.getAllUsers)

/*
 */
router.post("/", ControllerUser.register)
/*
    Returns the info about an user
 */
router.post("/login", ControllerUser.login)

/*
 */
router.get("/:phone", ControllerUser.fetchUser)

router.patch("/:id", jwt_login_strategy.authenticate, ControllerUser.update);

/*
 * Deletes de user with phone number :phone
 */
router.delete("/:id", jwt_login_strategy.authenticate, ControllerUser.delete)

router.post("/:id/bookings", ControllerBooking.create_booking)
router.get("/:id/bookings", ControllerBooking.get_bookings)
router.patch("/:id/bookings/:booking_id", jwt_login_strategy.authenticate, ControllerBooking.update_bookings)
router.delete("/:id/bookings/:booking_id", jwt_login_strategy.authenticate, ControllerBooking.delete_booking)

module.exports = router;