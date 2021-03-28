const express = require('express')
const User = require('../models/user')
const Company = require('../models/company')
const router = express.Router()

router.get("/", async (req, res) => {
    let users = await User.find()
    users = users + await Company.find()
    res.send(users)
})

module.exports = router
