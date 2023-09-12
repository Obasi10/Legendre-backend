const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, signupUser, updateUser1} = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// middleware
router.use(requireAuth)

// update user1
router.patch('/', updateUser1)

module.exports = router