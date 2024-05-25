const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { registerController, loginController, currentUserController, logoutController, googleSignInController } = require('../Controllers/authController');
const router = express.Router();

// Sign Up || POST
router.post("/signup",registerController)
// Sign In || POST
router.post("/signin",loginController)
// Log Out || POST
router.get("/logout",logoutController)
// Google Sign In || POST
router.post("/google-signin",googleSignInController)
// Get Current User || GET
router.get("/current-user",authMiddleware,currentUserController)

module.exports = router;