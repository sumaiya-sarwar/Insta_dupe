const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    comments: { type: String },
    image: { type: String, required: [true, 'You must link to an image'] },
    likes: { type: Number, min: [0, 'likes can not be negative'] },
    user: { type: mongoose.Types.ObjectID, required: [true, 'You must be a user'], ref: 'User' }
}, { timestamps: true });

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts; 