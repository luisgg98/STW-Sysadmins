const express = require('express')
const ControllerUser = require('../controllers/admin/access')
const router = express.Router()
/*
    Register admin user
 */
router.post("/", ControllerUser.register)
module.exports = router;