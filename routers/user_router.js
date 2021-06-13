const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware,
} = require('../middlewares/auth-middleware')




router.get('/register', guestOnlyMiddleware, userController.registerForm)

router.post('/register', guestOnlyMiddleware, userController.registerUser)

router.get('/login', guestOnlyMiddleware, userController.loginForm)

router.post('/login', guestOnlyMiddleware, userController.loginUser)

router.post('/logout', authenticatedOnlyMiddleware, userController.logout)

module.exports = router
