const express = require('express');
const User = require('../models/user.schema')
const Task = require('../models/task.schema')
const router = express.Router();

router.post('/new', async (req, res) => {
    const newTask = req.body
    const user = await User.findById(req.session.passport.user)
    user.tasks.push(newTask);
    user.save()
    console.log(user);
})

module.exports = router