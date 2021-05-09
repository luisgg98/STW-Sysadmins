// Id usuario
// Id servicio
// Hora de reserva
const mongoose = require('mongoose')

// Schema of a booking
const booking = new mongoose.Schema(
    {
        user_id: { type: String, required: true},
        service_id: { type: String, required: true},
        company_id: { type: String, required: true},
        date: { type: String, required: true},
        time: { type: String, required: true}
    }
)

module.exports = mongoose.model("booking", booking)