const Company = require('../../models/company')
const Booking = require('../../models/booking')
const Service = require('../../models/service')

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
        Service.countDocuments({_id: req.body.service}, async function(err,count){
            if(err){
                throw err;
            }
            else{
                if(count < 1){
                    res.status(404)
                    res.send({ error: "Service not found"})
                }
                else{
                    let booking = update_time_slots(req.body.service, req.params.id, req.body.booking_time)
                    res.status(200)
                    res.send(booking)
                }
            }
        })

    }
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
            Booking.findOne({_id:id},{},{},function (err, booking) {
                if(err){
                    throw err;
                }
                else{
                    if(booking){
                        res.status(200)
                        res.send(booking)}
                    else{
                        res.status(404)
                        res.send({error:"Not found booking"})
                    }
                }
            })

        } else {
            // Fetch all bookings
            Booking.find({user_id: req.params.id},{},{},function (err, bookings) {
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
                        res.send({error:"Not found booking"})
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
        let booking = await Booking.findOneAndDelete({_id: req.params.booking_id})
        if (req.body.booking_time) {
            // Borrar booking y crear otro nuevo
            let booking = update_time_slots(booking.service_id, booking.user_id, booking.booking_time)
            res.send(booking)
        }
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
        //TODO CAMBIAR PARA EVITAR FALLOS Y BUGS, UTILIZAR CALLBACKS
        let booking = await Booking.findOneAndDelete({_id:req.params.booking_id})
        // sumar capacidad
        let service = await Service.findOne({_id:booking.service_id})
        let company = await Company.findOne({nif: service.company})
        let time_slots = company.time_slots
        let service_time_slots = service.time_slots_service
        // Encontrar time slot correspondiente
        for (let i = 0; i < time_slots.length; i++) {
            // Restar uno a la capacidad del servicio en esa hora
            if (booking.booking_time == time_slots[i]) {
                service_time_slots[i] = service_time_slots + 1
                break
            }
        }
        service.time_slots_service = service_time_slots
        await service.save()
        res.status(204).send
    }
    catch {
        res.status(404)
        res.send({ error: "Booking not found"})
    }
}

/**
 *
 * @param id_service
 * @param id_user
 * @param booking_time
 * @returns {Promise<Document>}
 */
async function update_time_slots(id_service, id_user, booking_time) {
    //TODO CAMBIAR PARA EVITAR FALLOS Y BUGS, UTILIZAR CALLBACKS
    // Actualizar time_slots del servicio
    let service = await Service.findOne({_id: id_service})
    let company = await Company.findOne({nif: service.company})
    let time_slots = company.time_slots
    let service_time_slots = service.time_slots_service
    // Encontrar time slot correspondiente
    for (let i = 0; i < time_slots.length; i++) {
        // Restar uno a la capacidad del servicio en esa hora
        if (booking_time == time_slots[i]) {
            service_time_slots[i] = service_time_slots - 1
            break
        }
    }
    // Guardar el nuevo service_time_slots
    service.time_slots_service = service_time_slots
    await service.save()
    let booking = new Booking({
        user_id: id_user,
        service_id: id_service,
        booking_time: booking_time
    })
    await booking.save()
    return booking
}

exports.create_booking = create_booking
exports.get_bookings = get_bookings
exports.update_bookings = update_bookings
exports.delete_booking = delete_booking