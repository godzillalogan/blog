const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const article = require('./modules/articles')
const users = require('./modules/users')  
const admin = require('./modules/admin') 
const { authenticator } = require('../middleware/auth')  // 掛載 middleware

//條件嚴謹的router放前面，寬鬆的放後面
router.use('/articles', article)
router.use('/users', users)
router.use('/admin',authenticator, admin)
router.use('/',home)

// 匯出路由器
module.exports = router