const express = require('express')
const StatsController = require('../controllers/stats/access')
const router = express.Router()


router.get("/", StatsController.getStatsBookings);
module.exports = router;