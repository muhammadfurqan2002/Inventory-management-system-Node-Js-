const express = require('express');
const {loginUser,signUp}=require('../controllers/user_controller');
const {body}=require('express-validator');
const userRoute = express.Router();


const validationForSignup=[
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isStrongPassword().withMessage('Password must be between 6 to 20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('name').isAlpha().isLength({ min: 4, max: 20 }).withMessage('Name must contain only letters and be between 4 to 20 characters long')
]

const validationForLogin=[
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isStrongPassword().withMessage('Password must be between 6 to 20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
]


userRoute.post('/login',validationForLogin,loginUser);


userRoute.post('/signup',validationForSignup,signUp);



module.exports = {
    userRoute
}