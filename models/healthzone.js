const mongoose = require( 'mongoose' );
// Healthzone
const healthzone = new mongoose.Schema({
    name : { type: String, required: true},
    newcases : { type : Number, required: true},
    percentage : { type : Number, required: true},
    ZBSwithCases : { type : Number, required: true},
    radius : { type : Number, required: true},
    location: {
        type: { type: String },
        coordinates: [Number]
    }
});
healthzone.index({location: '2dsphere'});

module.exports = mongoose.model("healthzone", healthzone)