const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { registerController, loginController, currentUserController } = require('../Controllers/authController');
const router = express.Router();

// Sign Up || POST
router.post("/signup",registerController)
// Sign In || POST
router.post("/signin",loginController)
// Get Current User || GET
router.get("/current-user",authMiddleware,currentUserController)

module.exports = router;