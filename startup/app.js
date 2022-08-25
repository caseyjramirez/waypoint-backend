const cors = require('cors');
const express = require('express');
const app = express();
const passport = require('passport')

// adding config options
app.use(express.json());
app.use(cors())

// loading route modules
const user = require('../routes/user.route')


app.use('/api/user', user)



module.exports = app