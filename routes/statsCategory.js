const express = require('express')
const StatsController = require('../controllers/stats/access')
const router = express.Router()


router.get("/", StatsController.getStatsCategory);
module.exports = router;