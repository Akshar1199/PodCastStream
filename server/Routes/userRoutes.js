const express = require('express');
const { updateUserController, emailExistenceController } = require('../Controllers/userController');
const router = express.Router();

// update the user profile
router.put("/update-profile/:id",updateUserController)

router.post("/checkEmail", emailExistenceController);
    

module.exports = router;