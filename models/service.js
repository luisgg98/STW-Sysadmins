const mongoose = require('mongoose')

// Schema of a service
const service = new mongoose.Schema(
    {
        company: { type: String, required: true},
        description: { type: String, required: true},
        price: { type: Number, required: true}
    }
)
module.exports = mongoose.model("service", service)