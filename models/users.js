const mongoose = require('mongoose')

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
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User