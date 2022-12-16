require('dotenv').config();

// app config
const app = require('./config/app');

// config the back-end
require('./config/db')()



const port = process.env.PORT || 3800;
const inDev = process.env.IN_DEV

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
})