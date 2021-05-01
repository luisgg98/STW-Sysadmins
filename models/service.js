const mongoose = require('mongoose')

// Schema of a service
const service = new mongoose.Schema(
    {
        company: { type: String, required: true},
        description: { type: String, required: true},
        capacity: {type: Number, required: true},
        time_slots_service: { type: Array},
        price: { type: Number, required: true}
    }
)
// TODO crear un array igual que @time_slots para gestionar la capacidad POR SERVICIO
// Cuando se crea un servicio, se crea un array igual que @time_slots y se pone la capacidad
// ¿UN ARRAY DE JSON? {franja_horaria, capacidad}
// Se va restando la capacidad cuando se va reservando
module.exports = mongoose.model("service", service)