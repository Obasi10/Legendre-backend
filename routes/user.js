const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, signupUser, updateUser1, updateUser, updateUser2} = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// middleware
router.use(requireAuth)

// update user1
router.patch('/p2', updateUser)
router.patch('/p1', updateUser1)
router.patch('/p3', updateUser2)

module.exports = router
