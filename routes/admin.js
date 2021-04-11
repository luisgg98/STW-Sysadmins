const express = require('express')
const ControllerUser = require('../controllers/admin/access')
const router = express.Router()

/*
    Login admin user
 */
router.post("/login", ControllerUser.login)
router.post("/register", ControllerUser.register)
module.exports = router;