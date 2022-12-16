require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('passport')
const mongoose_uri = process.env.ATLAS_URI;
const env = process.env.NODE_ENV

const corsOptions = {
    origin: 'http://localhost:3000',  //Your Client, do not write '*'
    credentials: true,
};

// adding config options
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions))


app.use(session({
    secret: 'put secret here',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongoose_uri,
        ttl: 14 * 24 * 60 * 60, // 14-days - default
        collectionName: 'passportSession'
    }),
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require('./passport')
app.use(passport.initialize())
app.use(passport.session())


const user = require('../routes/user.route')
const task = require('../routes/task.route')
const tag = require('../routes/tag.route')
const devRoutes = require('../routes/dev.route')
const auth = require('../middleware/auth')
const dev = require('../middleware/development')


if(env === 'development') {
    console.log(`*** In Development Mode ***`);
    app.use(dev)
    app.use('/api/dev', devRoutes)
}

app.use('/api/user', user)
app.use(auth)
app.use('/api/tag', tag)
app.use('/api/task', task)



module.exports = app