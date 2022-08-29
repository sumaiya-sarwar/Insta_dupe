const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, unique: [true, `Name can't match any other person name currently in database`], required: [true, 'You must enter a name'] },
    image: { type: String, required: [false, 'You can leave a default image'] },
    followers: { type: Number, min: [0, 'followers can not be negative'] },
    posts: { type: Number, min: [0, 'posts can not be negative'] },
    following: { type: Number, min: [0, 'following can not be negative'] },
    password: { type: String, required: [true, 'You must enter a password'] },
    bio: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;