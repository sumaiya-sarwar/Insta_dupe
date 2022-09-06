const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

const db = require("../models");

router.get('/:id/profile', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id);
        const posts = await db.Posts.find({ user: user._id })
        const context = { user: user, posts: posts, userId: req.session.currentUser.id }
        res.render('user_profile.ejs', context)
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;