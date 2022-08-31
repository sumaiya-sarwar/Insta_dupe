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
    res.render('newPost.ejs')
})

router.post('/newPost', upload.single('image'), async (req, res) => {
    try {
        const newImgObj = {
            caption: req.body.caption,
            image: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }

        const uploadImage = await db.Posts.create(newImgObj);
        res.redirect('main/posts');

    } catch (err) {
        console.log(err);
    }
})

router.get('/posts', (req, res) => {
    res.render('posts.ejs')
});

module.exports = router; 