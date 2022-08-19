const cors = require('cors');
const express = require('express');
const app = express();
const passport = require('passport')


// loading route modules
const users = require('../routes/users')


app.use('/api/users', users)



module.exports = app