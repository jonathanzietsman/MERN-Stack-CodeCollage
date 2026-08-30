const { Signup, Login } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

// Route to verify client authentication status via cookie token
router.post('/', userVerification)

// Route to handle new user registration
router.post('/signup', Signup)

// Route to handle user sign in
router.post('/login', Login)

module.exports = router