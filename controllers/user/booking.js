const Booking = require('../../models/booking')
const Service = require('../../models/service')
const User = require('../../models/user')
const Company = require('../../models/company')
const {sendReminder} = require("../../scripts/email");

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
    try {
        Service.findOne({_id: req.body.service}, async function (err, service) {
            if (err) {
                throw err
            } else {
                if (service) {
                    //Check if user exists
                    User.findOne({_id: req.params.id}, async function (err, user) {
                            if (err) {
                                throw err
                            } else {
                                if (user) {
                                    const booking = new Booking({
                                        user_id: req.params.id,
                                        service_id: req.body.service,
                                        company_nif: service.company,
                                        date: req.body.date,
                                        time: req.body.time
                                    })
                                    Company.findOne({nif: service.company}, {}, {}, async function (err, company) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            company.bookings += 1
                                            await company.save()
                                            await booking.save();
                                            res.status(200).send(booking)
                                            // Send email
                                            sendReminder(user, booking, company);
                                        }
                                    });
                                } else {
                                    res.status(404)
                                    res.send({error: "User not found"})
                                }
                            }
                        }
                    )
                } else {
                    res.status(404)
                    res.send({error: "Service not found"})
                }
            }
        });
    } catch {
        res.status(405)
        res.send({error: "Wrong body format, check docs for further info /api-docs"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let get_bookings = async (req, res) => {
    try {
        // if the url contains a query, just search for one booking
        if (req.query.id) {
            let id = req.query.id
            Booking.findOne({_id: id}, function (err, booking) {
                if (err) {
                    throw err;
                } else {
                    if (booking) {
                        res.status(200)
                        res.send(booking)
                    } else {
                        res.status(404)
                        res.send({error: "Booking not found"})
                    }
                }
            })
        }
        else if(req.query.date) {
            Booking.find({user_id: req.params.id, date: req.query.date}, function(err, bookings){
                if(err){throw err}
                else{
                    res.status(200).send(bookings)
                }
            })
        }
        else {
            // Fetch all bookings
            Booking.find({user_id: req.params.id}, function (err, bookings) {
                if (err) {
                    throw err;
                } else {
                    if (bookings) {
                        console.log(bookings)
                        res.status(200)
                        res.send(bookings)
                    } else {
                        res.status(404)
                        res.send({error: "No bookings were found"})
                    }
                }
            })
        }
    } catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let update_bookings = async (req, res) => {
    try {
        Booking.findOne({_id: req.params.booking_id}, async function (err, booking) {
            if (err) {
                throw err
            } else {
                if (booking) {
                    if (req.body.date) {
                        booking.date = req.body.date
                    }
                    if (req.body.time) {
                        booking.time = req.body.time
                    }

                    User.findOne({_id: booking.user_id}, {}, {}, async function (err, user) {
                        if (err) {
                            throw err
                        } else {
                            if (user) {
                                Company.findOne({nif: booking.company_nif}, {}, {}, async function (err, company) {
                                    if (err) {
                                        throw err;
                                    } else {
                                        if (company) {
                                            await booking.save();
                                            res.status(200).send(booking)
                                            // Send email
                                            sendReminder(user, booking, company);
                                        }
                                    }

                                })

                            }
                        }

                    })

                } else {
                    res.status(404)
                    res.send({error: "Booking not found"})
                }
            }
        })
    } catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let delete_booking = async (req, res) => {
    try {
        Booking.findOneAndDelete({_id: req.params.booking_id}, async function (err, booking) {
            if (err) {
                throw err
            } else {
                if (booking) {
                    Company.findOne({nif:booking.company_nif}, async function(err, company){
                        company.bookings -= 1
                        await company.save()
                        res.status(204).send()
                    })
                } else {
                    res.status(404)
                    res.send({error: "Booking not found"})
                }
            }
        })
    } catch {
        res.status(404)
        res.send({error: "Booking not found"})
    }
}

/////////////////////////////////////////////////////
//             BOOKINGS FROM SERVICE               //
/////////////////////////////////////////////////////

let services_bookings = async (req, res) => {
    try {
        if (req.query.date && req.query.time) {
            Booking.find({
                service_id: req.params.id,
                date: req.query.date,
                time: req.query.time
            }, async function (err, booking) {
                if (err) {
                    throw err
                } else {
                    Company.findOne({nif: req.params.nif}, async function (err, company) {
                        let capacity = company.capacity + booking.length
                        let result = {}
                        result.capacity = capacity
                        result.bookings = booking
                        res.send(result)
                    })
                }
            })
        } else if (req.query.date) {
            Booking.find({service_id: req.params.id, date: req.query.date}, async function (err, booking) {
                if (err) {
                    throw err
                } else {
                    res.send(booking)
                }
            })
        } else if (req.query.time) {
            Booking.find({service_id: req.params.id, time: req.query.time}, async function (err, booking) {
                if (err) {
                    throw err
                } else {
                    res.send(booking)
                }
            })
        } else {
            Booking.find({service_id: req.params.id}, async function (err, booking) {
                if (err) {
                    throw err
                } else {
                    if (booking) {
                        res.status(200)
                        res.send(booking)
                    } else {
                        res.status(404)
                        res.send({error: "No bookings found"})
                    }
                }
            })
        }
    } catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

/////////////////////////////////////////////////////
//             BOOKINGS FROM COMPANY               //
/////////////////////////////////////////////////////

let company_bookings = async (req, res) => {
    try {
        if (req.query.date && req.query.time) {
            Booking.find({
                company_nif: req.params.nif,
                date: req.query.date,
                time: req.query.time
            }, async function (err, booking) {
                if (err) {
                    throw err
                } else {
                    Company.findOne({nif: req.params.nif}, async function (err, company) {
                        // Get remaining places in that date and time
                        let remaining_capacity = company.capacity - booking.length
                        let result = {}
                        result.capacity = remaining_capacity
                        result.bookings = booking
                        res.send(result)
                    })
                }
            })
        } else if (req.query.date) {
            Company.findOne({nif: req.params.nif}, async function(err, company){
                if(err){throw err}
                else {
                    Booking.find({company_nif: req.params.nif, date: req.query.date}, async function (err, booking) {
                        if (err) {
                            throw err
                        } else {
                            let remaining_capacity = company.capacity - booking.length
                            let result = {}
                            result.capacity = remaining_capacity
                            result.bookings = booking
                            res.send(result)
                        }
                    })
                }
            })
        } else if (req.query.time) {
            Booking.find({company_nif: req.params.nif, time: req.query.time}, async function (err, booking) {
                if (err) {
                    throw err
                } else {
                    res.send(booking)
                }
            })
        } else {
            Booking.find({company_nif: req.params.nif}, async function (err, booking) {
                if (err) {
                    throw err
                } else {
                    if (booking) {
                        res.status(200)
                        res.send(booking)
                    } else {
                        res.status(404)
                        res.send({error: "No bookings found"})
                    }
                }
            })
        }
    } catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

/////////////////////////////////////////////////////
//     REMAINING SPACE IN A DATE FROM COMPANY      //
/////////////////////////////////////////////////////

let remaining_space_by_date = async(req, res) => {
    try{
        if(req.query.date){
            Company.findOne({nif: req.params.nif},  function(err, company){
                if(err){throw err}
                else {
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
                    let result = { };
                    if (wanted_day === 1){
                        if (weekly_time_slots.monday_1.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.monday_1.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.monday_1[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.monday_1[i]] = company.capacity - bookings.length
                            }
                        }
                        if (weekly_time_slots.monday_2.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.monday_2.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.monday_2[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.monday_2[i]] = company.capacity - bookings.length
                            }
                        }
                    }
                    if (wanted_day === 2){
                        if (weekly_time_slots.tuesday_1.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.tuesday_1.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.tuesday_1[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.tuesday_1[i]] = company.capacity - bookings.length
                            }
                        }
                        if (weekly_time_slots.tuesday_2.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.tuesday_2.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.tuesday_2[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.tuesday_2[i]] = company.capacity - bookings.length
                            }
                        }
                    }
                    if (wanted_day === 3){ // Wednesday
                        // Get time slots from wednesday_1 and wednesday_2
                        if (weekly_time_slots.wednesday_1.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.wednesday_1.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.wednesday_1[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.wednesday_1[i]] = company.capacity - bookings.length
                            }
                        }
                        if (weekly_time_slots.wednesday_2.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.wednesday_2.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.wednesday_2[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.wednesday_2[i]] = company.capacity - bookings.length
                            }
                        }
                    }
                    if (wanted_day === 4){
                        if (weekly_time_slots.thursday_1.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.thursday_1.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.thursday_1[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.thursday_1[i]] = company.capacity - bookings.length
                            }
                        }
                        if (weekly_time_slots.thursday_2.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.thursday_2.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.thursday_2[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.thursday_2[i]] = company.capacity - bookings.length
                            }
                        }
                    }
                    if (wanted_day === 5){
                        if (weekly_time_slots.friday_1.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.friday_1.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.friday_1[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.friday_1[i]] = company.capacity - bookings.length
                            }
                        }
                        if (weekly_time_slots.friday_2.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.friday_2.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.friday_2[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.friday_2[i]] = company.capacity - bookings.length
                            }
                        }
                    }
                    if (wanted_day === 6){
                        if (weekly_time_slots.saturday_1.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.saturday_1.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.saturday_1[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.saturday_1[i]] = company.capacity - bookings.length
                            }
                        }
                        if (weekly_time_slots.saturday_2.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.saturday_2.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.saturday_2[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.saturday_2[i]] = company.capacity - bookings.length
                            }
                        }
                    }
                    if (wanted_day === 0){
                        if (weekly_time_slots.sunday_1.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.sunday_1.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.sunday_1[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.sunday_1[i]] = company.capacity - bookings.length
                            }
                        }
                        if (weekly_time_slots.sunday_2.length !== 0){
                            let booking
                            for (let i = 0; i < weekly_time_slots.sunday_2.length; i ++){
                                let bookings = Booking.find({company_nif: req.params.nif, date: req.query.date, time: weekly_time_slots.sunday_2[i]})
                                bookings = Array.from(bookings)
                                result[weekly_time_slots.sunday_2[i]] = company.capacity - bookings.length
                            }
                        }
                    }
                    res.send(result)
                }
            })
        }
        else{
            res.status(405).send({error: "Date missing"})
        }
    }
    catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

exports.create_booking = create_booking
exports.get_bookings = get_bookings
exports.update_bookings = update_bookings
exports.delete_booking = delete_booking
exports.services_bookings = services_bookings
exports.company_bookings = company_bookings
exports.remaining_space_by_date = remaining_space_by_date