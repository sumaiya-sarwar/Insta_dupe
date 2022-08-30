const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: { type: String, unique: [true, 'Username already taken'], required: [true, 'please enter a username'] },
    name: { type: String, required: [true, 'You must enter a name'] },
    image: { type: String, required: [false, 'You can leave a default image'] },
    followers: { type: Number, min: [0, 'followers can not be negative'] },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'Posts' }],
    following: { type: Number, min: [0, 'following can not be negative'] },
    password: { type: String, required: [true, 'You must enter a password'] },
    bio: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;