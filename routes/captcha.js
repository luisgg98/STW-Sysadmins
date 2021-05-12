const express = require('express')
const getKeyController = require('../controllers/captcha/captchaController')
const router = express.Router()
/**
 *
 */
router.get('/', getKeyController.getKey);

module.exports = router;