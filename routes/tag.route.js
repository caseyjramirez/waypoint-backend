const express = require('express');
const router = express.Router();
const User = require('../models/user.schema')

router.post('/new', async (req, res) => {
    const newTag = req.body
    const user = await User.findById(req.session.passport.user)
    user.tags.push(newTag);
    try {
        await user.save()
        res.send(user.tags[user.tags.length - 1]._id)
    } catch {
        res.status(500)
    }
})

router.patch('/update/:id', async (req, res) => {
    const tagId = req.params.id
    const body = req.body
    const user = await User.findById(req.session.passport.user)
    user.tags.id(tagId).tagColor = body.tagColor
    user.tags.id(tagId).tagTitle = body.tagTitle
    user.save()
})

router.delete('/delete/:id', async (req, res) => {
    const tagId = req.params.id
    const userId = req.session.passport.user
    const user = await User.findById(userId)
    let tag = user.tags.id(tagId)
    
    if(!tag) {
        return res.status(404)
    }
    tag.remove()
    user.save()
})

module.exports = router