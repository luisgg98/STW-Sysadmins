const Booking = require('../../models/booking')
const Service = require('../../models/service')
const User = require('../../models/user')

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
        Service.findOne({_id: req.body.service}, async function(err, service){
            if (err){ throw err}
            else {
                if (service){
                    //Check if user exists
                    User.findOne({_id: req.params.id},async function(err, user){
                        if (err){ throw err}
                        else{
                            if (user){
                                const booking = new Booking({
                                    user_id: req.params.id,
                                    service_id: req.body.service,
                                    company_nif: service.company,
                                    date: req.body.date,
                                    time: req.body.time
                            })
                                await booking.save()
                                res.send(booking)
                            }
                            else{
                                res.status(404)
                                res.send({error: "User not found"})
                            }}})}
                else {
                    res.status(404)
                    res.send({ error: "Service not found"})
                }}})}
    catch {
        res.status(405)
        res.send({ error: "Wrong body format, check docs for further info /api-docs"})
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
            Booking.findOne({_id:id},function (err, booking) {
                if(err){
                    throw err;
                }
                else{
                    if(booking){
                        res.status(200)
                        res.send(booking)}
                    else{
                        res.status(404)
                        res.send({error:"Booking not found"})
                    }
                }
            })

        } else {
            // Fetch all bookings
            Booking.find({user_id: req.params.id},function (err, bookings) {
                if(err){
                    throw err;
                }
                else{
                    if(bookings){
                        console.log(bookings)
                        res.status(200)
                        res.send(bookings)
                    }
                    else{
                        res.status(404)
                        res.send({error:"No bookings were found"})
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
    try{
        Booking.findOne({_id: req.params.booking_id}, async function(err, booking){
            if(err){throw err}
            else{
                if (booking){
                    if(req.body.date){booking.date = req.body.date}
                    if(req.body.time){booking.time = req.body.time}
                    await booking.save()
                    res.status(200)
                    res.send(booking)
                } else {
                    res.status(404)
                    res.send({error: "Booking not found"})
                }
            }
        })
    }
    catch {
        res.status(500)
        res.send({ error: "Internal server error"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let delete_booking = async (req,res) => {
    try {
        Booking.findOneAndDelete({_id:req.params.booking_id}, async function(err, booking){
            if(err){throw err}
            else{
                if (booking){
                    res.status(204).send()
                } else{
                    res.status(404)
                    res.send({error: "Booking not found"})
               }
            }
        })
    }
    catch {
        res.status(404)
        res.send({ error: "Booking not found"})
    }
}

/////////////////////////////////////////////////////
//             BOOKINGS FROM COMPANY               //
/////////////////////////////////////////////////////

let services_bookings = async (req, res) => {
    try{
        Booking.find({service_id: req.params.id}, async function(err, booking){
            if(err){throw err}
            else{
                if(booking){
                    res.status(200)
                    res.send(booking)
                }
                else{
                    res.status(404)
                    res.send({error: "No bookings found"})
                }
            }
        })
    }
    catch {
        res.status(500)
        res.send({error:"Internal server error"})
    }
}

exports.create_booking = create_booking
exports.get_bookings = get_bookings
exports.update_bookings = update_bookings
exports.delete_booking = delete_booking
exports.services_bookings = services_bookings