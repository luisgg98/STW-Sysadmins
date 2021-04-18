const express = require('express')
const ControllerUser = require('../controllers/user/access')
const router = express.Router()
const passport = require('passport');

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

router.patch("/:id",passport.authenticate('jwt',{session:false}),ControllerUser.update);

/*
 * Deletes de user with phone number :phone
 */
router.delete("/:id",passport.authenticate('jwt',{session:false}), ControllerUser.delete)

module.exports = router;