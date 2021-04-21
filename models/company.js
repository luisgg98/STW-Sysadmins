const mongoose = require( 'mongoose' )
// Company
const company = new mongoose.Schema({
    name : { type: String, required: true},
    nif : { type : String, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true},
    salt : { type : String, required: true},
    category: { type: String, required: true},
    address: { type: String, required: true},
    description: { type: String, required: true},
    // Duration needs to be in **minutes**
    service_duration: { type: Number},
    location: {
        type: { type: String, required: true},
        coordinates: [Number]
    }
});
company.index({location: '2dsphere'})

module.exports = mongoose.model("company", company)