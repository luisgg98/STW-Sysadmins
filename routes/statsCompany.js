const express = require('express')
const StatsController = require('../controllers/stats/access')
const router = express.Router()


router.get("/", StatsController.getStatsCompanies);
module.exports = router;