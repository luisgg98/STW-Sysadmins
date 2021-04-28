const mongoose = require( 'mongoose' );
// User
const user = new mongoose.Schema({
    first_name : { type: String, required: true},
    last_name : { type : String, required: true},
    phone : { type : Number, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true},
    salt : { type : String, required: true},
    security_level: { type : Number, required: false}
});

module.exports = mongoose.model("user", user);