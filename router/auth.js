const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


router.post(`/register`, async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "please filled the field properly" })
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password not matched" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();
            res.status(201).json({ message: "user registered successfuly" });
        }


    } catch (err) {
        console.log(err);
    }


});

router.post(`/signin`, async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "please filled the data" })
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {

            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.json({ error: "Invalid credential" });
            } else {
                res.json({ message: "user signin successfull" });
            }
        } else {
            res.json({ error: "Invalid credential" });
        }

    } catch (err) {
        console.log(err);
    }
});

router.get(`/about`, authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.get(`/logout`, (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('Ram Ram');
});

module.exports = router;