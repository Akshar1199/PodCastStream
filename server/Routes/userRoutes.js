const express = require('express');
const { updateUserController } = require('../Controllers/userController');
const router = express.Router();

// update the user profile
router.put("/update-profile/:id",updateUserController)

module.exports = router;