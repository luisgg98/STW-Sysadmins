const express = require('express');
const User = require('../../models/user')
const router = express.Router();
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

// TODO Move the code to controllers

/*
    Returns the info about an user
 */
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.body.phone })
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})

/*
    Creates a new user
 */
router.post("/register", async (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone : req.body.phone,
        email: req.body.email,
        password: req.body.password
    })
    await user.save()
    res.send(user)
})

router.patch("/update/:phone", async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.params.phone })

        if (req.body.first_name) {
            user.first_name = req.body.first_name
        }
        if (req.body.last_name) {
            user.last_name = req.body.last_name
        }
        if (req.body.phone) {
            user.phone = req.body.phone
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.password) {
            user.password = req.body.password
        }

        await user.save()
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
})

/*
 * Deletes de user with phone number :phone
 */
router.delete("/delete/:phone", async (req, res) => {
    try {
        await User.deleteOne({ phone: req.params.phone })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})

module.exports = router;