const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully`.bgGreen.white.italic.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.bgRed.white);
    }
}

module.exports = connectDB