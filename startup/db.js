const mongoose = require('mongoose');
const URI = process.env.ATLAS_URI;
const env = process.env.NODE_ENV

function db () {
    if(env === 'development') {
        mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('Successfully connected to the waypoint server...');
        })
    }
    else {
        return console.log('Change the node environment in the .env file');
    }

}

module.exports = db