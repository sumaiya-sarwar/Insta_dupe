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
        res.redirect(`feed`);

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

router.delete('/feed/:postId', async (req, res) => {
    try {
        const deletedPost = await db.Posts.findByIdAndDelete(req.params.postId);
        console.log(deletedPost)
    } catch (err) {
        console.log(err);
    }
})

router.get('/:postId', async (req, res) => {
    const post = await db.Posts.findById(req.params.postId)
    const comments = await db.Comments.find({post: req.params.postId});
    const context = {post: post, comments: comments}
    console.log(comments)
    res.render('show.ejs', context)

})
module.exports = router; 