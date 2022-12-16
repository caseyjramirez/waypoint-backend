const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    tagTitle: {
        type: String,
        required: true,
        maxLength: 25
    },
    tagColor: {
        type: String,
        default: "red",
        required: true
    }
})

module.exports = tagSchema;