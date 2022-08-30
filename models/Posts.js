const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    image: { type: String, required: [true, 'You must link to an image'] },
    likes: { type: Number, min: [0, 'likes can not be negative'] },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }]
}, { timestamps: true });

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts; 