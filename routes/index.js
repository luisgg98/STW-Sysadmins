const express = require('express')
const User = require('../models/user')
const Company = require('../models/company')
const router = express.Router()

/**
 *
 */
router.get("/", async (req, res) => {
    let message = {
        "message": "I am a useless teapot"
    }
    res.status(418).send(message)
})

module.exports = router
