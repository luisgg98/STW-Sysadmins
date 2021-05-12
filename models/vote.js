const mongoose = require('mongoose')

// Schema of a Opinion
const vote = new mongoose.Schema(
    {
        opinion_id: {type: String, required: true},
        user_id: {type: String, required: true}
    }
)
module.exports = mongoose.model("vote", vote)