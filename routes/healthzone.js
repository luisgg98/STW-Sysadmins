const express = require('express')
const ControllerHealthZone = require('../controllers/healthzone/access')
const router = express.Router()

/*
    Get all Health Zone available
 */
router.get("/", ControllerHealthZone.allHealthzone);

module.exports = router