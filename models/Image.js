const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'image must have a name'] },
    desription: { type: String },
    image: {
        data: { type: Buffer },
        contentType: { type: String }
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;