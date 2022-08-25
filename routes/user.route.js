const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user.schema');
const validateNewUser = require('../validation/user.validation');
const {badRequest, userAlreadyExists, success, internalServerError} = require('../messages/serverMessages');

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/', async (req, res) => {
    const body = req.body;

    // checking if user exists
    let user = await User.findOne({email: body.email})
    if(user) return res.status(409).send(userAlreadyExists)

    // validating input
    const {error} = validateNewUser(req.body);
    if(error) return res.status(400).send(badRequest);

    // creating new user obj
    user = new User(body)

    // hashing the pw
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        user.save();
        res.send(success)
    }
    catch (e) {
        console.log(e);
        res.status(500).send(internalServerError)
    }
})

module.exports = router