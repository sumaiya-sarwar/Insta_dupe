const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/login',(req, res) => {
    res.render('login.ejs');
})

module.exports = router