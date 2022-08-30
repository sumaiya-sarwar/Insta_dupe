const mongoose = require("mongoose")

const commentschema = new mongoose.Schema({
    context: { type: String, required: [true, 'Your comment can not be blank'] },
    user: { type: mongoose.Types.ObjectId, required: [true, 'You must be a user'], ref: 'User' },
}, { timestamps: true });

const Comments = mongoose.model('Comments', commentschema);

module.exports = Comments;