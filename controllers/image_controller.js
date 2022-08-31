const express = require('express');
const { fstat } = require('fs');
const { model } = require('mongoose');
const multer = require('multer');
const router = express.Router();
const db = require('../models');
const fs = require('fs');
const path = require('path');

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

router.get('/upload', async (req, res) => {
    try {
        const images = await db.Image.find();
        console.log(images);
        const context = { images: images }
        res.render('images.ejs', context)
    } catch (err) {
        console.log(err);
    }
})

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const newImgObj = {
            name: req.body.name,
            description: req.body.description,
            image: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }

        const uploadImage = await db.Image.create(newImgObj);
        res.redirect('/upload');

    } catch (err) {
        console.log(err);
    }
})

module.exports = router;