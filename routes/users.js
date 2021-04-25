const express = require('express')
const ControllerUser = require('../controllers/user/access')
const router = express.Router()
const jwt_login_strategy= require('../config/passport');

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

router.patch("/:id",jwt_login_strategy.authenticate,ControllerUser.update);

/*
 * Deletes de user with phone number :phone
 */
router.delete("/:id",jwt_login_strategy.authenticate, ControllerUser.delete)

module.exports = router;