const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const article = require('./modules/articles')
const users = require('./modules/users')  // add this

router.use('/',home)
router.use('/articles', article)
router.use('/users', users)


// 匯出路由器
module.exports = router