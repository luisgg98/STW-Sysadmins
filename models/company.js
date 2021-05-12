const mongoose = require('mongoose')
// Company
const company = new mongoose.Schema({
    name: {type: String, required: true},
    nif: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    category: {type: String, required: true},
    streetnumber: {type: Number, required: true},
    street: {type: String, required: true},
    zipcode: {type: Number, required: true},
    description: {type: String, required: true},
    // Duration needs to be in **minutes**
    service_duration: {type: Number, required: true},
    capacity: {type: Number},
    // Time slots
    time_slots: {
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
    // Schedule of his services
    schedule: {
        monday: {
            open_1: {type: String},
            close_1: {type: String},
            open_2: {type: String},
            close_2: {type: String}
        },
        tuesday: {
            open_1: {type: String},
            close_1: {type: String},
            open_2: {type: String},
            close_2: {type: String}
        },
        wednesday: {
            open_1: {type: String},
            close_1: {type: String},
            open_2: {type: String},
            close_2: {type: String}
        },
        thursday: {
            open_1: {type: String},
            close_1: {type: String},
            open_2: {type: String},
            close_2: {type: String}
        },
        friday: {
            open_1: {type: String},
            close_1: {type: String},
            open_2: {type: String},
            close_2: {type: String}
        },
        saturday: {
            open_1: {type: String},
            close_1: {type: String},
            open_2: {type: String},
            close_2: {type: String}
        },
        sunday: {
            open_1: {type: String},
            close_1: {type: String},
            open_2: {type: String},
            close_2: {type: String}
        }
    },
    location: {
        type: {type: String, required: false}, coordinates: [Number]
    },
    security_level: {type: Number, required: false}
})
company.index({coordinates: '2dsphere'})

module.exports = mongoose.model("company", company)