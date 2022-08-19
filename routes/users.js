const express = require('express');
const router = express.Router();
const User = require('../models/user.schema')


router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/', async (req, res) => {
    
})

module.exports = router