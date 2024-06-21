const express = require('express');
const { updateUserController, emailExistenceController, userDataController } = require('../Controllers/userController');
const router = express.Router();

router.get("/userdata/:id", userDataController);

router.put("/update-profile/:id",updateUserController);

router.post("/checkEmail", emailExistenceController);
    

module.exports = router;