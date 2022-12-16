const express = require('express');
const router = express.Router();
const User = require('../models/user.schema')
const Tag = require('../models/tag.schema')
const token = process.env.USER_TOKEN

router.get('/tasks/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user.tasks);
})

router.get('/tags/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user.tags);
})

router.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user);
})


router.post('/tag/new/:id', async (req, res) => {
    const tag = req.body
    const user = await User.findById(req.params.id)
    user.tags.push(tag)
    user.save()
    res.send(user.tags);
})

router.patch('/tag/update/:id', async (req, res) => {
    const tagId = req.params.id
    const body = req.body
    const user = await User.findById(token)
    user.tags.id(tagId).tagColor = body.tagColor
    user.tags.id(tagId).tagTitle = body.tagTitle
    user.save()
    res.send(user.tags)
})

module.exports = router