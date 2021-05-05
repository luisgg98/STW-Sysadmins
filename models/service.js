const mongoose = require('mongoose')

// Schema of a service
const service = new mongoose.Schema(
    {
        company: { type: String, required: true},
        description: { type: String, required: true},
        capacity: {type: Number, required: true},
        time_slots_service: {
                monday_1: {type: Array},
                monday_2: {type: Array},
                tuesday_1: {type: Array},
                tuesday_2: {type: Array},
                wednesday_1: {type: Array},
                wednesday_2: {type: Array},
                thursday_1: {type: Array},
                thursday_2: {type: Array},
                friday_1: {type: Array},
                friday_2: {type: Array},
                saturday_1: {type: Array},
                saturday_2: {type: Array},
                sunday_1: {type: Array},
                sunday_2: {type: Array}
        },
        price: { type: Number, required: true}
    }
)
module.exports = mongoose.model("service", service)