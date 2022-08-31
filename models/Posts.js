const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    image: {
        data: { type: Buffer },
        contentType: { type: String }
    },
    caption: { type: String, required: [true, 'post must have a caption'] },
    likes: { type: Number, min: [0, 'likes can not be negative'], default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }]
}, { timestamps: true });

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts; 