const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.signUp)
router.post('/signin', userController.signinUser)
router.get('/alluser', userController.getAllUser)
router.get('/singleuser/:id', userController.getSingleUser)
router.put('/profile/:id', userController.updateProfile)

module.exports = router;
