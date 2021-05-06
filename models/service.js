const mongoose = require('mongoose')

// Schema of a service
const service = new mongoose.Schema(
    {
        company: { type: String, required: true},
        description: { type: String, required: true},
        capacity: {type: Number, required: true},
        time_slots_service: {
                monday_1: {slots: { type: Array}, places_left: { type: Array}},
                monday_2: {slots: { type: Array}, places_left: { type: Array}},
                tuesday_1: {slots: { type: Array}, places_left: { type: Array}},
                tuesday_2: {slots: { type: Array}, places_left: { type: Array}},
                wednesday_1: {slots: { type: Array}, places_left: { type: Array}},
                wednesday_2: {slots: { type: Array}, places_left: { type: Array}},
                thursday_1: {slots: { type: Array}, places_left: { type: Array}},
                thursday_2: {slots: { type: Array}, places_left: { type: Array}},
                friday_1: {slots: { type: Array}, places_left: { type: Array}},
                friday_2: {slots: { type: Array}, places_left: { type: Array}},
                saturday_1: {slots: { type: Array}, places_left: { type: Array}},
                saturday_2: {slots: { type: Array}, places_left: { type: Array}},
                sunday_1: {slots: { type: Array}, places_left: { type: Array}},
                sunday_2: {slots: { type: Array}, places_left: { type: Array}}
        },
        price: { type: Number, required: true}
    }
)
module.exports = mongoose.model("service", service)