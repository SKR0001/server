const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(
    cors({
        origin: 'https://mern.sumitraut.in',
        credentials: true
    }));

app.use(cookieParser());

dotenv.config({ path: './config.env' });
require('./db/conn');

app.use(express.json());

const User = require('./model/userSchema');

app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is listen on port no ${PORT}`);
})