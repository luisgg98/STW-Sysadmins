const mongoose = require( 'mongoose' );
// Admin
/*
    username: "zitation-stw"
    password: "stw20-21"
 */
const admin = new mongoose.Schema({
    username : { type: String, required: true},
    password : { type : String, required: true},
    salt : { type : String, required: true}
});

module.exports = mongoose.model("admin", admin);