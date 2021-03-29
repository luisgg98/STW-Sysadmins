const mongoose = require( 'mongoose' );

const company = new mongoose.Schema({
    name : { type: String, required: true},
    nif : { type : String, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true},
    location: {
        type: { type: String },
        coordinates: [Number]
    }
});
company.index({coords: '2dsphere'});

module.exports = mongoose.model("company", company)