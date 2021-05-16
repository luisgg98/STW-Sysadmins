const Booking = require('../../models/booking')
const Service = require('../../models/service')
const User = require('../../models/user')
const Company = require('../../models/company')
const {sendCancellation} = require("../../services/email");
const {sendReminder} = require("../../services/email");

// /users/{ID}/bookings
// GET (get all bookings or filter by id
// POST (add new booking)
// PUT (modify a booking)
// DELETE (delete a booking)

/**
 * @booking_time formato "hh:mm[AM|PM]"
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let create_booking = async (req, res) => {
    Service.findOne({_id: req.body.service}).then((service) => {
        //Check if user exists
        User.findOne({_id: req.params.id}).then((user) => {
            const booking = new Booking({
                user_id: req.params.id,
                service_id: req.body.service,
                company_nif: service.company,
                date: req.body.date,
                time: req.body.time
            })
            Company.findOne({nif: service.company}).then((company) => {
                company.bookings = parseInt(company.bookings) + 1;
                company.save()
                    .then(async () => {
                        await booking.save()
                            .catch((e) => {
                                res.status(405).send({error: "It was no possible to book it, something is missing"})
                                console.log("It was no possible to book it, something is missing")
                            });
                        res.status(201).send(booking)
                        // Send email
                        sendReminder(user, booking, company);
                    })
                    .catch((e) => {
                        res.status(404).send({error: "Company was not found"})
                        console.log("Company was not found")
                    });
            }).catch((e) => {
                res.status(405).send({error: "Wrong body format, check docs for further info /api-docs, Company not found"})
            })
        }).catch((e) => {
            res.status(405).send({error: "Wrong body format, check docs for further info /api-docs, user not found"})
        })
    }).catch((e) => {
        res.status(405).send({error: "Wrong body format, check docs for further info /api-docs, service not found"})
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let get_bookings = async (req, res) => {
    try {
        console.log(req)
        // if the url contains a query, just search for one booking
        if (req.query.id) {
            let id = req.query.id
            Booking.findOne({_id: id}).then((booking) => {
                if (booking) {
                    res.status(200).send(booking)
                } else {
                    res.status(404).send({error: "Booking not found"})
                }
            }).catch((e) => {
                res.status(405).send({error: "Wrong id format"})
                console.log("Error: " + e)
            })
        } else if (req.query.date) {
            Booking.find({user_id: req.params.id, date: req.query.date}).then((bookings) => {
                res.status(200).send(bookings)
            }).catch((e) => {
                res.status(405).send({error: "Wrong format for Date or user_id"})
            })
        } else {
            // Fetch all bookings
            Booking.find({user_id: req.params.id}).then((bookings) => {
                if (bookings) {
                    res.status(200).send(bookings)
                } else {
                    res.status(404).send({error: "No bookings were found"})
                }
            }).catch((e) => {
                res.status(405).send({error: "Wrong user_format"})
                console.log("Error: " + e)
            })
        }
    } catch {
        res.status(500).send({error: "Internal server error"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let update_bookings = async (req, res) => {
    Booking.findOne({_id: req.params.booking_id}).then((booking) => {
        if (booking) {
            if (req.body.date) {
                booking.date = req.body.date
            }
            if (req.body.time) {
                booking.time = req.body.time
            }

            User.findOne({_id: booking.user_id}).then((user) => {
                if (user) {
                    Company.findOne({nif: booking.company_nif}).then((company) => {
                        if (company) {
                            booking.save()
                                .then(() => {
                                    res.status(200).send(booking)
                                    // Send email
                                    sendReminder(user, booking, company);
                                })
                                .catch((e) => {
                                    res.status(405)
                                    res.send({error: "Wrong json format, check docs for further info /api-doc"})
                                    console.log("Error: " + e)
                                })
                        }
                    }).catch((e) => {
                        res.status(405).send({error: "Wrong user_id format"})
                        console.log(e)
                    })
                }
            }).catch((e) => {
                res.status(405).send({error: "Wrong user_id format"})
                console.log("Error: " + e)
            })
        } else {
            res.status(404)
            res.send({error: "Booking not found"})
        }
    }).catch((e) => {
        res.status(405).send({error: "Wrong booking_id format"})
        console.log("Error: " + e)
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let delete_booking = async (req, res) => {
    Booking.findOneAndDelete({_id: req.params.booking_id}).then((booking) => {
        User.findOne({_id: booking.user_id}).then((user) => {
            Company.findOne({nif: booking.company_nif}).then((company) => {
                company.bookings -= 1
                company.save().then(() => {
                    sendCancellation(user, booking, company);
                    res.status(204).send()
                }).catch((e) => {
                    res.status(405).send({error: "Wrong json format, check docs for further info /api-doc, ERROR SAVING"})
                    console.log(e)
                })
            }).catch((e) => {
                res.status(405).send({error: "Wrong json format, check docs for further info /api-doc, COMPANY NOT FOUND"})
            })

        }).catch((e) => {
            res.status(405).send({error: "Wrong json format, check docs for further info /api-doc, USER NOT FOUND"})
        })
    }).catch((e) => {
        res.status(405).send({error: "Wrong booking id format,BOOKING NOT FOUND"})
        console.log(e)
    })
}

/////////////////////////////////////////////////////
//             BOOKINGS FROM SERVICE               //
/////////////////////////////////////////////////////
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let services_bookings = async (req, res) => {
    if (req.query.date && req.query.time) {
        Booking.find({
            service_id: req.params.id,
            date: req.query.date,
            time: req.query.time
        }).then((booking) => {
            Company.findOne({nif: req.params.nif}).then((company) => {
                let capacity = company.capacity + booking.length
                let result = {}
                result.capacity = capacity
                result.bookings = booking
                res.send(result)
            }).catch((e) => {
                res.status(405).send("Wrong json format, check docs for further info /api-doc")
                console.log("Error: " + e)
            })
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error: " + e)
        })
    } else if (req.query.date) {
        Booking.find({service_id: req.params.id, date: req.query.date}).then((booking) => {
            res.send(booking)
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error: " + e)
        })
    } else if (req.query.time) {
        Booking.find({service_id: req.params.id, time: req.query.time}).then((booking) => {
            res.send(booking)
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error: " + e)
        })
    } else {
        Booking.find({service_id: req.params.id}).then((booking) => {
            res.status(200).send(booking)
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error: " + e)
        })
    }
}

/////////////////////////////////////////////////////
//             BOOKINGS FROM COMPANY               //
/////////////////////////////////////////////////////
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let company_bookings = async (req, res) => {
    if (req.query.date && req.query.time) {
        Booking.find({
            company_nif: req.params.nif,
            date: req.query.date,
            time: req.query.time
        }).then((booking) => {
            Company.findOne({nif: req.params.nif}).then((company) => {
                // Get remaining places in that date and time
                let remaining_capacity = company.capacity - booking.length
                let result = {}
                result.capacity = remaining_capacity
                result.bookings = booking
                res.send(result)
            }).catch((e) => {
                res.status(405).send("Wrong json format, check docs for further info /api-doc")
                console.log("Error in company: " + e)
            })
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error in booking: " + e)
        })
    } else if (req.query.date) {
        Company.findOne({nif: req.params.nif}).then((company) => {
            Booking.find({company_nif: req.params.nif, date: req.query.date}).then((booking) => {
                let remaining_capacity = company.capacity - booking.length
                let result = {}
                result.capacity = remaining_capacity
                result.bookings = booking
                res.send(result)
            }).catch((e) => {
                res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                console.log("NOSE: " + e)
            })
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error en solo date: " + e)
        })
    } else if (req.query.time) {
        Booking.find({company_nif: req.params.nif, time: req.query.time}).then((booking) => {
            res.send(booking)
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error en solo time: " + e)
        })
    } else {
        Booking.find({company_nif: req.params.nif}).then((booking) => {
            res.status(200).send(booking)
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error en no queries: " + e)
        })
    }
}

/////////////////////////////////////////////////////
//     REMAINING SPACE IN A DATE FROM COMPANY      //
/////////////////////////////////////////////////////

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let remaining_space_by_date = async (req, res) => {
    if (req.query.date) {
        Company.findOne({nif: req.params.nif}).then((company) => {
            // Parse date
            let array_date = req.query.date.split("-")
            let year = parseInt(array_date[0])
            let month = parseInt(array_date[1]) - 1
            let day = parseInt(array_date[2])
            let date = new Date(Date.UTC(year, month, day))
            // Get time slots from company
            let weekly_time_slots = company.time_slots
            // Get day from date
            let wanted_day = date.getDay()
            // Get time slots from that date
            let result = {};
            if (wanted_day === 1) {
                if (weekly_time_slots.monday_1.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.monday_1.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.monday_1[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.monday_1[i]] = company.capacity - bookings.length
                    }
                }
                if (weekly_time_slots.monday_2.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.monday_2.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.monday_2[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.monday_2[i]] = company.capacity - bookings.length
                    }
                }
            }
            if (wanted_day === 2) {
                if (weekly_time_slots.tuesday_1.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.tuesday_1.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.tuesday_1[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.tuesday_1[i]] = company.capacity - bookings.length
                    }
                }
                if (weekly_time_slots.tuesday_2.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.tuesday_2.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.tuesday_2[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.tuesday_2[i]] = company.capacity - bookings.length
                    }
                }
            }
            if (wanted_day === 3) { // Wednesday
                // Get time slots from wednesday_1 and wednesday_2
                if (weekly_time_slots.wednesday_1.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.wednesday_1.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.wednesday_1[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.wednesday_1[i]] = company.capacity - bookings.length
                    }
                }
                if (weekly_time_slots.wednesday_2.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.wednesday_2.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.wednesday_2[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.wednesday_2[i]] = company.capacity - bookings.length
                    }
                }
            }
            if (wanted_day === 4) {
                if (weekly_time_slots.thursday_1.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.thursday_1.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.thursday_1[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.thursday_1[i]] = company.capacity - bookings.length
                    }
                }
                if (weekly_time_slots.thursday_2.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.thursday_2.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.thursday_2[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.thursday_2[i]] = company.capacity - bookings.length
                    }
                }
            }
            if (wanted_day === 5) {
                if (weekly_time_slots.friday_1.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.friday_1.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.friday_1[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.friday_1[i]] = company.capacity - bookings.length
                    }
                }
                if (weekly_time_slots.friday_2.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.friday_2.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.friday_2[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.friday_2[i]] = company.capacity - bookings.length
                    }
                }
            }
            if (wanted_day === 6) {
                if (weekly_time_slots.saturday_1.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.saturday_1.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.saturday_1[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.saturday_1[i]] = company.capacity - bookings.length
                    }
                }
                if (weekly_time_slots.saturday_2.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.saturday_2.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.saturday_2[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.saturday_2[i]] = company.capacity - bookings.length
                    }
                }
            }
            if (wanted_day === 0) {
                if (weekly_time_slots.sunday_1.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.sunday_1.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.sunday_1[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.sunday_1[i]] = company.capacity - bookings.length
                    }
                }
                if (weekly_time_slots.sunday_2.length !== 0) {
                    let booking
                    for (let i = 0; i < weekly_time_slots.sunday_2.length; i++) {
                        let bookings = Booking.find({
                            company_nif: req.params.nif,
                            date: req.query.date,
                            time: weekly_time_slots.sunday_2[i]
                        })
                        bookings = Array.from(bookings)
                        result[weekly_time_slots.sunday_2[i]] = company.capacity - bookings.length
                    }
                }
            }
            res.send(result)
        }).catch((e) => {
            res.status(405).send("Wrong json format, check docs for further info /api-doc")
            console.log("Error: " + e)
        })
    } else {
        res.status(405).send({error: "Date missing"})
    }
}

exports.create_booking = create_booking
exports.get_bookings = get_bookings
exports.update_bookings = update_bookings
exports.delete_booking = delete_booking
exports.services_bookings = services_bookings
exports.company_bookings = company_bookings
exports.remaining_space_by_date = remaining_space_by_date