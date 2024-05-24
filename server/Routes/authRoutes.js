const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { registerController } = require('../Controllers/authController.');
const router = express.Router();

router.post("/signup",registerController)

module.exports = router;