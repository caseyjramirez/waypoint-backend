const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.schema')


function validatePassword(password, userPassword) {
    return bcrypt.compare(password, userPassword);
}

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

const verifyCallback = async (email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) return done(null, false) 
    
    const isValid = await validatePassword(password, user.password)
    if(!isValid) return done(null, false)

    return done(null, user)
}

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => {
            done(null, user)
        })
        .catch(err => done(err))
})