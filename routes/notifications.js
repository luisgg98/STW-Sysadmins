const express = require('express')
const SubscriptionController = require('../controllers/webpush/subscription')
const router = express.Router()

/**
 * Creates a subscription
 */
router.post("/", SubscriptionController.create_subscription)

module.exports = router;
