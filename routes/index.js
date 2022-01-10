const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const article = require('./modules/articles')
const users = require('./modules/users')  
const admin = require('./modules/admin') 

router.use('/',home)
router.use('/articles', article)
router.use('/users', users)
router.use('/admin', admin)

// 匯出路由器
module.exports = router