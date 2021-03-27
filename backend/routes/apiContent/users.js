const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const passport = require('passport');
const accessController = require('../../controllers/user/access');

/***
 * TODO USING THIS CODE WE CAN VALIDATE THE JWT TOKEN THE FRONTEND SEND TO US
 * passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
}
 */
router.get('/protected', (req, res, next) => {
    // FOUND ON THE INTERNET, DON'T MIND ABOUT IT
});

// TODO COMPLETE WITH A FUNCTION CREATED ON THE CONTROLLERS
router.post('/login', function(req, res, next){});

// TODO COMPLETE WITH A FUNCTION CREATED ON THE CONTROLLERS
router.post('/register', function(req, res, next){});

module.exports = router;