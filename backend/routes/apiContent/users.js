const express = require('express')
const ControllerUser = require('../../controllers/user/access')
const router = express.Router()
//const passport = require('passport');
//const accessController = require('../../controllers/user/access');

/***
 * TODO USING THIS CODE WE CAN VALIDATE THE JWT TOKEN THE FRONTEND SEND TO US
 * passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
}
 */
router.get('/protected', (req, res, next) => {
    // FOUND ON THE INTERNET, DON'T MIND ABOUT IT
});

/*
    Creates a new user
 */
router.post("/register", ControllerUser.register)

/*
    Returns the info about an user
 */
router.post("/login", ControllerUser.login)

router.patch("/update/:phone", ControllerUser.update)

/*
 * Deletes de user with phone number :phone
 */
router.delete("/delete/:phone", ControllerUser.delete)

module.exports = router;