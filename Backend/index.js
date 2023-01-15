const express = require('express');
const session = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
const dotenv = require('dotenv');
const path = require('path');

const app = express()

/* Import config */
dotenv.config({path: path.resolve(__dirname, '.env')});

/* Set Cookie Settings */
app.use(
    session({
        name: 'session',
        secret: process.env.COOKIE_SECRET,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })
);
app.use(csurf());


app.listen(8080, () => {
    console.log("I'm listening!");
});

module.exports = app;