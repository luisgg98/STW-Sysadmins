const mongoose = require( 'mongoose' )
// Company
const company = new mongoose.Schema({
    name : { type: String, required: true},
    nif : { type : String, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true},
    salt : { type : String, required: true},
    category: { type: String, required: true},
    streetnumber:{ type: Number, required: true},
    street:{ type: String, required: true},
    zipcode:{ type: Number, required: true},
    description: { type: String, required: true},
    // Duration needs to be in **minutes**
    service_duration: { type: Number, required: true},
    // Time slots
    time_slots: { type: Array},
    // Schedule of his services
    schedule: {
        monday: {
            open_1: { type: String, required: true},
            close_1: { type: String, required: true},
            open_2: { type: String},
            close_2: { type: String}
        },
        tuesday: {
            open_1: { type: String, required: true},
            close_1: { type: String, required: true},
            open_2: { type: String},
            close_2: { type: String}
        },
        wednesday: {
            open_1: { type: String, required: true},
            close_1: { type: String, required: true},
            open_2: { type: String},
            close_2: { type: String}
        },
        thursday: {
            open_1: { type: String, required: true},
            close_1: { type: String, required: true},
            open_2: { type: String},
            close_2: { type: String}
        },
        friday: {
            open_1: { type: String, required: true},
            close_1: { type: String, required: true},
            open_2: { type: String},
            close_2: { type: String}
        },
        saturday: {
            open_1: { type: String, required: true},
            close_1: { type: String, required: true},
            open_2: { type: String},
            close_2: { type: String}
        },
        sunday: {
            open_1: { type: String, required: true},
            close_1: { type: String, required: true},
            open_2: { type: String},
            close_2: { type: String}
        }
    },
    location:{type: { type: String, required: false}, coordinates: [Number]
    },
    security_level: { type : Number, required: false}
});
company.index({coordinates: '2dsphere'})

module.exports = mongoose.model("company", company)