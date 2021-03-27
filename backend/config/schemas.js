const mongoose = require( 'mongoose' );

const user = new mongoose.Schema({
    name : { type: String, required: true},
    last_name : { type : String, required: true},
    phone : { type : Number, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true}
});

const company = new mongoose.Schema({
    name : { type: String, required: true},
    nif : { type : String, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true},
    location: {
        type: { type: String },
        coordinates: [Number]
    },
});
company.index({coords: '2dsphere'});