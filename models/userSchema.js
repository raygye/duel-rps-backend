const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength:8
    },
    img: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    wins: {
        type: Number,
        default: 0
    },
    games: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});
const User = mongoose.model('User', userSchema);
module.exports = User;