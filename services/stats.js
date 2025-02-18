const Company = require('../models/company')
const Booking = require('../models/booking')
const StatsCompanies = require('../models/stats_companies')
const StatsBookings = require('../models/stats_bookings')
const StatsCategory = require('../models/stats_category')

/**
 *
 * @param a
 * @param b
 * @returns {number}
 */
function compare(a, b) {
    if (a.bookings < b.bookings) {
        return -1;
    }
    if (a.bookings > b.bookings) {
        return 1;
    }
    return 0;
}

/**
 *
 * @param list
 * @returns {*}
 */
function onlyNine(list) {
    list.sort(compare);
    if (list.length > 9) {
        let tmp_list = []
        for (let i = 0; i < 9; i++) {
            tmp_list[i] = list[i]
        }
        list = tmp_list
    }
    return list
}

/**
 *
 * @returns {Promise<*>}
 */
async function findBestCompanies() {
    return new Promise((resolve, reject) => {
        Company.find({bookings: {$gt: 0}}).then((companies) => {
            companies = onlyNine(companies)
            let new_companies = []
            for (let i = 0; i < companies.length; i++) {
                let comp = {
                    "name": companies[i].name,
                    "nif": companies[i].nif,
                    "bookings": companies[i].bookings
                }
                new_companies.push(comp)
            }
            resolve(new_companies)
            /* istanbul ignore next */
        }).catch((e) => {
            console.log(e)
            reject(e)
        })
    })
}

/**
 *
 * @returns {Promise<*>}
 */
async function bestBookings() {
    return new Promise((resolve, reject) => {
        Booking.find({}).then((bookings) => {
            let groups = bookings.reduce((groups, item) => {
                const group = (groups[item.time] || []);
                group.push(item);
                groups[item.time] = group;
                return groups;
            }, {});

            let durations = []
            for (const [key, value] of Object.entries(groups)) {
                let new_duration = {
                    'time': key,
                    'bookings': value.length
                }
                durations.push(new_duration)
            }
            durations = onlyNine(durations)
            resolve(durations)
            /* istanbul ignore next */
        }).catch((e) => {
            console.log(e)
            reject(e)
        })
    })
}


/**
 *
 */
async function bestCategories() {
    return new Promise((resolve, reject) => {
        Company.find({}).then((companies) => {
            let groups = companies.reduce((groups, item) => {
                const group = (groups[item.category] || []);
                group.push(item);
                groups[item.category] = group;
                return groups;
            }, {});
            let categories = []
            /* istanbul ignore next */
            for (const [key, value] of Object.entries(groups)) {
                let total_bookings = 0
                for (let i = 0; i < value.length; i++) {
                    total_bookings = total_bookings + value[i].bookings
                }
                let new_category = {
                    'category': key,
                    'bookings': total_bookings
                }
                categories.push(new_category)
            }
            categories = onlyNine(categories)
            resolve(categories)
            /* istanbul ignore next */
        }).catch((e) => {
            console.log(e)
            reject(e)
        })

    })
}

/**
 *
 * @param message
 * @param e
 */
function errorMessage(message, e) {
    console.log(message)
    console.log(e)
}

/**
 *
 */

/* istanbul ignore next */
async function upDateStats() {
    bestCategories().then((stats_category) => {
        findBestCompanies().then((stats_companies) => {
            bestBookings().then((stats_booking) => {
                StatsCategory.deleteMany({}).then(() => {
                    StatsBookings.deleteMany({}).then(() => {
                        StatsCompanies.deleteMany({}).then(() => {
                            StatsCompanies.insertMany(stats_companies).then(() => {
                                StatsBookings.insertMany(stats_booking).then(() => {
                                    StatsCategory.insertMany(stats_category).then(() => {
                                        console.log("Success updating stats")
                                    }).catch((e) => {
                                        errorMessage("Error saving new category stats", e)
                                    })
                                }).catch((e) => {
                                    errorMessage("Error saving new bookings stats", e)
                                })
                            }).catch((e) => {
                                errorMessage("Error saving new companies stats", e)
                            })
                        }).catch((e) => {
                            errorMessage("Error deleting  companies old stats", e)
                        })
                    }).catch((e) => {
                        errorMessage("Error deleting booking old stats", e)
                    })
                }).catch((e) => {
                    errorMessage("Error while deleting old category stats", e)
                })
            }).catch((e) => {
                errorMessage("Error updating booking  stats", e)
            })
        }).catch((e) => {
            errorMessage("Error updating company  stats", e)
        })
    }).catch((e) => {
        errorMessage("Error updating category stats", e)
    })
}

module.exports.upDateStats = upDateStats