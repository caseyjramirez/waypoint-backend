require('dotenv').config();
const app = require('./config/app');


// config the back-end
require('./config/db')()


const port = process.env.PORT || 3800;
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
})