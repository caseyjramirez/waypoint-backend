const mongoose = require('mongoose')
const taskShema = require('./task.schema')
const tagSchema = require('./tag.schema')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true
    },
    lastName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true
    },
    jobTitle: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    company: {
        type: String,
        minLength: 3,
        maxLength: 60,
        required: true
    },
    email: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 3,
        maxLength: 1024,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
        required: false
    },
    userIcon: {
        type: String,
        default: '#0F75E0',
        required: true

    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: true
    },
    tasks: [taskShema],
    tags: [tagSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User