const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

const db = require("../models");

router.get('/:id/profile', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id);
        const context = { user: user }
        res.render('user_profile.ejs', context)
    } catch (err) {
        console.log(err);
    }
})

router.get(':/id/new_post', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id);
        context = { user: user }
        res.render('posts.ejs', context)
    } catch (err) {
        console.log(err);
    }
})

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
})

router.post('/', async (req, res) => {
    const newPostData = req.body;
    try {
        const newPost = await db.Posts.create(newPostData);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;