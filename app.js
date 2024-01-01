const dotenv = require("dotenv");
// const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

dotenv.config({ path: './config.env' });
require('./db/conn');

app.use(express.json());

const User = require('./model/userSchema');

app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000



app.get('/contact', (req, res) => {
    res.cookie("Ram Ram", 'bhaii ne');
    res.send("Contact Page hai");
})


app.get('/signin', (req, res) => {
    res.send("Login Page");
})

app.get('/signup', (req, res) => {
    res.send("Registration page");
})




// 3: step heroku
// if(process.env.NODE_ENV == 'production'){
    // app.use(express.static('client/build'));
// }

app.listen(PORT, () => {
    console.log(`server is listen on port no ${PORT}`);
})