const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

const db = require("../models");

router.get('/:id/profile', async (req, res) => {
    try {
        const user = await db.User.findById('630d2758dbec20fb8744d986');
        const context = { user: user }
        res.render('user_profile.ejs', context)
    } catch (err) {
        console.log(err);
    }
})

router.get('/login', (req, res) => {
    res.render('login.ejs');
})


module.exports = router;