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
    googleSignIn:{
        type:Boolean,
        required:[true,"Google Sign In is required"],
        unique:false,
    },
    password:{
        type:String,
        required:function(){
            if(!this.googleSignIn){
                return true;
            }
            return false;
        },
        unique:false,
    },
    image:{
        type:String,
        required:false,
        unique:false,
    },
    podCasts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PodCasts",
        required:false
        // default:[]
    },
    favorites:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PodCasts",
        required:false
        // default:[]
    }
},{timestamps:true});

module.exports = mongoose.model('Users', UserSchema);