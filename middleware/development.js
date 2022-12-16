require('dotenv').config();
const envornment = process.env.NODE_ENV;

function dev(res, res, next) {
    if (envornment === 'development') {
        next();
    } else {
        console.log('Environment not in Development');
        return res.sendStatus(401);
    }
}

module.exports = dev;