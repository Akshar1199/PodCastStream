const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./Config/DB');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgBlue.white);
});
