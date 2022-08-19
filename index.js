const express = require('express')
const app = express();


const port = process.env.PORT || 3800;

require('dotenv').config();
require('./startup/db')()


app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
})