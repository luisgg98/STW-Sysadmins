const mongoose = require('mongoose')

// Schema of a Opinion
const statsCompanies = new mongoose.Schema(
    {
        nif: {type: String, required: false},
        name: {type: String, required: false},
        bookings: {type: Number, min: 0, required: false}
    }
)
module.exports = mongoose.model("statsCompanies", statsCompanies)