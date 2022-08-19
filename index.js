require('dotenv').config();
const app = require('./startup/app');


// config the back-end
require('./startup/db')()


const port = process.env.PORT || 3800;
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
})