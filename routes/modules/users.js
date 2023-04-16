const express = require('express')
const router = express.Router()
const passport = require('passport') //// 引用 passport

const userController = require('../../controllers/user-controller')

////Login,Logout
router.get('/login', userController.userLoginPage)  //官方寫法
router.post('/login', passport.authenticate('local',{failureRedirect: '/users/login'}),
  userController.userLogin
)
router.get('/logout', userController.userLogout)  //官方寫法

////Register
router.get('/register', userController.userRegisterPage)
router.post('/register', userController.userRegister)

module.exports = router