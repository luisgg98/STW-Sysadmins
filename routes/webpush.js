const express = require('express')
const AccessKey = require('../controllers/webpush/accesskey')
const router = express.Router()
/*
    Get public key
 */
router.get("/", AccessKey.getWebpush)
module.exports = router;