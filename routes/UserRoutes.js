const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
const CheckUserAuth = require('../middleware/AuthMiddleware.js')

//middleware for authentication check

router.use('/logged', CheckUserAuth);


//Public Routes
router.post('/register', UserController.UserRegistration);
router.post('/login', UserController.UserLogin);
router.post('/forget-password', UserController.ForgetPassword);
router.post('/reset-password/:id/:token', UserController.ForgetPasswordReset);


//Protected Routes

router.get('/logged', UserController.UserLogged);




module.exports= router;