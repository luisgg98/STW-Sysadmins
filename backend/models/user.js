const mongoose = require( 'mongoose' );

const user = new mongoose.Schema({
    first_name : { type: String, required: true},
    last_name : { type : String, required: true},
    phone : { type : Number, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true}
});

module.exports = mongoose.model("user", user);