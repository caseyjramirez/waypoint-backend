const mongoose = require('mongoose')
const tagSchema = require('./tag.schema')

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        minLength: 1,
        maxLength: 1000,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now(),
        required: true
    },
    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const taskShema = mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    comments: [commentSchema],
    status: {
        type: String,
        required: true,
        default: "ready"
    },
    due: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    tags: [tagSchema]
})

module.exports = taskShema