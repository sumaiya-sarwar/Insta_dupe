const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('home.ejs')
})

router.get('/posts', (req, res) => {
    res.render('posts.ejs')
});

module.exports = router; 