const express = require('express');
const router = express.Router();
const User = require('../models/user.schema')


router.post('/new', async (req, res) => {
    const newTask = req.body
    const user = await User.findById(req.session.passport.user)
    user.tasks.push(newTask);
    user.save()
})

router.patch('/update/:id', async (req, res) => {
    const taskId = req.params.id
    const body = req.body
    const user = await User.findById(req.session.passport.user);

    user.tasks.id(taskId).title = body.title
    user.tasks.id(taskId).description = body.description
    user.tasks.id(taskId).due = body.due
    user.save()
})

router.patch('/add_tag/:id', async (req, res) => {
    const taskId = req.params.id;
    const userId = req.session.passport.user;
    const tagId = req.body.tagId;
    
    const user = await User.findById(userId)
    let task = user.tasks.id(taskId)
    task.tags.push(tagId)
    user.save()
})

router.patch('/remove_tag/:id', async (req, res) => {
    const taskId = req.params.id;
    const userId = req.session.passport.user;
    const tagId = req.body.tagId;
    
    const user = await User.findById(userId)
    let task = user.tasks.id(taskId)
    task.tags = task.tags.filter(tag => tag.toString() !== tagId)
    
    user.save()
})

router.patch('/change_status/:id', async (req, res) => {
    const taskId = req.params.id;
    const userId = req.session.passport.user;
    const status = req.body.status;
    
    const user = await User.findById(userId)
    let task = user.tasks.id(taskId)
    
    task.status = status
    user.save()
})

router.patch('/change_favorite/:id', async (req, res) => {
    const taskId = req.params.id;
    const userId = req.session.passport.user;
    
    const user = await User.findById(userId)
    let task = user.tasks.id(taskId)
    
    task.isFavorite = !task.isFavorite
    user.save()
})

router.delete('/delete/:id', async (req, res) => {
    const taskId = req.params.id
    const userId = req.session.passport.user
    const user = await User.findById(userId)
    let task = user.tasks.id(taskId)
    
    if(!task) {
        return res.status(404)
    }
    task.remove()
    user.save()
})


module.exports = router