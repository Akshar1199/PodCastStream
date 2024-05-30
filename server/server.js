const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./Config/DB');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }));
app.use(morgan('dev'));

// Authentication routes
app.use("/api/auth", require('./Routes/authRoutes'));
app.use("/api/auth/user", require('./Routes/userRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgBlue.white);
});
