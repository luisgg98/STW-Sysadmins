const mongoose = require('mongoose')

// Schema of a Opinion
const opinion = new mongoose.Schema(
    {
        company_nif: {type: String, required: true},
        comment: {type: String, required: true},
        user_id: {type: String, required: true},
        stars: {type: Number, min: 0, required: false},
        votes:{type: Number, min: 0, required: false}
    }
)
module.exports = mongoose.model("opinion", opinion)