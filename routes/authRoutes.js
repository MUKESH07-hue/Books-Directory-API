const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth')


// Register Route for new Users
router.post("/register", authController.register);

// Login route for existing users
router.post("/login", authController.login);

module.exports = router;