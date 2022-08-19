const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    tagTitle: {
        type: String,
        minLength: 2,
        maxLength: 30
    },
    tagColor: {
        type: String,
        default: "#FFFFFF",
        minLength: 7,
        maxLength: 7
    }
})

module.exports = tagSchema;