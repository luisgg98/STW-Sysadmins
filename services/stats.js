const Company = require('../models/company')
const Booking = require('../models/booking')
const StatsCompanies = require('../models/stats_companies')
const StatsBookings = require('../models/stats_bookings')

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
            companies.sort(compare);
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
            durations.sort(compare);
            durations = onlyNine(durations)
            resolve(durations)

        }).catch((e) => {
            console.log(e)
            reject(e)
        })
    })

}

/**
 *
 */
async function upDateStats() {
    findBestCompanies().then((stats_companies) => {
        bestBookings().then((stats_booking) => {
            StatsBookings.deleteMany({}).then(() => {
                StatsCompanies.deleteMany({}).then(() => {
                    StatsCompanies.insertMany(stats_companies).then(() => {

                        StatsBookings.insertMany(stats_booking).then(() => {
                            console.log("Success updating stats")
                        }).catch((e) => {
                            console.log("Error saving new bookings stats")
                            console.log(e)
                        })
                    }).catch((e) => {
                        console.log("Error saving new companies stats")
                        console.log(e)
                    })


                }).catch((e) => {
                    console.log("Error deleting  companies old stats")
                    console.log(e)
                })
            }).catch((e) => {
                console.log("Error deleting booking old stats")
                console.log(e)
            })
        }).catch((e) => {
            console.log("Error updating booking  stats")
            console.log(e)
        })
    }).catch((e) => {
        console.log("Error updating company  stats")
        console.log(e)
    })
}


module.exports.upDateStats = upDateStats