const mongoose = require('mongoose')

// Schema of a Opinion
const statsBooking = new mongoose.Schema(
    {
        time: {type: String, required: false},
        bookings: {type: Number, min: 0, required: false}
    }
)
module.exports = mongoose.model("statsBooking ", statsBooking)