const mongoose = require('mongoose')
// Schema of a Opinion
const statsCategory = new mongoose.Schema(
    {
        category: {type: String, required: false},
        bookings: {type: Number, min: 0, required: false}
    }
)
module.exports = mongoose.model("statsCategory", statsCategory)