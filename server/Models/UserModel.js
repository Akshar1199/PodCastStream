const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    googleSignIn: {
        type: Boolean,
        required: [false],
        unique: false,
    },
    password: {
        type: String,
        required: function () {
            if (!this.googleSignIn) {
                return true;
            }
            return false;
        },
        unique: false,
    },
    image: {
        type: String,
        required: false,
        unique: false,
    },
    podcasts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Podcast'

        }],
    favorites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PodcastModel",
        required: false
        // default:[]
    }
}, { timestamps: true });

module.exports = mongoose.model('UserModel', UserSchema);