import express from 'express';

import db from './lib/db.js';


const app = express();


require('./configs/middlewares.config')(app)

app.listen(7000, () => {
    console.log('server running on port 7000');
})

app.use("/", require("./routes/entities.routes"));



module.exports = app
