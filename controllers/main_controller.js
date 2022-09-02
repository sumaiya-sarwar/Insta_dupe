const express = require('express');
const { fstat } = require('fs');
const { model } = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, __dirname + '/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('home.ejs')
})

router.get('/newPost', (req, res) => {
    console.log(req.session.currentUser)
    res.render('newPost.ejs')
})

router.post('/newPost', upload.single('image'), async (req, res) => {
    try {
        console.log(req.session)
        const newImgObj = {
            caption: req.body.caption,
            image: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            user: req.session.currentUser.id
        }

        const uploadImage = await db.Posts.create(newImgObj);
        res.redirect('feed');

    } catch (err) {
        console.log(err);
    }
})

router.get('/feed', async (req, res) => {
    const posts = await db.Posts.find();
    const comments = await db.Comments.find().populate('user')
    console.log(comments)
    context = { posts: posts, comments: comments };

    res.render('feed.ejs', context)
});

router.get('/feed/:postId/edit', async (req, res) => {
    try {
        const context = { postId: req.params.postId }
        res.render('editPost.ejs', context)
    } catch (err) {
        console.log(err)
    }
})

router.put('/feed/:postId/edit', async (req, res) => {
    try {
        updatedCaption = req.body;
        await db.Posts.findByIdAndUpdate(req.params.postId, updatedCaption, { new: true })
        res.redirect('/main/feed');
    } catch (err) {
        console.log(err);
    }
})

router.delete('/feed/:postId', async (req, res) => {
    try {
        const deletedPost = await db.Posts.findByIdAndDelete(req.params.postId);
        res.redirect('/main/feed');
    } catch (err) {
        console.log(err);
    }
})

module.exports = router; 