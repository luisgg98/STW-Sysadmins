const StatsBooking = require('../../models/stats_bookings')
const StatsCompany = require('../../models/stats_companies')
const StatsCategory = require('../../models/stats_category')
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getStatsBookings = async (req, res) => {
    StatsBooking.find({}).then((stats) => {
        res.status(200).send(stats);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({error: "Internal server error,something was wrong getting the stats"});
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getStatsCompanies = async (req, res) => {
    StatsCompany.find({}).then((stats) => {
        res.status(200).send(stats);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({error: "Internal server error,something was wrong getting the stats"});
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getStatsCategory = async (req, res) => {
    StatsCategory.find({}).then((stats) => {
        res.status(200).send(stats);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({error: "Internal server error,something was wrong getting the stats"});
    })

}

exports.getStatsBookings = getStatsBookings
exports.getStatsCompanies = getStatsCompanies
exports.getStatsCategory = getStatsCategory