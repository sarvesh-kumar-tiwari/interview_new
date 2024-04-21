const express = require('express');
const app = express();
const db = require('./config/db');
const routes = require('./routes/User');

app.use(routes);
app.listen(8080, function () {
    console.log("listening on port 8080")
})