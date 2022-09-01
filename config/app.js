require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('passport')
const mongoose_uri = process.env.ATLAS_URI;

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


// app.use((req, res, next) => {
//     console.log('session: ', req.session);
//     console.log('user: ', req.user);
//     next();
// })


const user = require('../routes/user.route')
app.use('/api/user', user)



module.exports = app