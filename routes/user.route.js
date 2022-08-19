const express = require('express');
const router = express.Router();
const User = require('../models/user.schema');
const validateNewUser = require('../validation/user.validation');
const {badRequest, userAlreadyExists} = require('../messages/serverMessages');

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/', async (req, res) => {
    const body = req.body;

    let user = await User.findOne({email: body.email})
    if(user) return res.status(409).send(userAlreadyExists)

    const {error} = validateNewUser(req.body);
    if(error) return res.status(400).send(badRequest);

    res.send(error)
})

module.exports = router