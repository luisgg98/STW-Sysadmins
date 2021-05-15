const Service = require('../models/service')
const Booking = require('../models/booking')
const Opinion = require('../models/opinions')
const Vote = require('../models/vote')

/**
 *
 * @param company_nif
 * @returns {Promise<*>}
 */
async function deleteService(company_nif) {
    return new Promise((resolve, reject) => {
        Booking.deleteMany({company_nif: company_nif}).then(() => {
            Service.deleteMany({company: company_nif}).then(() => {
                Opinion.find({company_nif: company_nif}).then(async (opinions) => {
                    for (let i = 0; i < opinions.length; i++) {
                        await deleteVotes(opinions[i]);
                    }
                    Opinion.deleteMany({company_nif: company_nif}).then(() => {
                        resolve("Success deleting all opinions of a company")
                    }).catch((e) => {
                        console.log("ERROR while deleting Opinions of a company")
                        reject(e)
                    })
                }).catch((e) => {
                    console.log("ERROR while finding Opinions of a company")
                    reject(e)
                })
            }).catch((e) => {
                console.log("ERROR while deleting Services of a company")
                reject(e)
            })
        }).catch((e) => {
            console.log("ERROR while deleting bookings of a company")
            reject(e)
        })
    })
}

/**
 *
 * @param opinion_id
 * @returns {Promise<void>}
 */
async function deleteVotes(opinion_id) {
    Vote.deleteMany({opinion_id: opinion_id}).catch((e) => {
        console.log("Error while deleting votes for opinion " + opinion_id)
        console.log(e)
    });

}

/**
 *
 * @param user_id
 * @returns {Promise<*>}
 */
async function deletingOpinions(user_id) {
    return new Promise((resolve, reject) => {
        Vote.deleteMany({user_id: user_id})
            .then(() => {
                Opinion.deleteMany({user_id: user_id}).then(() => {
                    Booking.deleteMany({user_id: user_id}).then(() => {
                        resolve("Success deleting User Opinions")
                    }).catch((e) => {
                        console.log("Error while deleting Bookings of user " + user_id)
                        reject(e)
                    });

                }).catch((e) => {
                    console.log("Error while deleting Opinions of user " + user_id)
                    reject(e)
                });
            })
            .catch((e) => {
                console.log("Error while deleting votes for user " + user_id)
                reject(e)
            });

    })

}

/**
 *
 * @param service_id
 * @returns {Promise<*>}
 */
async function deleteBookings(service_id) {
    return new Promise((resolve, reject) => {
        Booking.deleteMany({service_id: service_id}).then(() => {
            resolve("Success deleting all bookings of a service")
        }).catch((e) => {
            console.log("Error while deleting bookings of service " + service_id)
            console.log(e)
            reject(e)
        })
    });
}


module.exports.deleteBookings = deleteBookings;
module.exports.deleteService = deleteService;
module.exports.deletingOpinions = deletingOpinions;