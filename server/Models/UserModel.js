const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        unique:false,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        unique:false,
    },
    image:{
        type:String,
        required:false,
        unique:false,
    },
    googleSignIn:{
        type:Boolean,
        required:[true,"Google Sign In is required"],
        unique:false,
    },
    podCasts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PodCasts",
        required:false,
        default:[]
    },
    favorites:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PodCasts",
        required:false,
        default:[]
    }
},{timestamps:true});

module.exports = mongoose.model('Users', UserSchema);