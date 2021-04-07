const mongoose = require( 'mongoose' );
// Healthzone
const district = new mongoose.Schema({
    name : { type: String, required: true},
    location: {
        type: { type: String },
        coordinates: [Number]
    }
});
district.index({location: '2dsphere'});

module.exports = mongoose.model("district", district)