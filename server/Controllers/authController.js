const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const UserModel = require('../Models/UserModel');

// sign up controller call back
const registerController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false,
                email
            });
        }
        const existingUser = await UserModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
                existingUser
            });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // save the new user
        const newUser = new UserModel(req.body);
        await newUser.save()
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in creating user",
            success: false,
            error
        });
    }
}

// login / sign in controller call back
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false,
                email,
                password
            });
        }

        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
                user
            });
        }
        if (user.googleSignIn) {
            return res.status(400).json({
                message: "User signed in with google",
                success: false,
                user
            });
        }

        // compare the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
                success: false,
                user
            });
        }

        // create a token
        const token = jwt.sign({ userId: user._id, email:user.email }, process.env.JWT_SECRET);

        // set the cookie
        res.cookie("authToken",token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:24*60*60*1000 //86400000
        })

        return res.status(200).send({
            message: 'User Logged In Successfully',
            success: true,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in logging in user",
            success: false,
            error
        });
    }
}

// get current user controller call back
const currentUserController = async (req, res) => {
    try {
        const user = await UserModel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success:true,
            message:"User fetched succesfully",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in getting current user",
            success: false,
            error
        });
    }
}

// Log out the user controller call back
const logoutController = async (req, res) => {
    try {
        await res.clearCookie('authToken');
        return res.status(200).send({
            success:true,
            message:"User Logged Out Successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in logging out user",
            success: false,
            error
        });
    }
}

module.exports = { registerController, loginController, currentUserController, logoutController };