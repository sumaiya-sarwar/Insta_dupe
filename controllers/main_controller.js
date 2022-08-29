const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('home.ejs')
})

module.exports = router; 